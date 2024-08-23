type setRangeType = {
    node: Node | null,
    text: string | null,
    startOffset: number,
    endOffset: number
}


const levelTest = (nodeName: string): number => {
    switch (nodeName.toLowerCase()) {
        case "text": return 0;
        case "span": return 1;
        case "u": return 2;
        case "s": return 3;
        case "em": return 4;
        case "strong": return 5;
        default: return -1;
    }
}

const findTextNode = (nodeTop: Node | null): Node | null => {
    if (!nodeTop) return null;
    if (nodeTop.nodeType === Node.TEXT_NODE) return nodeTop;
    let textNode: Node;

    nodeTop.childNodes.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE) {
            textNode = node; // 如果找到文本节点，保存它
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            // 递归查找子元素中的文本节点
            const nestedTextNode = findTextNode(node);
            if (nestedTextNode) {
                textNode = nestedTextNode;
            }
        }
    });

    return textNode!;
}

export const getRangeDetails = (range: Range, editor: Node) => {
    let details: setRangeType[] = [];

    const startContainer = range.startContainer;
    const endContainer = range.endContainer;
    const commonAncestor = range.commonAncestorContainer;

    const treeWalker = document.createTreeWalker(
        commonAncestor,
        NodeFilter.SHOW_TEXT,
        null,
    );

    let node: Node | null = treeWalker.currentNode;
    let startNode = false;
    do {
        if (node.textContent === "") continue;
        if (node === startContainer) {
            startNode = true;

            let previousSibling: Node | null = node;
            while (true) {
                if (previousSibling!.parentNode! === editor
                    || previousSibling!.parentNode!.textContent !== previousSibling!.textContent) {
                    break;
                }
                previousSibling = previousSibling!.parentNode || null;
            }

            previousSibling = previousSibling && previousSibling.previousSibling ? previousSibling.previousSibling : null;

            if (previousSibling?.textContent === "") {
                previousSibling = previousSibling && previousSibling.previousSibling ? previousSibling.previousSibling : null;
            }

            if (previousSibling && previousSibling.textContent !== '') {
                details.push({
                    node: findTextNode(previousSibling),
                    text: previousSibling.textContent,
                    startOffset: 0,
                    endOffset: previousSibling.textContent?.length || 0,
                })
            } else {
                details.push({
                    node: null,
                    text: "no-prev",
                    startOffset: 0,
                    endOffset: 0,
                })
            }

            details.push({
                node,
                text: node.textContent!.substring(range.startOffset, range.endOffset),
                startOffset: range.startOffset,
                endOffset: node.textContent?.length || 0,
            });
            if (node.nodeType !== Node.TEXT_NODE) {
                //若不是文本节点，则将第一个文本节点赋予
                details[1].node = treeWalker.nextNode()!;
                details[1].endOffset = node.textContent?.length || 0;
                details[1].text = node.textContent!.substring(range.startOffset);
            } else {
                details[1].endOffset = node.textContent?.length || 0;
                details[1].text = node.textContent!.substring(range.startOffset);
            }

            if (startContainer === endContainer) {
                //若是在样式节点内，两边都不在界限则文本长度小于该节点文本长度，实际上这里当作纯文本节点，
                //所以range.endOffset是截取文本的末端位置
                //若是在样式节点内的截取文本两端都在边界，则range.endOffset其实是节点的子节点数量
                if (node.nodeType === Node.TEXT_NODE) {
                    details[1].endOffset = range.endOffset;
                }
                details[1].text = node.textContent!.substring(details[1].startOffset, details[1].endOffset);
                break;
            }
        } else if (node === endContainer) {
            details.push({
                node,
                text: node.textContent!.substring(0, range.endOffset),
                startOffset: 0,
                endOffset: range.endOffset,
            });
            break;
        } else if (startNode) {
            details.push({
                node,
                text: node.textContent,
                startOffset: 0,
                endOffset: node.textContent!.length,
            });
        }
    } while ((node = treeWalker.nextNode()))
    //循环结束添加邻近后节点
    let nextSibling: Node | null = details[details.length - 1].node;
    while (true) {
        if (nextSibling &&
            (nextSibling.parentNode! === editor || nextSibling.parentNode!.textContent !== nextSibling.textContent)) {
            break;
        }
        nextSibling = nextSibling?.parentNode!;
    }
    nextSibling = nextSibling && nextSibling.nextSibling ? nextSibling.nextSibling : null;

    if (nextSibling?.textContent === "") {
        nextSibling = nextSibling && nextSibling.nextSibling ? nextSibling.nextSibling : null;
    }

    if (nextSibling && nextSibling.textContent !== '') {
        details.push({
            node: findTextNode(nextSibling),
            text: nextSibling.textContent,
            startOffset: 0,
            endOffset: nextSibling.textContent?.length || 0,
        })
    } else {
        details.push({
            node: null,
            text: "no-next",
            startOffset: 0,
            endOffset: 0,
        })
    }

    return details;
}

