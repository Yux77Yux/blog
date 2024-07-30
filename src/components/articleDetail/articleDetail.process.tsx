import { useEffect, useState, useCallback, MouseEventHandler, ComponentType } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';


import { getArticlesSelector } from '../../store/articles/articles.selector';
import { ArticleBrief } from '../../store/articles/articles.types';

import {searchArticle} from '../../SmulateDatabase/searchDetail';

export interface ArticlesDetailProps {
    articleDetail: ArticleBrief | null,
    backHandler: MouseEventHandler<HTMLDivElement>,
    pageDefaultHandler: MouseEventHandler<HTMLDivElement>,
    mouseDownHandler: MouseEventHandler<HTMLDivElement>,
    loading:boolean,
}

export const withProcessNav = (Component: ComponentType<ArticlesDetailProps>) => () => {
    const navigate = useNavigate();
    const { uuid } = useParams();
    const articles = useSelector(getArticlesSelector);
    const [articleDetail, setArticleDetail] = useState<ArticleBrief | null>(null);
    const [loading, setLoading] = useState(true);

    const backHandler = useCallback((event: React.MouseEvent) => {
        navigate("/push");
    }, [navigate]);

    const pageDefaultHandler = useCallback((event: React.MouseEvent) => {
        navigate("/");
    }, [navigate]);

    const mouseDownHandler = useCallback((event: React.MouseEvent) => {
        const target = event.target as HTMLElement;
        const contentBlocks = target.parentNode as HTMLElement;
        if (!contentBlocks) return;
        const imageBlock = contentBlocks.previousSibling as HTMLImageElement;
        if (!imageBlock) return;
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

    useEffect(() => {
        if (!articles) {
            navigate("/push");
            return;
        }
        
        //请求替换点
        const foundArticle = searchArticle(uuid);

        if (!foundArticle) {
            navigate("/push");
            return;
        } else {
            setArticleDetail(foundArticle);
            setLoading(false);
        }
    }, [uuid, articles, navigate]);

    const otherProps = {
        articleDetail: articleDetail!,
        backHandler: backHandler,
        pageDefaultHandler:pageDefaultHandler,
        mouseDownHandler: mouseDownHandler,
        loading:loading
    }
    return <Component {...otherProps} />
};