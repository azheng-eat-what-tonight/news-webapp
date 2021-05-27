/**
 * 新闻请求处理
 */

import request from '@/until/request'

/**
 * 获取新闻
 */
export const getNews = data => {
    return request({
        headers: {
            token: `http-test`,
        },
        method: 'get',
        url: '/getNews',
        data
    })
}

/**
 * 获取新闻平台列表
 */
export const getAllPla = () => {
    return request({
        headers: {
            token: `http-test`,
        },
        method: 'get',
        url: '/getAllPla',
    })
}

/**
 * 获取对应平台新闻
 */
export const getPlaNews = data => {
    console.log(typeof data)
    console.log(data)
    return request({
        headers: {
            token: `http-test`,
        },
        method: 'post',
        url: '/getPlaNews',
        data
    })
}