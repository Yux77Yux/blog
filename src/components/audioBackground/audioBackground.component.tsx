import React from 'react';
import './audioBackground.styles.scss';

interface AudioBackgroundProps{
    audio:string,
}

const AudioBackground = (props:AudioBackgroundProps) => {
    const {audio} = props;
    const audioSource = require(`../../assets/${audio}`);

    return (
        <div className="audio-background">
            <audio autoPlay loop muted>
                <source src={audioSource} type="audio/mpeg" />
            </audio>
        </div>
    );
}

export default AudioBackground;