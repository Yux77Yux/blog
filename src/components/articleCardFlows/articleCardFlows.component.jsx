import ArticleCard from '../articleCard/articleCard.component';

import './articleCardFlows.styles.scss';

const ArticleCardFlows = props => {
    const { articleCardFlows } = props;

    return (
        <>
            {
                Object.keys(articleCardFlows).map(flow =>
                    <div className="articleCardFlow" key={flow}>
                        {
                            Object.keys(articleCardFlows[flow]).map((Id) =>
                                <ArticleCard articleCard={articleCardFlows[flow][Id]} key={Id} />
                            )
                        }
                    </div>
                )
            }
        </>
    );
}

export default ArticleCardFlows;