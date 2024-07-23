import articles from './articles.json';

export const searchArticle = (uuid) => {
    return articles.find(item => item.uuid === uuid);
}