import {
    fetchArticlesStart,
    fetchArticlesSuccess,
    fetchArticlesFailure,
    setArticlesSearchedStart,
    setArticlesSearchedSuccess,
    setArticlesSearchedFailure,
} from './articles.action';

const ARTICLES_INITIAL_STATE = {
    articles: [],
    articleTitle: "",
    isLoading: false,
    error: null,
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