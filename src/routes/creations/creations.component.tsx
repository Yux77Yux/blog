import { useEffect, useRef } from 'react';
import { Form } from 'react-router-dom';

import {
    getRangeDetails,
    merge,
    modifyStyle,
} from './auxiliary';
import './creations.styles.scss';
import './incidental.style.scss';

const Creations = () => {
    const ref = useRef<{ [key: string]: Node }>({});
    const selection = window.getSelection();

    const icons: { [key: string]: any } = {
        meme: {
            src: require("../../assets/memes/icons/smile-wink-svgrepo-com.svg").default,
            eventFunc: function () {
            },
        },
        at: {
            src: require("../../assets/memes/icons/at-sign-svgrepo-com.svg").default,
        },
        link: {
            src: require("../../assets/memes/icons/link-round-1110-svgrepo-com.svg").default,
        },
        image: {
            src: require("../../assets/memes/icons/image-picture-972-svgrepo-com.svg").default,
        },
        bold: {
            src: require("../../assets/memes/icons/bold-svgrepo-com.svg").default,
            eventFunc: function () {
                const editor = ref.current["editor"];//编辑区

                if (selection!.rangeCount > 0) {
                    let ranges = selection!.getRangeAt(0); // 获取第一个选区
                    const commonAncestor = ranges.commonAncestorContainer; // 获取选区的共同祖先节点


                    if (editor.contains(commonAncestor)) {
                        let details = getRangeDetails(ranges, editor);

                        //倘若无文本内容则直接返回
                        if (details.length < 3 || details[1].text === '') return;
                        ranges = modifyStyle(details, "strong");

                        details = getRangeDetails(ranges, editor);
                        console.log("over");
                        merge(details, editor);
                    }
                }
            },
        },
        italic: {
            src: require("../../assets/memes/icons/italic-2-svgrepo-com.svg").default,
        },
        strikethrough: {
            src: require("../../assets/memes/icons/strikethrough-2-svgrepo-com.svg").default,
        },
        underline: {
            src: require("../../assets/memes/icons/underline-svgrepo-com.svg").default,
            eventFunc: function () {

            },
        },
        H: {
            src: require("../../assets/memes/icons/h-title/heading-svgrepo-com.svg").default,
        },
        font_color: {
            src: require("../../assets/memes/icons/font-colors-svgrepo-com.svg").default,
        },
        justify: {
            src: require("../../assets/memes/icons/justify/justify-center-svgrepo-com.svg").default,
        },
    }

    useEffect(() => {
        document.execCommand('defaultParagraphSeparator', false, 'p');
    }, []);

    useEffect(() => {
        const bold = document.querySelector('#bold') as HTMLElement;
        if (!selection) {
            bold.style.backgroundColor = "white";
            return;
        }
    }, [selection]);

    return <Form>
        <div className="creations-page">
            <input type="text" name="title" placeholder="请输入标题" className="creation-title" />
            <div className="tool-bars">
                <div className="tools">
                    {
                        Object.keys(icons).map((key) => {
                            return <button
                                key={key}
                                onClick={icons[key].eventFunc}
                            >
                                <img src={icons[key].src} alt="gg" className="icon" />
                            </button>
                        })
                    }
                </div>
            </div>
            <div className="creation-content">
                <div
                    ref={element => ref.current["editor"] = element as Node}
                    className="editor"
                    contentEditable="true"
                ></div>
            </div>
            <div className="tag-class"></div>
            <div className="save-submit">
                <input type="button" value="保存" className="button" />
                <input type="submit" value="提交" className="button" />
            </div>
        </div>
    </Form>
}

export default Creations;