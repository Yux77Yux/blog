type contentStyle = {
    content: string,
    styles: {
        [key: string]: any
    }
}



let contentData: contentStyle[] = [];

const updateContent = ({ content, styles }: contentStyle) => {
    contentData.push({ content, styles });
}

//将内容样式转换为字符串
const mapContentToString = () =>
    contentData.map((item) => {
        const prefix = `<%% ${Object.entries(item.styles).map(([key, value]) =>
            `${key}:${value}`)
            .join(';')
            }%%>`;
        const suxfix = "</%%>";
        return prefix + item.content + suxfix;
    }).join('');

self.onmessage = (event) => {
    const data = event.data;
    // 处理接收到的数据
    updateContent(data)
    //self.postMessage(result); // 将结果发送回主线程
};

