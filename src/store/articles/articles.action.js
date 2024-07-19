import { ARTICLES_ACTION_TYPES } from './articles.types';
import { createAction, withMatcher } from '../../utils/reducer/reducer.utils';

export const fetchArticlesStart = withMatcher(
    () => createAction(ARTICLES_ACTION_TYPES.FETCH_ARTICLES_START)
);

export const fetchArticlesSuccess = withMatcher(
    (articles) => createAction(ARTICLES_ACTION_TYPES.FETCH_ARTICLES_SUCCESS, articles)
);

export const fetchArticlesFailure = withMatcher(
    (error) => createAction(ARTICLES_ACTION_TYPES.FETCH_ARTICLES_FAILURE, error)
);

export const setArticlesStart = withMatcher(
    () => createAction(ARTICLES_ACTION_TYPES.SET_ARTICLES_START)
);

export const setArticlesSuccess = withMatcher(
    (article) => createAction(ARTICLES_ACTION_TYPES.SET_ARTICLES_SUCCESS, article)
);

export const setArticlesFailure = withMatcher(
    (error) => createAction(ARTICLES_ACTION_TYPES.SET_ARTICLES_FAILURE, error)
);

export const setArticlesSearchedStart = withMatcher(
    (articleTitle) => createAction(ARTICLES_ACTION_TYPES.SET_ARTICLES_SEARCHED_START, articleTitle)
);

export const setArticlesSearchedSuccess = withMatcher(
    (articleTitle) => createAction(ARTICLES_ACTION_TYPES.SET_ARTICLES_SEARCHED_SUCCESS, articleTitle)
);

export const setArticlesSearchedFailure = withMatcher(
    (error) => createAction(ARTICLES_ACTION_TYPES.SET_ARTICLES_SEARCHED_FAILURE, error)
);
