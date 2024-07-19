import { useCallback, useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Spinner from '../spinner/spinner.component';

import { getArticlesSelector } from '../../store/articles/articles.selector';

import './articleDetail.styles.scss';

const withProcessNav = (MyComponent) => (props) => {
    const navigate = useNavigate();
    const { Id } = useParams();
    const articles = useSelector(getArticlesSelector);
    const [articleDetail, setArticleDetail] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const numericId = isNaN(Number(Id)) ? -1 : Number(Id);

        if (!Array.isArray(articles)) {
            navigate("/home");
            return;
        }

        const foundArticle = articles.find(item => item.Id === numericId);

        if (!foundArticle) {
            navigate("/home");
        } else {
            setArticleDetail(foundArticle);
            setLoading(false);
        }
    }, [Id, articles, navigate]);

    //因为useEffect内的更新不是同步的，还需要添加一个过渡时间实在的保证articleDetail确实存在
    if (loading) {
        return <Spinner />; // 或者可以返回一个加载中的状态
    }
    return <MyComponent {...props} navigate={navigate} articleDetail={articleDetail} />
};

const ArticleDetail = (props) => {
    const { articleDetail, navigate } = props;
    const { pageImage } = articleDetail;
    const pageImagePath = require(`../../assets/${pageImage}`);

    const backHandler = useCallback(() => {
        navigate(-1);
    }, [navigate]);

    const mouseDownHandler = useCallback((event) => {
        const target = event.target;
        const contentBlocks = target.parentNode;
        const imageBlock = contentBlocks.previousSibling;
        const imageBlockTranslate = -imageBlock.offsetWidth; // imageBlock 移动的距离（负宽度）

        if (target.style.transform === "rotateY(180deg)") {
            imageBlock.style.transform = `translateX(0)`;
            contentBlocks.style.transform = `translateX(0)`;
            target.style.transform = "rotateY(0)";
        } else {
            imageBlock.style.transform = `translateX(${imageBlockTranslate}px)`;
            contentBlocks.style.transform = `translateX(${imageBlockTranslate}px)`;
            target.style.transform = "rotateY(180deg)";
        }
    }, []);

    return (
        <div className="detailBackground">
            <div className="backBox" onClick={backHandler}>
                <div className="back"></div>
            </div>
            <div className="detailBox">
                <img src={pageImagePath} alt="出错啦！X w X" className="imageBlock" />
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