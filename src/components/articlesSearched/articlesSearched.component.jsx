import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { setArticlesSearchedStart } from '../../store/articles/articles.action';

import './articlesSearched.styles.scss';

const ArticlesSearched = () => {
    const dispatch = useDispatch();
    const [searchedTitle, setSearchedTitle] = useState("");

    useEffect(() => {
        dispatch(setArticlesSearchedStart(searchedTitle));
    }, [dispatch, searchedTitle]);

    const moveHandler = useCallback((event) => {
        const target = event.target;
        const first = target.parentNode.children[0];
        const underline = target.parentNode.nextSibling;

        underline.style.transform = first === target ? "translateX(0)" : "translateX(11.265vw)";
    }, []);

    const searchHandler = useCallback((event) => {
        const target = event.target;
        const title = target.parentNode.children[0].value;
        setSearchedTitle(() => title);
    }, []);

    const clearSearchedHandler = useCallback((event) => {
        const target = event.target.parentNode.children[0];
        target.value = null;
    }, []);

    return <div className="searchBox">
        <div className="inputBox">
            <input type="text" name="searchedKeyword" placeholder="" />
            <div className="crossMark" onClick={clearSearchedHandler}></div>
            <div className="magnifying-glass" onClick={searchHandler}></div>
        </div>

        <div className="searchCategories">
            <div className="searchCategory" onClick={moveHandler}>
                <span className="text">贴子</span>
            </div>
            <div className="searchCategory" onClick={moveHandler}>
                <span className="text">用户</span>
            </div>
        </div>
        <span className="underline"></span>
    </div>;
}

export default ArticlesSearched;