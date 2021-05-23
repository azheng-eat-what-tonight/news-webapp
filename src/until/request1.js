/**
 * 封装 axios 请求模块
 */
import axios from "axios"

const request1 = axios.create({
    baseURL: "http://172.31.44.142:8080/" // 实验室 基础路径
        // baseURL: "http://10.20.171.246:8080/" //bnuz
        //baseURL: "http://10.16.91.152:8080/"  //宿舍
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