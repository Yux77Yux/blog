import {
    fetchArticlesStart,
    fetchArticlesSuccess,
    fetchArticlesFailure
} from './articles.action';

const ARTICLES_INITIAL_STATE = {
    articles: {},
    isLoading: false,
    error: null
}

export const articlesReducer = (state = ARTICLES_INITIAL_STATE, action = {}) => {
    if (fetchArticlesStart.match(action)) {
        return {
            ...state,
            isLoading: true,
        }
    }

    if (fetchArticlesSuccess.match(action)) {
        return {
            ...state,
            articles: action.payload,
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

    return state;
}