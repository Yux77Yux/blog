import { NavLink } from 'react-router-dom';

import Spinner from '../spinner/spinner.component';


import { withProcessNav, ArticlesDetailProps } from './articleDetail.process';
import './articleDetail.styles.scss';


const ArticleDetail = (props: ArticlesDetailProps) => {
    const { loading, articleDetail, backHandler, mouseDownHandler } = props;
    if (!articleDetail) return <Spinner />;
    const { coverImageUrl } = articleDetail;
    const coverImageUrlPath = require(`../../assets/${coverImageUrl}`);

    if(loading){
        return <Spinner />;
    }

    return (
        <div className="detailBackground">
            <div className="backBox" onClick={backHandler}>
                <div className="back"></div>
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