/**
 * 用户请求处理
 */

import request from '@/until/request'

// 在非组件中模块加载

/**
 * 是否初始化了
 */
export const isInit = data => {
    // console.log(data)
    return request({
        method: 'post',
        url: '/isInit',
        data
    })
}


/**
 * 登录
 */
export const login = data => {
    // console.log(data)
    return request({
        headers: {
            token: `http-test`
        },
        method: 'post',
        url: '/login',
        data
    })
}

/**
 * 注册 
 * 参数：user_logmane,password,question_id,answer
 */
export const register = data => {
    // console.log(data)
    return request({
        headers: {
            token: `http-test`
        },
        method: 'post',
        url: '/register',
        data
    })
}



/**
 * 修改用户信息
 */
export const modifyUserInfo = data => {
    // console.log(data)
    return request({
        method: 'post',
        url: '/modifyUserInfo',
        data
    })
}

/**
 * 验证用户是否存在
 */
export const verifyLogName = data => {
    // console.log(data)
    return request({
        method: 'post',
        url: '/verifyLogName',
        data
    })
}

/**
 * 获取当前用户的密保问题
 */
export const getUserQuestion = data => {
    // console.log(data)
    return request({
        method: 'post',
        url: '/getUserQuestion',
        data
    })
}

/**
 * 用户修改密码
 */
export const forgetPassword = data => {
    // console.log(data)
    return request({
        method: 'post',
        url: '/forgetPassword',
        data
    })
}

/**
 *  用户初始化自己的兴趣标签
 */
export const chooseUserLikeType = data => {
    // console.log("data")
    // console.log(data)
    // console.log("data")

    return request({
        method: 'post',
        url: '/chooseUserLikeType',
        data
    })
}



/**
 * 获取用户登录的信息
 */
export const getCurrentUser = () => {
    return request({
        method: 'get',
        url: '/getCurrentUser'

    })
}

/**
 * 获取用户频道列表
 */
export const getUserChannels = () => {
    return request({
        method: 'get',
        url: '/user/channels'
    })
}

/**
 * 用户点击新闻 记录历史
 */
export const recordHistory = data => {
    // console.log("用户看新闻")
    // console.log(data)
    return request({
        method: 'post',
        url: '/recordHistory',
        data
    })
}

/**
 * 获取浏览记录
 */
export const getHistoryRecord = () => {
    return request({
        method: 'get',
        url: '/getHistoryRecord',
    })
}

/**
 * 用户获取收藏的新闻
 */
export const getCollectionNews = () => {
    return request({
        method: 'get',
        url: '/getCollectionNews',
    })
}

/**
 * 用户收藏新闻
 */
export const collectNews = data => {
    return request({
        method: 'Post',
        url: '/collectNews',
        data
    })
}

/**
 * 用户取消收藏
 */
export const cancelCollectNews = data => {
    return request({
        method: 'Post',
        url: '/cancelCollectNews',
        data
    })
}

/**
 * 检查是否收藏某一新闻
 * /isCollectionNews
 */
export const isCollectionNews = data => {
    // console.log(data);
    return request({
        method: 'post',
        url: '/isCollectionNews',
        data
    })
}

/**
 * 用户订阅 新闻平台
 */
export const subscribePla = data => {
    // console.log("用户订阅")
    // console.log(data)
    return request({
        method: 'post',
        url: '/subscribePla',
        data
    })
}


/**
 * 用户取消订阅平台
 */
export const unsubscribePla = data => {
    // console.log("用户取消订阅")
    // console.log(data)
    return request({
        method: 'post',
        url: '/unSubscribePla',
        data
    })
}

/**
 * 用户是否已订阅平台
 */
export const isSubscribePla = data => {
    // console.log("用户是否订阅")
    // console.log(data)
    return request({
        method: 'post',
        url: '/isSubscribePla',
        data
    })
}

/**
 * 查看用户订阅的平台
 */
export const getUserSubscribedPla = () => {
    return request({
        method: 'post',
        url: '/getUserSubscribedPla',
    })
}

/**
 * 获取注册所需的全部问题 /getAllQuestion
 */
export const getAllQuestion = () => {
    return request({
        method: 'get',
        url: '/getAllQuestion',
    })
}