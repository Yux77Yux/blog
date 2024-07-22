import './videoBackground.styles.scss';

interface VideoBackgroundProps {
    video: string,
}

const VideoBackground = (props: VideoBackgroundProps) => {
    const { video } = props;
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