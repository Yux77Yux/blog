import ArticleCard from '../articleCard/articleCard.component';

import './articleCardFlows.styles.scss';

const ArticleCardFlows = props => {
    const { articleCardFlows } = props;
    
    if (Object.entries(articleCardFlows).length === 0) {
        return <div className="articleCardFlows">
            <div style={{
                position: 'relative',
                fontSize: '60px',
                textAlign: 'center',
                top: '45%',
                textDecorationLine: 'underline'
            }}>
                No result !
            </div>
        </div>;
    }

    return (
        <div className="articleCardFlows">
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
        </div>
    );
}

export default ArticleCardFlows;