export const modifyStyle = (details: setRangeType[], nodeName: string) => {
    const targetLevel = levelTest(nodeName);
    let needStyle = false;//辨别是否需要移除文字样式
    for (let i = 1; i < details.length - 1; ++i) {
        let currentNode: Node | null = details[i].node;
        let parentLevel: number;

        while (true) {
            parentLevel = levelTest(currentNode!.parentNode!.nodeName || "");

            //已经存在节点则跳出循环
            if (parentLevel >= targetLevel || parentLevel === -1) {
                break;
            }

            currentNode = currentNode!.parentNode!;
        }

        if (parentLevel !== targetLevel) {
            needStyle = true;
            const tag = document.createElement(nodeName);

            const range = new Range();
            range.setStart(details[i].node!, details[i].startOffset);
            range.setEnd(details[i].node!, details[i].endOffset);
            range.surroundContents(tag);

            details[i].node = findTextNode(tag);
            details[i].startOffset = 0;
            details[i].endOffset = tag.textContent?.length || 0;
            details[i].text = tag.textContent;
        }
    }

    if (!needStyle) {
        {
            const i = 1;
            let currentNode: Node = details[i].node!;

            //记录样式节点
            let styles: string[] = [];
            //记录文本信息位置
            let indexs: number[] = [];
            if (details[i].startOffset > 0) {
                indexs.push(0);
            }
            indexs.push(details[i].startOffset);
            indexs.push(details[i].endOffset);
            if (details[i].endOffset < details[i].node!.textContent!.length) {
                indexs.push(details[i].node!.textContent!.length);
            }

            //记录文本
            let texts: string[] = [];
            for (let j = 0; j < indexs.length - 1; ++j) {
                texts.push(currentNode.textContent!.substring(indexs[j], indexs[j + 1]));
            }

            while (true) {
                styles.push(currentNode.parentElement!.nodeName.toLowerCase());
                const currentLevel = levelTest(currentNode.parentNode!.nodeName);

                if (currentLevel === targetLevel || currentNode.parentElement!.textContent !== details[i].text) {
                    if (texts.length === 1) {
                        let tags: Node = document.createTextNode(texts.pop() || "");
                        details[i].text = tags.textContent;
                        details[i].startOffset = 0;
                        details[i].endOffset = tags.textContent?.length || 0;

                        for (let j = 0; j < styles.length - 1; ++j) {
                            const tag = document.createElement(styles[j]);
                            tag.appendChild(tags);
                            tags = tag as Node;
                        }

                        currentNode.parentElement!.parentElement!.insertBefore(tags, currentNode.parentElement!);
                        details[i].node = findTextNode(tags);

                    } else if (texts.length > 1) {
                        let remove: number = 0;
                        if (details[i].startOffset > 0) {
                            remove = 1;
                        }
                        for (let j = 0; j < texts.length; ++j) {
                            let tags: Node = document.createTextNode(texts[j]);
                            details[i].text = tags.textContent;
                            details[i].startOffset = 0;
                            details[i].endOffset = tags.textContent?.length || 0;

                            const length = j === remove ? styles.length - 1 : styles.length;
                            for (let k = 0; k < length; ++k) {
                                const tag = document.createElement(styles[k]);
                                tag.appendChild(tags);
                                tags = tag as Node;
                            }

                            currentNode.parentElement!.parentElement!.insertBefore(tags, currentNode.parentElement!);
                            if (j === 0) details[i].node = findTextNode(tags!);
                        }
                    }

                    let current_next = currentNode.nextSibling;
                    if (current_next && current_next.textContent === '') {
                        current_next = current_next.nextSibling;
                    }
                    if (!current_next) {
                        currentNode.parentElement!.parentElement!.removeChild(currentNode.parentElement!);
                    }
                    break;
                }
                currentNode = currentNode.parentNode!;
            }
        }
        //需要修改的大于数量大于2
        for (let i = 2; i < details.length - 2; ++i) {
            let currentNode: Node = details[i].node!;

            //记录样式节点
            let styles: string[] = [];
            //记录文本信息位置
            let indexs: number[] = [];
            if (details[i].startOffset > 0) {
                indexs.push(0);
            }
            indexs.push(details[i].startOffset);
            indexs.push(details[i].endOffset);
            if (details[i].endOffset < details[i].node!.textContent!.length) {
                indexs.push(details[i].node!.textContent!.length);
            }

            //记录文本
            let texts: string[] = [];
            for (let j = 0; j < indexs.length - 1; ++j) {
                texts.push(currentNode.textContent!.substring(indexs[j], indexs[j + 1]));
            }

            while (true) {
                styles.push(currentNode.parentElement!.nodeName.toLowerCase());
                const currentLevel = levelTest(currentNode.parentNode!.nodeName);

                if (currentLevel === targetLevel || currentNode.parentElement!.textContent !== details[i].text) {
                    if (texts.length === 1) {
                        let tags: Node = document.createTextNode(texts.shift() || "");

                        for (let j = 0; j < styles.length - 1; ++j) {
                            const tag = document.createElement(styles[j]);
                            tag.appendChild(tags);
                            tags = tag as Node;
                        }
                        currentNode.parentElement!.parentElement!.insertBefore(tags, currentNode.parentElement!);

                    } else if (texts.length > 1) {
                        let remove: number = 0;
                        if (details[i].startOffset > 0) {
                            remove = 1;
                        }

                        for (let j = 0; j < texts.length; ++j) {
                            let tags: Node = document.createTextNode(texts[j]);

                            const length = j === remove ? styles.length - 1 : styles.length;
                            for (let k = 0; k < length; ++k) {
                                const tag = document.createElement(styles[k]);
                                tag.appendChild(tags);
                                tags = tag as Node;
                            }

                            currentNode.parentElement!.parentElement!.insertBefore(tags, currentNode.parentElement!);
                        }
                    }

                    let current_next = currentNode.nextSibling;
                    if (current_next && current_next.textContent === '') {
                        current_next = current_next.nextSibling;
                    }
                    if (!current_next) {
                        currentNode.parentElement!.parentElement!.removeChild(currentNode.parentElement!);
                    }
                    break;
                }
                currentNode = currentNode.parentNode!;
            }
        }
        //需要修改的数量大于1
        if (details.length - 2 > 1) {
            const i = details.length - 2;
            let currentNode: Node = details[i].node!;

            //记录样式节点
            let styles: string[] = [];
            //记录文本信息位置
            let indexs: number[] = [];
            if (details[i].startOffset > 0) {
                indexs.push(0);
            }
            indexs.push(details[i].startOffset);
            indexs.push(details[i].endOffset);
            if (details[i].endOffset < details[i].node!.textContent!.length) {
                indexs.push(details[i].node!.textContent!.length);
            }

            //记录文本
            let texts: string[] = [];
            for (let j = 0; j < indexs.length - 1; ++j) {
                texts.push(currentNode.textContent!.substring(indexs[j], indexs[j + 1]));
            }

            while (true) {
                styles.push(currentNode.parentElement!.nodeName.toLowerCase());
                const currentLevel = levelTest(currentNode.parentNode!.nodeName);

                if (currentLevel === targetLevel || currentNode.parentNode!.textContent !== details[i].text) {
                    if (texts.length === 1) {
                        let tags: Node = document.createTextNode(texts.shift() || "");
                        details[i].text = tags.textContent;
                        details[i].startOffset = 0;
                        details[i].endOffset = tags.textContent?.length || 0;
                        for (let j = 0; j < styles.length - 1; ++j) {
                            const tag = document.createElement(styles[j]);
                            tag.appendChild(tags);
                            tags = tag as Node;
                        }
                        currentNode.parentNode!.parentElement!.insertBefore(tags, currentNode.parentNode!);
                        details[i].node = findTextNode(tags);

                    } else if (texts.length > 1) {
                        let remove: number = 0;
                        if (details[i].startOffset > 0) {
                            remove = 1;
                        }

                        for (let j = 0; j < texts.length; ++j) {
                            let tags: Node = document.createTextNode(texts[j]);
                            details[i].text = tags.textContent;
                            details[i].startOffset = 0;
                            details[i].endOffset = tags.textContent?.length || 0;

                            const length = j === remove ? styles.length - 1 : styles.length;

                            for (let k = 0; k < length; ++k) {
                                const tag = document.createElement(styles[k]);
                                tag.appendChild(tags);
                                tags = tag as Node;
                            }

                            currentNode.parentElement!.parentElement!.insertBefore(tags, currentNode.parentElement!);
                            if (j === texts.length - 1) details[i].node = findTextNode(tags!);
                        }
                    }

                    let current_next = currentNode.nextSibling;
                    if (current_next && current_next.textContent === '') {
                        current_next = current_next.nextSibling;
                    }
                    if (!current_next) {
                        currentNode.parentElement!.parentElement!.removeChild(currentNode.parentElement!);
                    }
                    break;
                }

                currentNode = currentNode.parentNode!;
            }
        }
    }

    const ranges = new Range();
    ranges.setStart(details[1].node!, details[1].startOffset);
    ranges.setEnd(details[details.length - 2].node!, details[details.length - 2].endOffset);
    return ranges;
}

