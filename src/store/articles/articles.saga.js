import { takeLatest, all, call, put } from "redux-saga/effects";
import { getArticlesAsync } from "../../utils/data";
import { ARTICLES_ACTION_TYPES } from "./articles.types";
import {
    fetchArticlesSuccess,
    fetchArticlesFailure,
    setArticlesSearchedSuccess,
    setArticlesSearchedFailure,
} from './articles.action';



export function* fetchArticlesAsync() {
    try {
        const articlesArray = yield call(getArticlesAsync);
        yield put(fetchArticlesSuccess(articlesArray));
    } catch (error) {
        yield put(fetchArticlesFailure(error));
    }
}

export function* setArticlesSearched({ payload }) {
    try {
        yield put(setArticlesSearchedSuccess(payload));
    } catch (error) {
        yield put(setArticlesSearchedFailure(error));
    }
}

export function* onFetchArticles() {
    yield takeLatest(ARTICLES_ACTION_TYPES.FETCH_ARTICLES_START, fetchArticlesAsync);
}

export function* onSetArticlesSearched() {
    yield takeLatest(ARTICLES_ACTION_TYPES.SET_ARTICLES_SEARCHED_START, setArticlesSearched);
}

export function* articlesSaga() {
    yield all([
        call(onFetchArticles),
        call(onSetArticlesSearched),
    ]);
}