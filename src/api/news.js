/**
 * 新闻请求处理
 */

import request from '@/until/request'

/**
 * 获取新闻
 */
export const getNews = data => {
    // console.log(data)

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
 * 获取推荐新闻
 */
export const recommend = data => {
    // console.log(data)
    return request({
        method: 'post',
        url: '/recommend',
        data
    })
}

/**
 * 获取对应类别的新闻 
 */
export const getTypeNews = data => {
    // console.log(data);
    return request({
        method: 'post',
        url: '/getTypeNews',
        data
    })
}

/**
 * 获取对应平台新闻
 */
export const getPlaNews = data => {
    // console.log(data)
    return request({
        headers: {
            token: `http-test`,
        },
        method: 'post',
        url: '/getPlaNews',
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
 * 获取所有新闻类别
 */
export const getAllType = () => {
    return request({
        method: 'get',
        url: '/getAllType',
    })
}



/**
 * 获取热榜新闻
 *  
 */
export const getHotNews = () => {
    return request({
        method: 'GET',
        url: '/getHotNews',
    })
}

/**
 * 搜索新闻 / 参数String news_title
 */
export const selectNews = data => {
    return request({
        method: 'post',
        url: '/selectNews',
        data
    })
}