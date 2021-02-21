import axios from 'axios'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

export function request(config) {
    // 1.创建axios的实例
    const instance = axios.create({
        // baseURL: 'http://localhost:3000',
        // baseURL: 'http://42.192.91.181:3000',
        baseURL: 'http://nvz.xiuuhui.com/api',
        timeout: 10000
    })
    //2.axios的拦截器
    //请求拦截
    instance.interceptors.request.use(
        config => {
            // console.log(config);
            //1.比如config中的一些信息不符合服务器的要求
            //2.比如每次发送网络请求时都希望在界面中显示请求的图标
            //3.某些网络请求(比如登录(token)),是必须携带一些特殊的信息
            NProgress.start();
            return config
        }, err => {
            // console.log(err);
            return err
        });

    //响应拦截
    instance.interceptors.response.use(
        result => {
            // console.log(result);
            NProgress.done();
            return result.data
        }, err => {
            // console.log(err);
            NProgress.done();
            return err
        });

    //3.发送真正的网络请求
    return instance(config)
}