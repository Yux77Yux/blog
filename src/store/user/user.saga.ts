/* eslint-disable @typescript-eslint/no-unused-vars */
import { takeLatest, all, call, put, select } from 'typed-redux-saga/macro';
import {
    USER_ACTION_TYPES,
    UserActive,
    UserIncidental,
    UsernameAndPassword
} from "./user.types";
import {
    SignInWithEmailStart,
    SignInWithEmailSuccess,
    SignInWithEmailFailure,
    SignUpWithEmailStart,
    SignUpWithEmailSuccess,
    SignUpWithEmailFailure,
    SignOutStart,
    SignOutSuccess,
    signInWithEmailSuccess,
    signInWithEmailFailure,
    signUpWithEmailSuccess,
    signUpWithEmailFailure,
    signOutSuccess,
    signOutFailure,
} from './user.actions';
import { getUserSelector } from './user.seletor';

type ResponseType = UserActive | { err: string } | UserIncidental;

export function* signInAsync({ payload }: SignInWithEmailStart) {
    try {
        console.log(payload)
        const response: Response = yield* call(fetch, "http://localhost:3001/api/user/sign-in", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        const result: ResponseType = yield* call([response, response.json]);

        if (!response.ok) {
            throw new Error((result as { err: string }).err);
        }

        yield* put(signInWithEmailSuccess(result as UserActive));
    } catch (error) {
        yield* put(signInWithEmailFailure(error as Error));
    }
}

export function* signUpAsync({ payload }: SignUpWithEmailStart) {
    try {
        const response: Response = yield* call(fetch, "http://localhost:3001/api/user/sign-up", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const result: ResponseType = yield* call([response, response.json]);

        if (!response.ok) {
            throw new Error((result as { err: string }).err);
        }


        yield* put(signUpWithEmailSuccess("注册成功！"));
    } catch (error) {
        yield* put(signUpWithEmailFailure((error as Error).message));
    }
}

export function* signOutAsync() {
    try {
        const currentUser: UserActive | null = yield* select(getUserSelector);
        if (!currentUser) return;
        const response: Response = yield* call(fetch, "http://localhost:3001/api/user/sign-out", {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `id=${encodeURIComponent(currentUser.id)}`
        });

        const result = yield* call([response, response.json]);

        if (!response.ok) {
            throw new Error(result.err);
        }

        yield* put(signOutSuccess(result.success));
    } catch (error) {
        yield* put(signOutFailure((error as Error).message));
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

export function* userSaga() {
    yield* all([
        call(onSignInAsync),
        call(onSignUpAsync),
        call(onSignOutAsync),
    ]);
}