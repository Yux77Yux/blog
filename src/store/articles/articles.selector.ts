import { createSelector } from 'reselect';

import { ArticlesState } from './articles.reducer';
import { RootState } from '../store';

export const selectArticlesReducer = (state: RootState) => state.articles;

export const getArticlesSelector = createSelector(
    [selectArticlesReducer],
    (reducerState: ArticlesState) => reducerState.articles
)

export const getArticleSelector = createSelector(
    [selectArticlesReducer],
    (reducerState: ArticlesState) => reducerState.article
)

export const getArticlesSearchedSelector = createSelector(
    [selectArticlesReducer],
    (reducerState: ArticlesState) => reducerState.articleTitle
)

export const articlesIsLoading = createSelector(
    [selectArticlesReducer],
    (reducerState: ArticlesState) => reducerState.isLoading
)