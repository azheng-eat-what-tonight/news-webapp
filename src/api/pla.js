/**
 *平台请求处理
 */
//   / 参数是String pla_name
//  / int pla_id
import request from '@/until/request'

/**
 * 计算平台新闻总数
 */
export const countPlaNews = data => {
    return request({
        method: 'post',
        url: '/countPlaNews',
        data
    })
}


/**
 * 计算平台总订阅人数
 */
export const countPlaSubscription = data => {
    return request({
        method: 'post',
        url: '/countPlaSubscription',
        data
    })
}