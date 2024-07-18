export const getArticlesMap = (articles) => {
    if (!Array.isArray(articles)) {
        return {};
    }

    return articles.reduce((grouped, article) => {
        const { flow, Id } = article;

        if (!grouped[flow]) {
            grouped[flow] = {};
        }

        grouped[flow][Id] = article
        return grouped;
    }, {});
}