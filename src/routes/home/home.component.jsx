import './home.styles.scss';

const Home = () => {
    return (
        <>
            <div className="homeBox">
                <div className="cardFlow">
                    <div className="articleCardMedium"></div>
                    <div className="articleCardSmall"></div>
                    <div className="articleCardMedium"></div>
                </div>
                <div className="cardFlow">
                    <div className="articleCardLarg"></div>
                    <div className="articleCardSmall"></div>
                </div>
                <div className="cardFlow">
                    <div className="articleCardSmall"></div>
                    <div className="articleCardMedium"></div>
                    <div className="articleCardMedium"></div>
                </div>
                <div className="cardFlow">
                    <div className="articleCardLarg"></div>
                    <div className="articleCardLarg"></div>
                </div>
                <div className="cardFlow">
                    <div className="articleCardMedium"></div>
                    <div className="articleCardMedium"></div>
                </div>
            </div>
        </>
    );
}

export default Home;