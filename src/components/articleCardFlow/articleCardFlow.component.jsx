import ArticleCard from '../articleCard/articleCard.component';

import './articleCardFlow.styles.scss';

const ArticleCardFlow = props => {
    const { articleCardFlows } = props;

    return (
        <>
            {
                Object.keys(articleCardFlows).map(cardFlow =>
                    <div className="articleCardFlow" key={cardFlow}>
                        {
                            articleCardFlows[cardFlow].map(articleCard =>
                                <ArticleCard articleCard={articleCard} key={articleCard.Id} />
                            )
                        }
                    </div>
                )
            }
        </>
    );
}

export default ArticleCardFlow;