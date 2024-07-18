import {
    call,
    all
} from 'redux-saga/effects';

import { articlesSaga } from './articles/articles.saga';

export function* rootSaga(){
    yield all([
        call(articlesSaga),
    ])
}