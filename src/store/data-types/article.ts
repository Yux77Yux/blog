export interface Article {
    uuid: string, //主键，唯一搜索
    uid: string, //外键，UserIncidental.Uid,查到作者
    title: string, //文章标题，可用于模糊搜索
    coverImageUrl: string, //帖子封面
    coverImageDimensions: string, //封面大小，用于类选择器
    content: string,//文章内容
    tags: string[], //文章分类标签
    status: 'draft' | 'published' | 'archived',
    createdAt: Date, //创建时间
    updatedAt: Date,//更新时间
    views: number | 0, // 浏览次数
    likes: number | 0, // 点赞次数

    author: string,//作者名，后端传过来
    profile: string,//作者头像，同上
}
