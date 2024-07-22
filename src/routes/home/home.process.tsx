import { ComponentType, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ArticleCardFlowsProps } from '../../components/articleCardFlows/articleCardFlows.component';

import {
    getArticlesSearchedSelector,
    getArticlesBriefSelector,
} from '../../store/articles/articles.selector';
import { fetchArticlesStart } from '../../store/articles/articles.action';
import { ArticlesPage } from '../../store/articles/articles.types';


export interface HomeProps extends ArticleCardFlowsProps {
    load: boolean,
}

export function withProcess(Component: ComponentType<HomeProps>) {
    return () => {
        const dispatch = useDispatch();
        const articleTitle = useSelector(getArticlesSearchedSelector);
        const articles = useSelector(getArticlesBriefSelector);
        const [load, setLoad] = useState(true);
        const [articleCardFlows, setArticleCardFlows] = useState<ArticlesPage | null>(null);
        const [pageNum, setPageNum] = useState(0);

        useEffect(() => {
            dispatch(fetchArticlesStart(articleTitle));
        }, [articleTitle]);

        useEffect(() => {
            setArticleCardFlows(
                () => articles[pageNum] || null
            );
            setLoad(false);
        }, [articles, pageNum]);

        let other = {
            load: load,
            articleCardFlows: articleCardFlows,
        }

        return <Component {...other} />
    }
}