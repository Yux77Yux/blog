import { KeyboardEventHandler, MouseEventHandler } from 'react';
import './inputBox.styles.scss';

interface InputBox {
    searchHandler: MouseEventHandler<HTMLDivElement>,
    clearSearchedHandler: MouseEventHandler<HTMLDivElement>,
    enterHandler: KeyboardEventHandler<HTMLInputElement>,
}

const InputBox = (props: InputBox) => {
    const { searchHandler, clearSearchedHandler, enterHandler } = props;

    return <div className="inputBox">
        <input type="text" name="searchedKeyword" placeholder="" onKeyDown={enterHandler} />
        <div className="crossMark" onClick={clearSearchedHandler}></div>
        <div className="magnifying-glass" onClick={searchHandler}></div>
    </div>
}

export default InputBox;