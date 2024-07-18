import { useCallback } from 'react';
import { NavLink } from 'react-router-dom';

import './articleDetail.styles.scss';

const ArticleDetail = (props) => {
    const { articleDetail } = props;
    const { pageImage } = articleDetail;
    const pageImagePath = require(`../../assets/${pageImage}`);

    const backHandler = useCallback((event) => {
        const target = event.target.parentNode.parentNode;
        target.style.visibility = 'hidden';
        target.style.height = '0';
        target.style.width = '0';

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
                        <NavLink className="contentOption">
                            <div className="text">内容</div>
                        </NavLink>
                        <NavLink className="contentOption">
                            <div className="text">评论</div>
                        </NavLink>
                    </div>
                    <div className="move"></div>
                </div>
                
            </div>
        </div>
    );
}

export default ArticleDetail;