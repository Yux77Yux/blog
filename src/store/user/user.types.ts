export enum USER_ACTION_TYPES {
    SIGN_IN_WITH_EMAIL_START = "user/SIGN_IN_WITH_EMAIL_START",
    SIGN_IN_WITH_EMAIL_SUCCESS = "user/SIGN_IN_WITH_EMAIL_SUCCESS",
    SIGN_IN_WITH_EMAIL_FAILURE = "user/SIGN_IN_WITH_EMAIL_FAILURE",
    SIGN_UP_WITH_EMAIL_START = "user/SIGN_UP_WITH_EMAIL_START",
    SIGN_UP_WITH_EMAIL_SUCCESS = "user/SIGN_UP_WITH_EMAIL_SUCCESS",
    SIGN_UP_WITH_EMAIL_FAILURE = "user/SIGN_UP_WITH_EMAIL_FAILURE",
    FETCH_USER_START = "user/FETCH_USER_START",
    FETCH_USER_SUCCESS = "user/FETCH_USER_SUCCESS",
    FETCH_USER_FAILURE = "user/FETCH_USER_FAILURE",
    AUTO_SIGN_IN_START = "user/AUTO_SIGN_IN_START",

    SIGN_OUT_START = "/user/SIGN_OUT_START",
    SIGN_OUT_SUCCESS = "/user/SIGN_OUT_SUCCESS",
}

export interface UsernameAndPassword {
    username: string, //唯一键
    password: string, //密文
}

export interface UserIncidental {
    uid: string, //主键，主要用于被搜索，生成后不可更改
    name: string, //昵称，也可用于被搜索，允许可以更改
    profile: string, //头像图片地址
    bio: string, //个性签名
    status: boolean, //登录状态
    popularity: number, //主页受欢迎程度，用于优先搜索
}
