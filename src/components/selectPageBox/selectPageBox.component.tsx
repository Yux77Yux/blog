import { MouseEventHandler } from 'react';
import './selectPageBox.styles.scss';

interface SelectPageBoxProps {
    firstPageHandler: MouseEventHandler<HTMLDivElement>,
    prevPageHandler: MouseEventHandler<HTMLDivElement>,
    selectPageHandler: MouseEventHandler<HTMLElement>,
    nextPageHandler: MouseEventHandler<HTMLDivElement>,
    endPageHandler: MouseEventHandler<HTMLDivElement>,

    left: string,
    articlesLength: number,
}

const SelectPageBox = (props: SelectPageBoxProps) => {
    const {
        firstPageHandler,
        prevPageHandler,
        selectPageHandler,
        nextPageHandler,
        endPageHandler,
        left,
        articlesLength,
    } = props;

    return <div className="selectPageBox">
        <div className="firstPage" onClick={firstPageHandler}></div>
        <div className="prevPage" onClick={prevPageHandler}></div>
        <div className="selectPage">
            <ul className="pagesNumber" style={{ left: `${left}` }}>
                {(() => {
                    const pages = Math.ceil(articlesLength / 3);
                    return Array.from({ length: pages }, (_, index) => (
                        <li key={index} className="pageItem" onClick={selectPageHandler}>
                            {index + 1}
                        </li>
                    ));
                })()}
            </ul>
        </div>
        <div className="nextPage" onClick={nextPageHandler}></div>
        <div className="endPage" onClick={endPageHandler}></div>
    </div>
}

export default SelectPageBox;