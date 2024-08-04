import { AnyAction } from 'redux-saga';
import {
    signInWithEmailSuccess,
    signInWithEmailFailure,
    signUpWithEmailSuccess,
    signUpWithEmailFailure,
    signOutSuccess,
    signOutFailure,
    fetchLatestUserSuccess,
    fetchLatestUserFailure,
} from './user.actions';
import { UserIncidental } from './user.types';

export interface UserState {
    readonly hint: string,
    readonly userActive: UserIncidental | null,
    readonly latestTime: Date | null,
    readonly error: Error | null,
}

const USER_INITIAL_STATUS: UserState = {
    hint: "",
    userActive: null,
    latestTime: null,
    error: null,
}

export const userReducer = (state = USER_INITIAL_STATUS, action = {} as AnyAction) => {
    if (signInWithEmailSuccess.match(action)) {
        return {
            ...state,
            hint: "",
            userActive: action.payload,
            latestTime: new Date(),
            error: null,
        }
    }

    if (signUpWithEmailSuccess.match(action)) {
        return {
            ...state,
            hint: "注册成功",
            error: null,
        }
    }

    if (signOutSuccess.match(action)) {
        return {
            ...state,
            hint: "",
            userActive: null,
            latestTime: null,
            error: null,
        }
    }

    if (fetchLatestUserSuccess.match(action)) {
        return {
            ...state,
            hint: "",
            userActive: action.payload,
            latestTime: new Date(),
            error: null,
        }
    }

    if (signInWithEmailFailure.match(action)) {
        return {
            ...state,
            hint: action.payload.message,
            userActive: null,
            latestTime: null,
            error: action.payload,
        }
    }

    if (signUpWithEmailFailure.match(action)) {
        return {
            ...state,
            hint: "",
        }
    }

    if (signOutFailure.match(action)) {
        return {
            ...state,
            hint: "",
        }
    }

    if (fetchLatestUserFailure.match(action)) {
        return {
            ...state,
            hint: action.payload.message,
            userActive: null,
            latestTime: null,
            error: action.payload,
        }
    }

    return state;
}