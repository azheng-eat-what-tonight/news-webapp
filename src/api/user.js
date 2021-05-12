/**
 * 用户请求处理
 */

import request from '../until/request'

/**
 * 登录
 */
export const login = data => {
    return request({
        method: 'POST',
        url: '/app/v1_0/authorizations',
        data
    })

}