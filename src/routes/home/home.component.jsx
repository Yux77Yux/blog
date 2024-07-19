import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ArticlesSearched from '../../components/articlesSearched/articlesSearched.component';
import ArticleCardFlows from '../../components/articleCardFlows/articleCardFlows.component';
import Spinner from '../../components/spinner/spinner.component';

import {
    getArticlesSearchedSelector,
    getArticlesSelector,
    articlesIsLoading
} from '../../store/articles/articles.selector';
import { fetchArticlesStart } from '../../store/articles/articles.action';

import { getArticlesMap } from '../../utils/processData/articles.utils';
import './home.styles.scss';

const Home = () => {
    const dispatch = useDispatch();
    const articleTitle = useSelector(getArticlesSearchedSelector);
    const articles = useSelector(getArticlesSelector);
    const isLoading = useSelector(articlesIsLoading);
    const [articleCardFlows, setArticleCardFlows] = useState(null);

    useEffect(() => {
        dispatch(fetchArticlesStart());
    }, [dispatch]);

    useEffect(() => {
        setArticleCardFlows(() => getArticlesMap(articles, articleTitle));
    }, [articleTitle, articles]);

    if (!articleCardFlows) {
        return <Spinner />;
    }

    return <div className="homeBox">
        <ArticlesSearched />
        {
            isLoading ? <Spinner />
                : <ArticleCardFlows articleCardFlows={articleCardFlows} />
        }
    </div>;
}

export default Home;