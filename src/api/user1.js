/**
 * 用户请求处理
 */

import request1 from '../until/request1'

/**
 * 登录
 */
export const login = data => {
    return request1({
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
    return request1({
        headers: {
            token: `http-test`
        },
        method: 'post',
        url: '/register',
        data
    })
}

/**
 * 获取用户频道列表
 */
export const getUserChannels = () => {
    return request1({
        method: 'get',
        usr: '/user/channels'
    })
}