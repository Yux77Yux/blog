import { withProcess, HomeProps } from './home.process';
import ArticlesSearched from '../../components/articlesSearched/articlesSearched.component';
import ArticleCardFlows from '../../components/articleCardFlows/articleCardFlows.component';
import Spinner from '../../components/spinner/spinner.component';

import './home.styles.scss';

const Home = (props: HomeProps) => {
    const { load, articleCardFlows } = props;
    if (!articleCardFlows) {
        return <Spinner />;
    }

    return <div className="homeBox">
        <ArticlesSearched />
        <div className="flowsBox">
            {
                load ? <Spinner />
                    : <ArticleCardFlows articleCardFlows={articleCardFlows} />
            }
        </div>
    </div>;
}

export default withProcess(Home);