interface User {
    id: number, //主键 自增
    username: string, //唯一键
    password: string, //密文
}

interface UserIncidental {
    id: number, //主键，与User.id联系,
    uid: string, //唯一键，随主键生成，主要用于被搜索，生成后不可更改
    name: string, //昵称，也可用于被搜索，允许可以更改
    profile: string, //头像图片地址
    bio: string, //个性签名
    popularity: number, //主页受欢迎程度，用于优先搜索
    createdAt: Date //创建时间
    other?: Record<string, any>; // 其他附加信息（可选）
}