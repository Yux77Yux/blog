import { ComponentType, KeyboardEventHandler, MouseEventHandler, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { setArticlesSearchedStart } from '../../store/articles/articles.action';
import './articlesSearched.styles.scss';

export interface Handlers {
    moveHandler: MouseEventHandler<HTMLDivElement>,
    searchHandler: MouseEventHandler<HTMLDivElement>,
    clearSearchedHandler: MouseEventHandler<HTMLDivElement>,
    enterHandler: KeyboardEventHandler<HTMLInputElement>,
}

export const withProcess = (Component: ComponentType<Handlers>) => () => {
    const dispatch = useDispatch();

    const moveHandler = useCallback((event: React.MouseEvent) => {
        const target = event.target as HTMLElement;
        const parent = target.parentNode as HTMLElement;
        if (!parent) return;

        const first = parent.children[0] as HTMLElement;
        const underline = parent.nextSibling as HTMLElement;

        underline.style.transform = first === target ? "translateX(0)" : "translateX(11.265vw)";
    }, []);

    const searchHandler = useCallback((event: React.MouseEvent) => {
        const target = event.target as HTMLElement;
        const parent = target.parentNode as HTMLElement;
        if (!parent) return;

        const inputText = parent.children[0] as HTMLInputElement;
        if (!inputText) return;
        const title = inputText.value;

        dispatch(setArticlesSearchedStart(title));
    }, [dispatch]);

    const clearSearchedHandler = useCallback((event: React.MouseEvent) => {
        const target = event.target as HTMLElement;
        const parent = target.parentNode as HTMLElement;
        if (!parent) return;

        const inputText = parent.children[0] as HTMLInputElement;
        if (!inputText) return;
        inputText.value = "";
    }, []);

    const enterHandler = useCallback((event: React.KeyboardEvent) => {
        if (event.keyCode === 13) {
            const target = event.target as HTMLElement;
            const parent = target.parentNode as HTMLElement;
            if (!parent) return;

            const enter = parent.children[2] as HTMLElement;
            if (!enter) return;
            enter.click();
        }
    }, []);

    const handlers = {
        moveHandler: moveHandler,
        searchHandler: searchHandler,
        clearSearchedHandler: clearSearchedHandler,
        enterHandler: enterHandler,
    }

    return <Component {...handlers} />
}