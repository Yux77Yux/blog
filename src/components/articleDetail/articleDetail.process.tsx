import { useEffect, useState, useCallback, MouseEventHandler, ComponentType } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';


import { getArticlesBriefSelector } from '../../store/articles/articles.selector';
import { ArticleBrief } from '../../store/articles/articles.types';

export interface ArticlesDetailProps {
    articleDetail: ArticleBrief | null,
    backHandler: MouseEventHandler<HTMLDivElement>,
    mouseDownHandler: MouseEventHandler<HTMLDivElement>,
    loading:boolean,
}

export const withProcessNav = (Component: ComponentType<ArticlesDetailProps>) => () => {
    const navigate = useNavigate();
    const { uuid } = useParams();
    const articles = useSelector(getArticlesBriefSelector);
    const [articleDetail, setArticleDetail] = useState<ArticleBrief | null>(null);
    const [loading, setLoading] = useState(true);

    const backHandler = useCallback((event: React.MouseEvent) => {
        navigate(-1);
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
            navigate("/home");
            return;
        }
        let id = parseInt(uuid as string);
        let page = id / 300;
        let flow = (id % 300) / 5;
        let index = id % 5;
        index = (index + 4) % 5;
        index = Math.floor(index);
        flow = index === 4 ? (flow + 59) % 60 : flow;
        flow = Math.floor(flow);
        page = flow === 59 && index === 4 ? page - 1 : page;
        page = Math.floor(page);

        const foundArticle = articles[page][flow][index] || null;

        if (!foundArticle) {
            navigate("/home");
            return;
        } else {
            setArticleDetail(foundArticle);
            setLoading(false);
        }
    }, [uuid, articles, navigate]);

    const otherProps = {
        articleDetail: articleDetail!,
        backHandler: backHandler,
        mouseDownHandler: mouseDownHandler,
        loading:loading
    }
    return <Component {...otherProps} />
};