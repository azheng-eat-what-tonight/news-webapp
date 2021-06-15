/**
 * 封装 axios 请求模块
 */
import axios from "axios"

import store from '@/store/'

const request = axios.create({
    // baseURL: "http://172.31.44.142:8081/" // 实验室 基础路径
    // baseURL: "http://172.31.44.145:8081/"
    // baseURL: "http://10.20.171.246:8080/" //bnuz
    baseURL: "http://10.16.91.152:8081/" //宿舍
        //baseURL: "http://10.20.189.182:8080/"
});

// 请求拦截器 (统一设置token)

// Add a request interceptor
request.interceptors.request.use(function(config) {
    const { user } = store.state
        // 统一设置token
    if (user) {
        config.headers.Authorization = `${user.token}`
    }
    // console.log("用户token:" + config.headers.Authorization)
    return config;
}, function(error) {
    // Do something with request error
    return Promise.reject(error);
});

// 响应拦截器
axios.interceptors.response.use(function(response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function(error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});

// 导出
export default request

/**
import request from '@/utils/request'
 
request({
  method: 'xxx',
  url: 'xxx',
  ...
})
 */