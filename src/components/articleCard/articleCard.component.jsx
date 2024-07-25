import { Link } from 'react-router-dom';

import './articleCard.styles.scss';

const ArticleCard = (props) => {
    const { articleCard } = props;
    const { profile, coverImageUrl, uuid } = articleCard;
    const coverImageUrlPath = require(`../../assets/${coverImageUrl}`);
    const profileImage = require(`../../assets/${profile}`);

    return (
        <>
            <div className={articleCard.coverDimensions}>
                <Link to={`/articles/${uuid}`} className="coverBox">
                    <img src={coverImageUrlPath} alt="XwX" className="coverImage" />
                </Link>
                <div className="profileBlocks">
                    <div className="profileBlockMain"></div>
                    <div className="profileBlockLeft"></div>
                    <div className="profileBlockRight"></div>
                    <img src={profileImage} alt="XwX" className="profile" />
                </div>

                <div className="articleBlock">
                    <span className="articleAuthor text">
                        {articleCard.author}
                    </span>
                    <span className="authorUnderline text"></span>
                    <span className={`${articleCard.titleLight} text`}>
                        {articleCard.title}
                    </span>
                    <span className="summrary text">
                        {articleCard.summrary}
                    </span>
                </div>
            </div>
        </>
    );
}

export default ArticleCard;