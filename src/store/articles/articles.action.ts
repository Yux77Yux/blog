import { Articles,Article, ARTICLES_ACTION_TYPES } from './articles.types';
import {
    createAction,
    withMatcher,
    Action,
    ActionWithPayload,
} from '../../utils/reducer/reducer.utils';

export type FetchArticlesStart = ActionWithPayload<ARTICLES_ACTION_TYPES.FETCH_ARTICLES_START,string>;
export type FetchArticlesSuccess = ActionWithPayload<ARTICLES_ACTION_TYPES.FETCH_ARTICLES_SUCCESS, Articles>;
export type FetchArticlesFailure = ActionWithPayload<ARTICLES_ACTION_TYPES.FETCH_ARTICLES_FAILURE, Error>;

export type FetchArticleStart = ActionWithPayload<ARTICLES_ACTION_TYPES.FETCH_ARTICLE_START, string>;
export type FetchArticleSuccess = ActionWithPayload<ARTICLES_ACTION_TYPES.FETCH_ARTICLE_SUCCESS, Article>;
export type FetchArticleFailure = ActionWithPayload<ARTICLES_ACTION_TYPES.FETCH_ARTICLE_FAILURE, Error>;

export type SetArticleStart = ActionWithPayload<ARTICLES_ACTION_TYPES.SET_ARTICLE_START, Article>;
export type SetArticleSuccess = ActionWithPayload<ARTICLES_ACTION_TYPES.SET_ARTICLE_SUCCESS, Article>;
export type SetArticleFailure = ActionWithPayload<ARTICLES_ACTION_TYPES.SET_ARTICLE_FAILURE, Error>;

export type SetArticlesSearchedStart = ActionWithPayload<ARTICLES_ACTION_TYPES.SET_ARTICLES_SEARCHED_START, string>;
export type SetArticlesSearchedSuccess = ActionWithPayload<ARTICLES_ACTION_TYPES.SET_ARTICLES_SEARCHED_SUCCESS, string>;
export type SetArticlesSearchedFailure = ActionWithPayload<ARTICLES_ACTION_TYPES.SET_ARTICLES_SEARCHED_FAILURE, Error>;

//fetch-articles
export const fetchArticlesStart = withMatcher(
    (title:string): FetchArticlesStart => createAction(ARTICLES_ACTION_TYPES.FETCH_ARTICLES_START, title)
);
export const fetchArticlesSuccess = withMatcher(
    (articles: Articles): FetchArticlesSuccess => createAction(ARTICLES_ACTION_TYPES.FETCH_ARTICLES_SUCCESS, articles)
);
export const fetchArticlesFailure = withMatcher(
    (error: Error): FetchArticlesFailure => createAction(ARTICLES_ACTION_TYPES.FETCH_ARTICLES_FAILURE, error)
);

//fetch-article
export const fetchArticleStart = withMatcher(
    (uid:string): FetchArticleStart => createAction(ARTICLES_ACTION_TYPES.FETCH_ARTICLE_START, uid)
);
export const fetchArticleSuccess = withMatcher(
    (article: Article): FetchArticleSuccess => createAction(ARTICLES_ACTION_TYPES.FETCH_ARTICLE_SUCCESS, article)
);
export const fetchArticleFailure = withMatcher(
    (error: Error): FetchArticleFailure => createAction(ARTICLES_ACTION_TYPES.FETCH_ARTICLE_FAILURE, error)
);

//set-article
export const setArticleStart = withMatcher(
    (article: Article): SetArticleStart => createAction(ARTICLES_ACTION_TYPES.SET_ARTICLE_START, article)
);
export const setArticleSuccess = withMatcher(
    (article: Article): SetArticleSuccess => createAction(ARTICLES_ACTION_TYPES.SET_ARTICLE_SUCCESS, article)
);
export const setArticleFailure = withMatcher(
    (error: Error): SetArticleFailure => createAction(ARTICLES_ACTION_TYPES.SET_ARTICLE_FAILURE, error)
);

//set-article
export const setArticlesSearchedStart = withMatcher(
    (articleTitle: string): SetArticlesSearchedStart => createAction(ARTICLES_ACTION_TYPES.SET_ARTICLES_SEARCHED_START, articleTitle)
);
export const setArticlesSearchedSuccess = withMatcher(
    (articleTitle: string): SetArticlesSearchedSuccess => createAction(ARTICLES_ACTION_TYPES.SET_ARTICLES_SEARCHED_SUCCESS, articleTitle)
);
export const setArticlesSearchedFailure = withMatcher(
    (error: Error): SetArticlesSearchedFailure => createAction(ARTICLES_ACTION_TYPES.SET_ARTICLES_SEARCHED_FAILURE, error)
);
