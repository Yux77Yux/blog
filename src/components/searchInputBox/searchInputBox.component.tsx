import { KeyboardEventHandler, MouseEventHandler, } from 'react';
import './searchInputBox.styles.scss';

interface SearchInputBoxProps {
    searchHandler: MouseEventHandler<HTMLDivElement>,
    clearSearchedHandler: MouseEventHandler<HTMLDivElement>,
    enterHandler: KeyboardEventHandler<HTMLInputElement>,
}

const SearchInputBox = (props: SearchInputBoxProps) => {
    const {
        searchHandler,
        clearSearchedHandler,
        enterHandler,
    } = props;

    return <div className="searchInputBox">
        <input
            type="text"
            name="searchedKeyword"
            onKeyDown={enterHandler}
            placeholder="请输入关键词"
        />
        <div className="crossMark" onClick={clearSearchedHandler}></div>
        <div className="magnifying-glass" onClick={searchHandler}></div>
    </div>
}

export default SearchInputBox;