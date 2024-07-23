import { NavLink } from 'react-router-dom';

import Spinner from '../spinner/spinner.component';
import ImageButton from '../imageButton/imageButton.component';

import { withProcessNav, ArticlesDetailProps } from './articleDetail.process';
import './articleDetail.styles.scss';


const ArticleDetail = (props: ArticlesDetailProps) => {
    const { loading, articleDetail, backHandler, mouseDownHandler,pageDefaultHandler } = props;
    if (!articleDetail) return <Spinner />;
    const { coverImageUrl } = articleDetail;
    const coverImageUrlPath = require(`../../assets/${coverImageUrl}`);
    const buttonBackImage = "arrow/turn-left.png";
    const buttonHouseImage = "house.png";

    if (loading) {
        return <Spinner />;
    }

    return (
        <div className="detailBackground">
            <div className="backBox">
                <ImageButton onClickEvent={backHandler} backgroundColor="rgb(37, 153, 82)" buttonImage={buttonBackImage} />
                <ImageButton onClickEvent={pageDefaultHandler} backgroundColor="rgb(150, 150, 150)" buttonImage={buttonHouseImage} />
            </div>
            <div className="detailBox">
                <img src={coverImageUrlPath} alt="出错啦！X w X" className="imageBlock" />
                <div className="contentBlocks">
                    <div className="contentOptions">
                        <NavLink to="content" className="contentOption">
                            <div className="text">内容</div>
                        </NavLink>
                        <NavLink to="comments" className="contentOption">
                            <div className="text">评论</div>
                        </NavLink>
                    </div>
                    <div className="move" onClick={mouseDownHandler}></div>
                </div>
            </div>
        </div>
    );
}

export default withProcessNav(ArticleDetail);