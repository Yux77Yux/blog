import { withProcess, SearchedProps } from './articlesSearched.process';
import './articlesSearched.styles.scss';

const ArticlesSearched = (props: SearchedProps) => {
    const { clearSearchedHandler, searchHandler, moveHandler, enterHandler,setPageNum } = props;

    return <div className="searchBox">
        <div className="inputBox">
            <input type="text" name="searchedKeyword" placeholder="" onKeyDown={enterHandler} />
            <div className="crossMark" onClick={clearSearchedHandler}></div>
            <div className="magnifying-glass" onClick={searchHandler}></div>
        </div>

        <div className="searchCategories">
            <div className="searchCategory" onClick={moveHandler}>
                <span className="text">贴子</span>
            </div>
            <div className="searchCategory" onClick={moveHandler}>
                <span className="text">用户</span>
            </div>
        </div>
        <span className="underline"></span>
    </div>;
}

export default withProcess(ArticlesSearched);