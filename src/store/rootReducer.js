import { combineReducers } from "redux";

import { articlesReducer } from './articles/articles.reducer';

export const rootReducer = combineReducers({
    articles: articlesReducer
})