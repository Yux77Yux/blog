import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { setArticlesSearchedStart } from '../../store/articles/articles.action';
import './articlesSearched.styles.scss';

export const withProcess = (Component) => (props) => {
    const dispatch = useDispatch();

    const moveHandler = useCallback((event) => {
        const target = event.target;
        const first = target.parentNode.children[0];
        const underline = target.parentNode.nextSibling;

        underline.style.transform = first === target ? "translateX(0)" : "translateX(11.265vw)";
    }, []);

    const searchHandler = useCallback((event) => {
        const target = event.target;
        const title = target.parentNode.children[0].value;
        dispatch(setArticlesSearchedStart(title));
    }, [dispatch]);

    const clearSearchedHandler = useCallback((event) => {
        const target = event.target.parentNode.children[0];
        target.value = null;
    }, []);

    const enterHandler = useCallback((event) => {
        if (event.keyCode === 13) {
            const target = event.target;
            const enter = target.parentNode.children[2];
            enter.click();
        }
    }, [])

    const handlers = {
        moveHandler: moveHandler,
        searchHandler: searchHandler,
        clearSearchedHandler: clearSearchedHandler,
        enterHandler: enterHandler,
    }

    return <Component
        {...props}
        {...handlers}
    />
}