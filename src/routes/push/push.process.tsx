import React, { ComponentType, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { ArticleCardFlowsProps } from '../../components/articleCardFlows/articleCardFlows.component';

import {
    getArticlesSelector,
} from '../../store/articles/articles.selector';
import { ArticlesPage } from '../../store/articles/articles.types';


export interface PushProps extends ArticleCardFlowsProps {
    load: boolean,
    articleCardFlows: ArticlesPage,
    setPageNum: React.Dispatch<React.SetStateAction<number>>,
}

export function withProcess(Component: ComponentType<PushProps>) {
    return () => {
        const articles = useSelector(getArticlesSelector);
        const [load, setLoad] = useState(true);
        const [articleCardFlows, setArticleCardFlows] = useState<ArticlesPage>([]);
        const [pageNum, setPageNum] = useState(0);

        useEffect(() => {
            setArticleCardFlows(
                () => articles[pageNum] || []
            );
            setLoad(false);
        }, [articles, pageNum]);

        let other = {
            load: load,
            articleCardFlows: articleCardFlows,
            setPageNum: setPageNum,
        }

        return <Component {...other} />
    }
}