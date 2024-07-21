import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    getArticlesSearchedSelector,
    getArticlesSelector,
} from '../../store/articles/articles.selector';
import { fetchArticlesStart } from '../../store/articles/articles.action';

import { getArticlesMap } from '../../utils/processData/articles.utils';

export const withProcess = (Component) => (props) => {
    const dispatch = useDispatch();
    const articleTitle = useSelector(getArticlesSearchedSelector);
    let articles = useSelector(getArticlesSelector);
    const [load, setLoad] = useState(true);
    const [articleCardFlows, setArticleCardFlows] = useState(null);

    useEffect(() => {
        dispatch(fetchArticlesStart());
    }, [dispatch]);

    useEffect(() => {
        setArticleCardFlows(() => getArticlesMap(articles, articleTitle));
        setLoad(false);
    }, [articleTitle, articles]);

    const other = {
        load: load,
        articleCardFlows: articleCardFlows,
    }

    return <Component {...props} {...other} />
}
