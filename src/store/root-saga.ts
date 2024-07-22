import {
    call,
    all
} from 'typed-redux-saga/macro';

import { articlesSaga } from './articles/articles.saga';

export function* rootSaga(){
    yield* all([
        call(articlesSaga),
    ])
}