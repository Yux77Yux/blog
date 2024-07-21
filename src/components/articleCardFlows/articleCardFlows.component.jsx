import { useState, useEffect, useRef, useCallback } from 'react';

import ArticleCard from '../articleCard/articleCard.component';

import { _runAsync } from '../../utils/processData/timeSharedRender.utils';

import './articleCardFlows.styles.scss';

const ArticleCardFlows = (props) => {
    const { articleCardFlows } = props;
    const [renderedCards, setRenderedCards] = useState([]);
    const currentIndexRef = useRef(0);

    const renderHandler = useCallback((currentItem, newIndex) => {
        return <div className="articleCardFlow" key={newIndex}>
            {
                currentItem.map((item) =>
                    <ArticleCard articleCard={item} key={item.Id} />
                )
            }
        </div>;
    }, []);

    useEffect(() => {
        if (Object.entries(articleCardFlows).length === 0) {
            return;
        }

        currentIndexRef.current = 0;
        setRenderedCards([]);

        _runAsync(articleCardFlows, currentIndexRef, setRenderedCards, renderHandler);
    }, [articleCardFlows, renderHandler]);

    if (Object.entries(articleCardFlows).length === 0) {
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