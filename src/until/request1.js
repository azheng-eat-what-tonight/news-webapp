/**
 * 封装 axios 请求模块
 */
import axios from "axios"

const request1 = axios.create({
    baseURL: "http://172.31.44.142:8080/" // 基础路径
});

// 请求拦截器
// 响应拦截器

// 导出
export default request1

/**
import request from '@/utils/request'
 
request({
  method: 'xxx',
  url: 'xxx',
  ...
})
 */