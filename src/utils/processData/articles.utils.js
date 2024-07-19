export const getArticlesMap = (articles,title="") => {
    if (!Array.isArray(articles)) {
        return {};
    }

    const articlesFilter = articles.filter(article => article.articleTitleContent.includes(title));

    return articlesFilter.reduce((grouped, article) => {
        const { Id } = article;

        const flow = Id % 3;

        if (!grouped[flow]) {
            grouped[flow] = {};
        }

        grouped[flow][Id] = article
        return grouped;
    }, {});
}