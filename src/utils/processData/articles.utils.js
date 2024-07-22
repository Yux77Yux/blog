export const processData = (articles) => {
    const datas = articles.reduce((items, item, idx) => {
        const updatedItem = { ...item, Id: idx + 1 };
        items.push(updatedItem);
        return items;
    }, []);

    const downloadJSON = (data, filename) => {
        // 创建 Blob 对象
        const blob = new Blob([JSON.stringify(data, null, 4)], { type: 'application/json' });
        // 创建一个指向 Blob 的 URL
        const url = URL.createObjectURL(blob);
        // 创建一个临时的 <a> 元素
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        // 触发下载
        document.body.appendChild(a);
        a.click();
        // 清理
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    downloadJSON(datas, 'articles.json');
}

export function _slices(datas, group) {
    if (datas.length === 0) return [];
    let i = 0;
    let sliceNum = group.length;
    group[sliceNum] = []
    while (i + sliceNum * 5 < datas.length && i < 5) {
        group[sliceNum][i] = datas[i + sliceNum * 5];
        i++;
    }

    if (i + sliceNum * 5 < datas.length) {
        _slices(datas, group);
    }
}

export const getArticlesMapAsync = async (articles, title = "") => {
    if (!Array.isArray(articles)) {
        console.log("getArticlesMapAsync/failure");
        return [];
    }

    const articlesFilter = articles.filter(article => article.title.includes(title));

    let group = [];
    await _slices(articlesFilter, group);
    let group2 = [];
    group2.push(group);
    return group2;
}