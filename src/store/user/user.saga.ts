/* eslint-disable @typescript-eslint/no-unused-vars */
import { takeLatest, all, call, put, select } from 'typed-redux-saga/macro';
import {
    USER_ACTION_TYPES,
    UserIncidental,
    UserModify,
    UsernameAndPassword
} from "./user.types";
import {
    SignInWithEmailStart,
    SignUpWithEmailStart,
    UpdateUserStart,
    signInWithEmailSuccess,
    signInWithEmailFailure,
    signUpWithEmailSuccess,
    signUpWithEmailFailure,
    signOutSuccess,
    signOutFailure,
    updateUserSuccess,
    updateUserFailure,
} from './user.actions';
import { getUserSelector } from './user.seletor';

import {
    userSignInAsync,
    userSignUpAsync,
    userSignOutAsync,
    updateUserAsync,
} from '../../utils/processData/user.utils';

type ResponseType = UserIncidental | { err: string };

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

export function* updateUser({ payload }: UpdateUserStart) {
    const currentUser: UserIncidental | null = yield* select(getUserSelector);
    if (!currentUser) return;
    const upload: { id: number } & UserModify = {
        id: currentUser.id,
        ...payload
    }

    try {
        const response = yield* call(updateUserAsync, upload);

        if (response instanceof Error) {
            throw response;
        }

        yield* put(updateUserSuccess(response));
    } catch (error) {
        yield* put(updateUserFailure(error as Error));
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

export function* onUpdateUser() {
    yield* takeLatest(USER_ACTION_TYPES.UPDATE_USER_START, updateUser);
}

export function* userSaga() {
    yield* all([
        call(onSignInAsync),
        call(onSignUpAsync),
        call(onSignOutAsync),
        call(onUpdateUser),
    ]);
}