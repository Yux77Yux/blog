import React from 'react';
import './videoBackground.styles.scss';

const VideoBackground = (props) => {
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

export default VideoBackground;