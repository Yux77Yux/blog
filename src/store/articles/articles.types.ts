export enum ARTICLES_ACTION_TYPES {
    FETCH_ARTICLES_START = 'articles/FETCH_ARTICLES_START',
    FETCH_ARTICLES_SUCCESS = 'articles/FETCH_ARTICLES_SUCCESS',
    FETCH_ARTICLES_FAILURE = 'articles/FETCH_ARTICLES_FAILURE',

    FETCH_ARTICLE_START = 'articles/FETCH_ARTICLE_START',
    FETCH_ARTICLE_SUCCESS = 'articles/FETCH_ARTICLE_SUCCESS',
    FETCH_ARTICLE_FAILURE = 'articles/FETCH_ARTICLE_FAILURE',

    SET_ARTICLE_START = 'articles/SET_ARTICLE_START',
    SET_ARTICLE_SUCCESS = 'articles/SET_ARTICLE_SUCCESS',
    SET_ARTICLE_FAILURE = 'articles/SET_ARTICLE_FAILURE',

    SET_ARTICLES_SEARCHED_START = 'articles/SET_ARTICLES_SEARCHED_START',
    SET_ARTICLES_SEARCHED_SUCCESS = 'articles/SET_ARTICLES_SEARCHED_SUCCESS',
    SET_ARTICLES_SEARCHED_FAILURE = 'articles/SET_ARTICLES_FAILURE',
}

export type Articles = ArticlesPage[];

export type ArticlesPage = ArticleFlow[];

export type ArticleFlow = ArticleBrief[];

export interface ArticleBrief {
    uuid: string, //主键，唯一搜索
    uid: string, //外键，UserIncidental.Uid,可链接到作者页
    title: string, //文章标题，可用于模糊搜索
    titleLight: string, //标题是否高亮
    coverDimensions: string, //封面大小，用于类选择器
    coverImageUrl: string, //帖子封面
    summrary: string,//文章概述
    createdAt: string, //创建时间
    updatedAt: string,//更新时间
    views: number | 0, // 浏览次数
    likes: number | 0, // 点赞次数
    author: string,//作者名，后端传过来
    profile: string,//作者头像，同上
}

export interface Article extends ArticleBrief {
    content: string, //文章内容
    tags: string[], //文章分类标签
    status: 'draft' | 'published' | 'archived',
    popularity: number | 0,
}//总共16个字段
