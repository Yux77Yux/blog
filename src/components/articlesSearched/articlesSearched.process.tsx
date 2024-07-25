/* eslint-disable react-hooks/exhaustive-deps */
import { ComponentType, KeyboardEventHandler, MouseEventHandler, useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { fetchArticlesStart } from '../../store/articles/articles.action';
import './articlesSearched.styles.scss';

export interface HandlersAndProps {
    moveHandler: MouseEventHandler<HTMLDivElement>,
    searchHandler: MouseEventHandler<HTMLDivElement>,
    clearSearchedHandler: MouseEventHandler<HTMLDivElement>,
    enterHandler: KeyboardEventHandler<HTMLInputElement>,

    firstPageHandler: MouseEventHandler<HTMLDivElement>,
    prevPageHandler: MouseEventHandler<HTMLDivElement>,
    selectPageHandler: MouseEventHandler<HTMLElement>,
    nextPageHandler: MouseEventHandler<HTMLDivElement>,
    endPageHandler: MouseEventHandler<HTMLDivElement>,

    left: string,
}

export interface SearchedProps extends HandlersAndProps {
    pageNum: number,
    setPageNum: React.Dispatch<React.SetStateAction<number>>,
    articlesLength: number,
}

export const withProcess = (Component: ComponentType<SearchedProps>) =>
    (props: Omit<SearchedProps, keyof HandlersAndProps>) => {
        const { setPageNum, articlesLength, pageNum } = props;
        const [left, setLeft] = useState('0');
        const dispatch = useDispatch();

        useEffect(() => {
            const pageItems = document.querySelectorAll('.pageItem');
            if (pageItems.length === 0) return;
            pageItems.forEach((pageItem, index) => {
                const bits = Math.floor(Math.log10(index + 1)) + 1;
                const item = pageItem as HTMLElement;
                item.style.width = bits * 1.5 + 'vh';
            });
        }, [articlesLength])

        useEffect(() => {
            const pageItems = document.querySelectorAll('.pageItem');
            if (pageItems.length === 0) return;
            pageItems.forEach((pageItem, index) => {
                const item = pageItem as HTMLElement;
                item.style.textDecoration = 'none';
            });
            (pageItems[pageNum - 1] as HTMLElement).style.textDecoration = 'underline';

            const moveNum = pageNum - 4;
            if (moveNum <= 0) {
                setLeft('0');
                return;
            }

            const bits = Math.floor(Math.log10(pageNum)) + 1;
            let move = 0;
            for (let i = 1; i < bits; ++i) {
                if (i === 1) {
                    move += 5;
                    continue;
                }
                move += Math.pow(10, i - 1) * 9 * i
            }
            if (bits > 1) {
                move += (pageNum - Math.pow(10, bits - 1) + 1) * bits;
            } else {
                move += moveNum;
            }

            const moveNums = '-' + (2.5 * moveNum + 1.50 * move) + 'vh';
            setLeft(() => moveNums);
        }, [pageNum])

        useEffect(() => {
            const firstPage = document.querySelector('.firstPage') as HTMLElement;
            const prevPage = document.querySelector('.prevPage') as HTMLElement;
            const nextPage = document.querySelector('.nextPage') as HTMLElement;
            const endPage = document.querySelector('.endPage') as HTMLElement;

            if (!firstPage || !prevPage || !nextPage || !endPage) return;

            firstPage.style.pointerEvents = 'auto';
            prevPage.style.pointerEvents = 'auto';
            nextPage.style.pointerEvents = 'auto';
            endPage.style.pointerEvents = 'auto';

            firstPage.style.opacity = '1';
            prevPage.style.opacity = '1';
            nextPage.style.opacity = '1';
            endPage.style.opacity = '1';

            if (pageNum === 1) {
                firstPage.style.pointerEvents = 'none';
                prevPage.style.pointerEvents = 'none';

                firstPage.style.opacity = '0.2';
                prevPage.style.opacity = '0.2';
            }

            if (pageNum === Math.ceil(articlesLength / 3)) {
                nextPage.style.pointerEvents = 'none';
                endPage.style.pointerEvents = 'none';

                nextPage.style.opacity = '0.2';
                endPage.style.opacity = '0.2';
            }
            //selectPage
        }, [pageNum, articlesLength]);

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

            dispatch(fetchArticlesStart(title));
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

        const firstPageHandler = useCallback((event: React.MouseEvent) => {
            setPageNum(1);
        }, []);

        const prevPageHandler = useCallback((event: React.MouseEvent) => {
            setPageNum((prevPageNum) => prevPageNum - 1);
        }, [articlesLength]);

        const selectPageHandler = useCallback((event: React.MouseEvent) => {
            const target = event.target as HTMLLIElement;
            if (!target) return;
            const value = parseInt(target.innerText);
            setPageNum(() => value);
        }, [articlesLength]);

        const nextPageHandler = useCallback((event: React.MouseEvent) => {
            setPageNum((prevPageNum) => prevPageNum + 1);
        }, [articlesLength]);

        const endPageHandler = useCallback((event: React.MouseEvent) => {
            setPageNum(() => Math.ceil(articlesLength / 3));
        }, [articlesLength]);

        const handlers = {
            moveHandler: moveHandler,
            searchHandler: searchHandler,
            clearSearchedHandler: clearSearchedHandler,
            enterHandler: enterHandler,
            prevPageHandler: prevPageHandler,
            selectPageHandler: selectPageHandler,
            nextPageHandler: nextPageHandler,
            firstPageHandler: firstPageHandler,
            endPageHandler: endPageHandler,
            left: left,
        }

        return <Component {...props} {...handlers} />
    }