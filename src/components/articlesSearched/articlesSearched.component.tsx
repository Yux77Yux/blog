/* eslint-disable @typescript-eslint/no-unused-vars */

import { withProcess, SearchedProps } from './articlesSearched.process';
import InputBox from '../inputBox/inputBox.component';
import SelectPageBox from '../selectPageBox/selectPageBox.component';

import './articlesSearched.styles.scss';

const ArticlesSearched = (props: SearchedProps) => {
    const {
        clearSearchedHandler,
        searchHandler,
        moveHandler,
        enterHandler,
        firstPageHandler,
        prevPageHandler,
        selectPageHandler,
        nextPageHandler,
        endPageHandler,
        articlesLength,
        left,
    } = props;

    return <div className="searchBox">
        <InputBox
            enterHandler={enterHandler}
            clearSearchedHandler={clearSearchedHandler}
            searchHandler={searchHandler}
        />

        <div className="searchCategories">
            <div className="searchCategory" onClick={moveHandler}>
                <span className="text">贴子</span>
            </div>
            <div className="searchCategory" onClick={moveHandler}>
                <span className="text">用户</span>
            </div>
        </div>
        <span className="underline"></span>

        <div className="filterContent"></div>

        <SelectPageBox
            firstPageHandler={firstPageHandler}
            prevPageHandler={prevPageHandler}
            selectPageHandler={selectPageHandler}
            nextPageHandler={nextPageHandler}
            endPageHandler={endPageHandler}
            left={left}
            articlesLength={articlesLength}
        />
    </div>
}

export default withProcess(ArticlesSearched);