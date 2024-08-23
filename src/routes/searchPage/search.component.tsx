import { withProcess, SearchProps } from './search.process';
import ArticlesSearched from '../../components/articlesSearched/articlesSearched.component';
import ArticleCardFlows from '../../components/articleCardFlows/articleCardFlows.component';
import Spinner from '../../components/spinner/spinner.component';

import './search.styles.scss';

const Search = (props: SearchProps) => {
    const { load, articleCardFlows,pageNum,setPageNum,articlesLength } = props;
    if (!articleCardFlows) {
        return <Spinner />;
    }

    return <div className="searchPageBox">
        <ArticlesSearched pageNum={pageNum} setPageNum={setPageNum} articlesLength={articlesLength} />
        <div className="flowsBox">
            {
                load ? <Spinner />
                    : <ArticleCardFlows pageNum={pageNum} setPageNum={setPageNum} articleCardFlows={articleCardFlows} />
            }
        </div>
    </div>;
}

export default withProcess(Search);