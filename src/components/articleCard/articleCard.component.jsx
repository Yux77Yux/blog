import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import './articleCard.styles.scss';

const ArticleCard = (props) => {
    const navigate = useNavigate();
    const { articleCard } = props;
    const { profile, coverImageUrl,uuid } = articleCard;
    const coverImageUrlPath = require(`../../assets/${coverImageUrl}`);
    const profileImage = require(`../../assets/${profile}`);
    
    const cardClick = useCallback(() => {
        const url = `${window.location.origin}/articles/${uuid}`;
        window.open(url, '_blank');
    }, [uuid,navigate]);

    return (
        <>
            <div className={articleCard.coverDimensions}>
                <img src={coverImageUrlPath} alt="XwX" className="coverImage" onClick={cardClick} />

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