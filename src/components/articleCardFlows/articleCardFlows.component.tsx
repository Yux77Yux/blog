import { useState, useEffect, useRef, useCallback } from 'react';

import ArticleCard from '../articleCard/articleCard.component';

import { _runAsync } from '../../utils/processData/timeSharedRender.utils';

import { ArticlesPage, ArticleFlow } from '../../store/articles/articles.types';

import './articleCardFlows.styles.scss';

export interface ArticleCardFlowsProps {
    articleCardFlows: ArticlesPage | null,
}

const ArticleCardFlows = (props: ArticleCardFlowsProps) => {
    const { articleCardFlows } = props;
    const [renderedCards, setRenderedCards] = useState([]);
    const currentIndexRef = useRef(0);

    const renderHandler = useCallback((currentFlow: ArticleFlow, newIndex: number) => {
        return <div className="articleCardFlow" key={newIndex}>
            {
                currentFlow.map((item) =>
                    <ArticleCard articleCard={item} key={item.uuid} />
                )
            }
        </div>;
    }, []);

    useEffect(() => {
        if (!articleCardFlows) {
            return;
        }

        currentIndexRef.current = 0;
        setRenderedCards([]);

        _runAsync(articleCardFlows, currentIndexRef, setRenderedCards, renderHandler);
    }, [articleCardFlows, renderHandler]);

    if (!articleCardFlows) {
        return (
            <div className="articleCardFlows">
                <div style={{
                    position: 'relative',
                    fontSize: '60px',
                    textAlign: 'center',
                    top: '45%',
                    textDecorationLine: 'underline'
                }}>
                    No more!
                </div>
            </div>
        );
    }

    return (
        <div className="articleCardFlows">
            {renderedCards}
        </div>
    );
}

export default ArticleCardFlows;