import {
    call,
    all
} from 'typed-redux-saga/macro';

import { articlesSaga } from './articles/articles.saga';
import { userSaga } from './user/user.saga';

export function* rootSaga(){
    yield* all([
        call(articlesSaga),
        call(userSaga),
    ])
}