/* eslint-disable @typescript-eslint/no-unused-vars */
import { takeLatest, all, call, put, select } from 'typed-redux-saga/macro';
import { getArticlesAsync } from "../../utils/data";
import { ARTICLES_ACTION_TYPES, Article, ArticleFlow, Articles } from "./articles.types";
import {
    FetchArticlesStart,
    fetchArticlesSuccess,
    fetchArticlesFailure,
    FetchArticleStart,
    fetchArticleSuccess,
    fetchArticleFailure,
    SetArticlesSearchedStart,
    setArticlesSearchedStart,
    setArticlesSearchedSuccess,
    setArticlesSearchedFailure,
    SetArticleStart,
    setArticleSuccess,
    setArticleFailure,
} from './articles.action';
import { getArticlesSelector, getArticlesSearchedSelector } from './articles.selector';
import { getArticlesMapAsync } from '../../utils/processData/articles.utils';


export function* fetchArticlesAsync({ payload }: FetchArticlesStart) {
    try {
        const articlesData: ArticleFlow = yield* call(getArticlesAsync);
        const articlesNew: Articles = yield* call(getArticlesMapAsync, articlesData, payload);

        const title = yield* select(getArticlesSearchedSelector);
        let articles: Articles = yield* select(getArticlesSelector);

        if (payload !== title) {
            articles = [];
            articles = articlesNew;
            yield* put(setArticlesSearchedStart(payload));
        } else {
            articles = [...articles, ...articlesNew];
        }

        yield* put(fetchArticlesSuccess(articles));
    } catch (error) {
        yield* put(fetchArticlesFailure(error as Error));
    }
}
/*
export function* fetchArticleAsync({ payload }: FetchArticleStart) {
    try {
        const article: Article = yield* call(getArticlesAsync, payload);
        yield* put(fetchArticleSuccess(article));
    } catch (error) {
        yield* put(fetchArticleFailure(error as Error));
    }
}

export function* setArticle({ payload }: FetchArticleStart) {
    try {
        yield* put(setArticleSuccess(payload));
    } catch (error) {
        yield* put(setArticlesSearchedFailure(error as Error));
    }
}
*/

export function* setArticlesSearched({ payload }: SetArticlesSearchedStart) {
    try {
        yield* put(setArticlesSearchedSuccess(payload));
    } catch (error) {
        yield* put(setArticlesSearchedFailure(error as Error));
    }
}

export function* onFetchArticlesAsync() {
    yield* takeLatest(ARTICLES_ACTION_TYPES.FETCH_ARTICLES_START, fetchArticlesAsync);
}
/*
export function* onFetchArticleAsync() {
    yield* takeLatest(ARTICLES_ACTION_TYPES.FETCH_ARTICLE_START, fetchArticlesAsync);
}

export function* onSetArticle() {
    yield* takeLatest(ARTICLES_ACTION_TYPES.SET_ARTICLES_SEARCHED_START, setArticlesSearched);
}*/

export function* onSetArticlesSearched() {
    yield* takeLatest(ARTICLES_ACTION_TYPES.SET_ARTICLES_SEARCHED_START, setArticlesSearched);
}

export function* articlesSaga() {
    yield* all([
        call(onFetchArticlesAsync),
        //call(onFetchArticleAsync),
        //call(onSetArticle),
        call(onSetArticlesSearched),
    ]);
}