//the last childNode on left Node need adjust to the first childNodes on right Node
export const mergeRecursion = (leftNode: Node | null, rightNode: Node | null) => {
    //in this enter time ,which has match the condition,should add the child Node except the first childNode
    if (!leftNode) {
        throw Error("leftNode not exist");
    }
    if (!rightNode) {
        throw Error("rightNode not exist");
    }
    let lastChild: Node = leftNode.lastChild!;
    if (leftNode.nodeType === Node.TEXT_NODE) {
        lastChild = leftNode;
    }

    let firstChild: Node = rightNode.firstChild!;
    if (rightNode.nodeType === Node.TEXT_NODE) {
        firstChild = rightNode;
    }

    if (firstChild?.nodeType === lastChild?.nodeType) {
        if (firstChild?.nodeType === Node.TEXT_NODE) {
            lastChild.textContent = lastChild!.textContent! + firstChild!.textContent!;
            firstChild.parentNode!.parentNode!.removeChild(firstChild.parentNode!);
            //当双方都是文本节点，则右节点同层无其他节点，此次递归结束，开始回溯
            return;
        } else {
            mergeRecursion(lastChild, firstChild);
        }
    }

    while (rightNode.childNodes.length > 0) {
        leftNode.appendChild(rightNode.childNodes[0]);
    }
    rightNode.parentElement!.removeChild(rightNode);

}

export const merge = (details: setRangeType[], editor: Node) => {
    let leftNode: Node | null;
    let rightNode: Node;
    let length = details.length;

    if (details[details.length - 1].node === null) {
        rightNode = details[details.length - 2].node!;
        length -= 1;
    } else {
        rightNode = details[details.length - 1].node!;
    }

    console.log(details);
    console.log(details.length);
    console.log(length);

    while (true) {
        if (rightNode.parentNode === editor || rightNode.parentNode!.textContent !== rightNode.textContent) {
            break;
        }
        rightNode = rightNode.parentNode!;
    }


    for (let i = length - 2; i >= 0; --i) {
        leftNode = details[i].node!;
        if (!leftNode || leftNode.textContent === '') break;

        while (true) {
            if (leftNode.parentNode! === editor || leftNode.parentNode!.textContent !== leftNode.textContent) {
                break;
            }
            leftNode = leftNode.parentNode!;
        }

        if (leftNode.nodeType === rightNode.nodeType) {
            mergeRecursion(leftNode, rightNode);
        }

        rightNode = leftNode;
    }
}