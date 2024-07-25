import { withProcess, PushProps } from './push.process';
import ArticlesSearched from '../../components/articlesSearched/articlesSearched.component';
import ArticleCardFlows from '../../components/articleCardFlows/articleCardFlows.component';
import Spinner from '../../components/spinner/spinner.component';

import './push.styles.scss';

const PUSH = (props: PushProps) => {
    const { load, articleCardFlows,pageNum,setPageNum,articlesLength } = props;
    if (!articleCardFlows) {
        return <Spinner />;
    }

    return <div className="pushBox">
        <ArticlesSearched pageNum={pageNum} setPageNum={setPageNum} articlesLength={articlesLength} />
        <div className="flowsBox">
            {
                load ? <Spinner />
                    : <ArticleCardFlows pageNum={pageNum} articleCardFlows={articleCardFlows} />
            }
        </div>
    </div>;
}

export default withProcess(PUSH);