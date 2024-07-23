import articles from '../SmulateDatabase/articles.json';

export const getArticles = () => articles

export const getArticlesAsync = async () => await getArticles();