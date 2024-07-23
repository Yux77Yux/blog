import { MouseEventHandler } from 'react';
import './imageButton.styles.scss';

interface ImageButtonProps {
    onClickEvent: MouseEventHandler<HTMLDivElement>,
    buttonImage: string,
    backgroundColor?: string,
}

const ImageButton = (props: ImageButtonProps) => {
    const { onClickEvent, buttonImage, backgroundColor } = props;
    const buttonImagePath = require(`../../assets/${buttonImage}`);

    return <img
        src={buttonImagePath}
        alt="出错啦！X w X"
        style={{ backgroundColor: `${backgroundColor}` }}
        className="back"
        onClick={onClickEvent}
    />
}

export default ImageButton;