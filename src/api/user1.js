/**
 * 用户请求处理
 */

import request1 from '../until/request1'

/**
 * 登录
 */
export const login1 = data => {
    return request1({
        headers: {
            token: `http-test`
        },
        method: 'post',
        url: '/login',
        data
    })
}