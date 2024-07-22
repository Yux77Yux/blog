import { AnyAction } from 'redux-saga';
import {
    fetchArticlesStart,
    fetchArticlesSuccess,
    fetchArticlesFailure,
    setArticlesSearchedStart,
    setArticlesSearchedSuccess,
    setArticlesSearchedFailure,
} from './articles.action';

import { Articles,Article } from './articles.types';

export interface ArticlesState{
    readonly articlesBrief: Articles,
    readonly article: Article | null,
    readonly articleTitle: string,
    readonly isLoading: boolean,
    readonly error: Error | null,
}

const ARTICLES_INITIAL_STATE:ArticlesState = {
    articlesBrief: [],
    article: null,
    articleTitle: "",
    isLoading: false,
    error: null,
}

export const articlesReducer = (state = ARTICLES_INITIAL_STATE, action = {} as AnyAction) => {
    if (fetchArticlesStart.match(action)) {
        return {
            ...state,
            isLoading: true,
        }
    }

    if (fetchArticlesSuccess.match(action)) {
        return {
            ...state,
            articlesBrief: action.payload,
            isLoading: false,
        }
    }

    if (fetchArticlesFailure.match(action)) {
        return {
            ...state,
            error: action.payload,
            isLoading: false,
        }
    }

    if (setArticlesSearchedStart.match(action)) {
        return {
            ...state,
            isLoading: true,
        }
    }

    if (setArticlesSearchedSuccess.match(action)) {
        return {
            ...state,
            articleTitle: action.payload,
            isLoading: false,
        }
    }

    if (setArticlesSearchedFailure.match(action)) {
        return {
            ...state,
            error: action.payload,
            isLoading: false,
        }
    }

    return state;
}