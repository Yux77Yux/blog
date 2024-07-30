import { AnyAction } from 'redux-saga';
import {
    signInWithEmailSuccess,
    signInWithEmailFailure,
    signUpWithEmailSuccess,
    signUpWithEmailFailure,
    signOutSuccess,
    signOutFailure,
} from './user.actions';
import { UserActive } from './user.types';

export interface UserState {
    readonly hint: string,
    readonly userActive: UserActive | null,
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
            hint: action.payload,
            error: null,
        }
    }

    if (signOutSuccess.match(action)) {
        return {
            ...state,
            hint: action.payload,
            userActive: null,
            latestTime: null,
            error: null,
        }
    }

    if (signUpWithEmailFailure.match(action)) {
        return {
            ...state,
            hint: action.payload,
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

    if (signOutFailure.match(action)) {
        return {
            ...state,
            hint: action.payload,
        }
    }

    return state;
}