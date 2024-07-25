import { useState, useEffect, useRef, useCallback } from 'react';

import ArticleCard from '../articleCard/articleCard.component';

import { _run } from '../../utils/processData/timeSharedRender.utils';

import { Articles, ArticleFlow } from '../../store/articles/articles.types';

import './articleCardFlows.styles.scss';

export interface ArticleCardFlowsProps {
    articleCardFlows: Articles,
    pageNum: number,
}

const ArticleCardFlows = (props: ArticleCardFlowsProps) => {
    const { articleCardFlows, pageNum } = props;
    const [left, setLeft] = useState('0');
    const [renderedCards, setRenderedCards] = useState<JSX.Element[]>([]);
    const currentIndexRef = useRef(0);

    const renderHandler = useCallback((currentFlow: ArticleFlow, newIndex: number): JSX.Element => {
        return <div className="flowBox" key={newIndex}>
            <div className="articleCardFlow">
                {currentFlow.map((item) => (
                    <ArticleCard articleCard={item} key={item.uuid} />
                ))}
            </div>
        </div>
    }, []);

    useEffect(() => {
        const movePage = -63 * (pageNum - 1) + "vw";
        setLeft(() => movePage);
    }, [articleCardFlows, pageNum]);

    useEffect(() => {
        if (articleCardFlows.length <= 0) return;

        currentIndexRef.current = 0;
        setRenderedCards([]);

        _run(articleCardFlows, currentIndexRef, setRenderedCards, renderHandler);
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

    return <>
        <div className="articleCardFlows" style={{ left: `${left}` }}>
            {renderedCards}
        </div>
    </>;
}

export default ArticleCardFlows;