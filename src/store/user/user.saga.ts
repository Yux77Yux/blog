/* eslint-disable @typescript-eslint/no-unused-vars */
import { takeLatest, all, call, put, select } from 'typed-redux-saga/macro';
import {
    USER_ACTION_TYPES,
    UserIncidental,
    UsernameAndPassword
} from "./user.types";
import {
    SignInWithEmailStart,
    SignUpWithEmailStart,
    signInWithEmailSuccess,
    signInWithEmailFailure,
    signUpWithEmailSuccess,
    signUpWithEmailFailure,
    signOutSuccess,
    signOutFailure,
    fetchLatestUserSuccess,
    fetchLatestUserFailure,
} from './user.actions';
import { getUserSelector } from './user.seletor';

import {
    userSignInAsync,
    userSignUpAsync,
    userSignOutAsync,
    fetchLatestUserAsync,
} from '../../utils/processData/user.utils';

export function* signInAsync({ payload }: SignInWithEmailStart) {
    try {
        const response = yield* call(userSignInAsync, payload);

        if (response instanceof Error) {
            throw response
        }

        yield* put(signInWithEmailSuccess(response));
    } catch (error) {
        yield* put(signInWithEmailFailure(error as Error));
    }
}

export function* signUpAsync({ payload }: SignUpWithEmailStart) {
    try {
        const response: Error | null = yield* call(userSignUpAsync, payload);

        if (response instanceof Error) {
            throw response;
        }

        yield* put(signUpWithEmailSuccess("注册成功！"));
    } catch (error) {
        yield* put(signUpWithEmailFailure((error as Error).message));
    }
}

export function* signOutAsync() {
    const currentUser: UserIncidental | null = yield* select(getUserSelector);
    if (!currentUser) return;

    try {
        const response: Error | {
            success: string;
        } = yield* call(userSignOutAsync, currentUser.id);

        if (response instanceof Error) {
            throw response;
        }
        yield* put(signOutSuccess(response.success));
    } catch (error) {
        yield* put(signOutFailure((error as Error).message));
    }
}

export function* fetchLatestUser() {
    const currentUser: UserIncidental | null = yield* select(getUserSelector);
    if (!currentUser) return;

    try {
        const response: UserIncidental | Error = yield* call(fetchLatestUserAsync, currentUser.id);

        if (response instanceof Error) {
            throw response;
        }
        yield* put(fetchLatestUserSuccess(response));
    } catch (error) {
        yield* put(fetchLatestUserFailure(error as Error));
    }
}

export function* onSignInAsync() {
    yield* takeLatest(USER_ACTION_TYPES.SIGN_IN_WITH_EMAIL_START, signInAsync);
}

export function* onSignUpAsync() {
    yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_WITH_EMAIL_START, signUpAsync);
}

export function* onSignOutAsync() {
    yield* takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOutAsync);
}

export function* onFetchLatestUserUser() {
    yield* takeLatest(USER_ACTION_TYPES.FETCH_LATEST_USER_START, fetchLatestUser);
}

export function* userSaga() {
    yield* all([
        call(onSignInAsync),
        call(onSignUpAsync),
        call(onSignOutAsync),
        call(onFetchLatestUserUser),
    ]);
}