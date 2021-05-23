/**
 * 新闻请求处理
 */

import request1 from '@/until/request1'

/**
 * 获取新闻
 */
export const getNews = data => {
    console.log(data)
    return request1({
        headers: {
            token: `http-test`,
        },
        method: 'get',
        url: '/getNews',
        data
    })
}