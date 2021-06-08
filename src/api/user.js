/**
 * 用户请求处理
 */

import request from '@/until/request'

// 在非组件中模块加载

/**
 * 登录
 */
export const login = data => {
    console.log(data)
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
 */
export const register = data => {
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
    console.log("用户看新闻")
    console.log(data)
    return request({
        method: 'post',
        url: '/recordHistory',
        data
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
 * getHistoryRecord
 */
export const getHistoryRecord = () => {
    return request({
        method: 'get',
        url: '/getHistoryRecord',
    })
}


/**
 * 用户订阅 新闻平台
 */
export const subscribePla = data => {
    console.log("用户订阅")
    console.log(data)
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
    console.log("用户取消订阅")
    console.log(data)
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