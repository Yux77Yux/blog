import { useCallback } from 'react';
import ArticleDetail from '../articleDetail/articleDetail.component';

import './articleCard.styles.scss';

const ArticleCard = props => {
    const { articleCard } = props;
    const { authorProfile, pageImage } = articleCard;
    const pageImagePath = require(`../../assets/${pageImage}`);
    const profileImage = require(`../../assets/${authorProfile}`);

    const cardClick = useCallback((event) => {
        const target = event.target.parentNode.previousSibling;
        target.style.visibility = 'visible';
        target.style.height = '100vh';
        target.style.width = '100%';
    }, [articleCard]);

    return (
        <>
            <ArticleDetail articleDetail={articleCard} />
            <div className={articleCard.cardClassName}>
                <img src={pageImagePath} alt="XwX" className="pageImage" onClick={cardClick} />

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
        </>
    );
}

export default ArticleCard;