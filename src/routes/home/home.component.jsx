import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ArticleCardFlows from '../../components/articleCardFlows/articleCardFlows.component';

import { getArticlesSelector } from '../../store/articles/articles.selector';
import { fetchArticlesStart } from '../../store/articles/articles.action';

import { getArticlesMap } from '../../utils/processData/articles.utils';
import './home.styles.scss';

const Home = () => {
    const dispatch = useDispatch();
    const articles = useSelector(getArticlesSelector);
    const articleCardFlows = getArticlesMap(articles);

    useEffect(() => {
        dispatch(fetchArticlesStart());
    }, [])

    return <div className="homeBox">
        <ArticleCardFlows articleCardFlows={articleCardFlows} />
    </div>
}

export default Home;