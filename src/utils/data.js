import articles from '../articles.json';

export const getArticles = () => articles

export const getArticlesAsync = async () => await getArticles();