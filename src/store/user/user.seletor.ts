import { createSelector } from 'reselect';

import { UserState } from './user.reducer';
import { RootState } from '../store';

export const selectUserReducer = (state: RootState) => state.user;

export const getUserSelector = createSelector(
    [selectUserReducer],
    (reducerState: UserState) => reducerState.userActive
)

export const getTimeSelector = createSelector(
    [selectUserReducer],
    (reducerState: UserState) => reducerState.latestTime
)

export const getHintSelector = createSelector(
    [selectUserReducer],
    (reducerState: UserState) => reducerState.hint
)

export const getErrorSelector = createSelector(
    [selectUserReducer],
    (reducerState: UserState) => reducerState.error
)
