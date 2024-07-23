import { withProcess, PushProps } from './push.process';
import ArticlesSearched from '../../components/articlesSearched/articlesSearched.component';
import ArticleCardFlows from '../../components/articleCardFlows/articleCardFlows.component';
import Spinner from '../../components/spinner/spinner.component';

import './push.styles.scss';

const Home = (props: PushProps) => {
    const { load, articleCardFlows,setPageNum } = props;
    if (!articleCardFlows) {
        return <Spinner />;
    }

    return <div className="pushBox">
        <ArticlesSearched setPageNum={setPageNum} />
        <div className="flowsBox">
            {
                load ? <Spinner />
                    : <ArticleCardFlows setPageNum={setPageNum} articleCardFlows={articleCardFlows} />
            }
        </div>
    </div>;
}

export default withProcess(Home);