export function createAction(type, payload) {
    return { type, payload };
}

export function withMatcher(actionCreator) {
    const type = actionCreator().type;
    return Object.assign(actionCreator, {
        type,
        match(action) {
            return action.type === type;
        }
    });
}