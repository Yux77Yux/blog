import { createSelector } from 'reselect';

export const selectArticlesReducer = state => state.articles;

export const getArticlesSelector = createSelector(
    [selectArticlesReducer],
    (reducerState) => reducerState.articles
)

export const articlesIsLoading = createSelector(
    [selectArticlesReducer],
    (reducerState) => reducerState.isLoading
)