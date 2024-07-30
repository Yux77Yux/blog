/* eslint-disable react-hooks/exhaustive-deps */
import React, { ComponentType, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { ArticleCardFlowsProps } from '../../components/articleCardFlows/articleCardFlows.component';

import {
    getArticlesSelector,
    articlesIsLoading,
    getArticlesSearchedSelector
} from '../../store/articles/articles.selector';
import { Articles } from '../../store/articles/articles.types';


export interface PushProps extends ArticleCardFlowsProps {
    load: boolean,
    articleCardFlows: Articles,
    pageNum: number,
    setPageNum: React.Dispatch<React.SetStateAction<number>>,
    articlesLength: number,
}

export function withProcess(Component: ComponentType<PushProps>) {
    return () => {
        const articles = useSelector(getArticlesSelector);
        const isLoading = useSelector(articlesIsLoading);
        const title = useSelector(getArticlesSearchedSelector);
        const [prevTitle, setPrevTitle] = useState("");
        const articlesLength = articles.length;
        const [pageNum, setPageNum] = useState(1);

        useEffect(() => {
            if (title !== prevTitle) {
                setPageNum(1);
            }
            setPrevTitle(() => title);
        }, [title]);

        const other = {
            load: isLoading,
            articleCardFlows: articles,
            pageNum: pageNum,
            setPageNum: setPageNum,
            articlesLength: articlesLength,
        }

        return <Component {...other} />
    }
}