import React from 'react';
import videoSource from '../../assets/bg.mp4';
import './videoBackground.styles.scss';

const VideoBackground = () => {
    return (
        <div className="video-background">
            <video autoPlay loop muted>
                <source src={videoSource} type="video/mp4" />
            </video>
        </div>
    );
}

export default VideoBackground;