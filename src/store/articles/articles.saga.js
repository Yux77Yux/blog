import { takeLatest, all, call, put } from "redux-saga/effects";
import { getArticlesAsync } from "../../utils/data";
import { ARTICLES_ACTION_TYPES } from "./articles.types";
import {
    fetchArticlesSuccess,
    fetchArticlesFailure
} from './articles.action';

export function* fetchArticlesAsync() {
    try {
        const articlesArray = yield call(getArticlesAsync);
        yield put(fetchArticlesSuccess(articlesArray));
    } catch (error) {
        yield put(fetchArticlesFailure(error));
    }
}

export function* onFetchArticles() {
    yield takeLatest(ARTICLES_ACTION_TYPES.FETCH_ARTICLES_START, fetchArticlesAsync);
}

export function* articlesSaga() {
    yield all([
        call(onFetchArticles)
    ]);
}