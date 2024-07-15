import './articleCard.styles.scss';

const ArticleCard = props => {
    const { articleCard } = props;
    const contentImagePath = require("../../assets/1145.jpg");
    const profileImage = require(`../../assets/${articleCard.authorProfilePath}`);

    return (
        <div className={articleCard.cardClassName}>
            <img src={contentImagePath} alt="XwX" className="contentImage" />

            <div className="authorProfileBlocks">
                <div className="authorProfileBlockMain"></div>
                <div className="authorProfileBlockLeft"></div>
                <div className="authorProfileBlockRight"></div>
                <img src={profileImage} alt="XwX" className="authorProfile" />
            </div>

            <div className="articleBlock">
                <span className="articleAuthor">
                    {articleCard.author}
                </span>
                <span className="authorUnderline"></span>
                <span className={articleCard.articleTitleClassName}>
                    {articleCard.articleTitleContent}
                </span>
                <span className="articleContent">
                    {articleCard.articleContent}
                </span>
            </div>
        </div>
    );
}

export default ArticleCard;