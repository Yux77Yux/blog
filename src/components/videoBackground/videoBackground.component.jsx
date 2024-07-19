import React from 'react';
import './videoBackground.styles.scss';

const VideoBackground = (props) => {
    const {video} = props;
    const videoSource = require(`../../assets/${video}`);

    return (
        <div className="video-background">
            <video autoPlay loop muted>
                <source src={videoSource} type="video/mp4" />
            </video>
        </div>
    );
}

export default VideoBackground;