import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import './articleCard.styles.scss';

const ArticleCard = props => {
    const navigate = useNavigate();
    const { articleCard } = props;
    const { authorProfile, pageImage,Id } = articleCard;
    const pageImagePath = require(`../../assets/${pageImage}`);
    const profileImage = require(`../../assets/${authorProfile}`);

    const cardClick = useCallback(() => {
        navigate(`/articles/${Id}`);
    }, [Id,navigate]);

    return (
        <>
            <div className={articleCard.cardClassName}>
                <img src={pageImagePath} alt="XwX" className="pageImage" onClick={cardClick} />

                <div className="authorProfileBlocks">
                    <div className="authorProfileBlockMain"></div>
                    <div className="authorProfileBlockLeft"></div>
                    <div className="authorProfileBlockRight"></div>
                    <img src={profileImage} alt="XwX" className="authorProfile" />
                </div>

                <div className="articleBlock">
                    <span className="articleAuthor text">
                        {articleCard.author}
                    </span>
                    <span className="authorUnderline text"></span>
                    <span className={`${articleCard.articleTitleClassName} text`}>
                        {articleCard.articleTitleContent}
                    </span>
                    <span className="articleContent text">
                        {articleCard.articleContent}
                    </span>
                </div>
            </div>
        </>
    );
}

export default ArticleCard;