//在index.js中引入axios
import axios from "axios";
// //引入qs模块，用来序列化post类型的数据
// import QS from "qs";
//antd的message提示组件，大家可根据自己的ui组件更改。
import { message } from "antd";

import { store } from "@/store/index.js";
//保存环境变量
const isProduction = process.env.NODE_ENV == "production";

//区分开发环境还是生产环境基础URL
export const baseUrl = isProduction
  ? "http://geek.itheima.net/v1_0"
  : "http://geek.itheima.net/v1_0";

//设置axios基础路径
const service = axios.create({
  baseURL: baseUrl,
  timeout: 10000,
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 每次发送请求之前本地存储中是否存在token，也可以通过Redux这里只演示通过本地拿到token
    // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
    // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
    // console.log(store.getState(), "store.getState()");
    const token =
      store.getState().userReducer.token ||
      localStorage.getItem("react_vite-js_token");
    //在每次的请求中添加token
    //设置请求头
    config.headers = {
      "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
      Authorization: `Bearer ${token}`,
    };
    // config.data = QS.stringify(config.data);
    return config;
  },
  (error) => {
    return error;
  }
);

// 响应拦截器
service.interceptors.response.use((response) => {
  //根据返回不同的状态码做不同的事情
  // 这里一定要和后台开发人员协商好统一的错误状态码
  if (response.status) {
    switch (response.status) {
      case 200:
        return response.data;
      case 201:
        return response.data;
      case 401:
        //未登录处理方法
        break;
      case 403:
        //token过期处理方法
        break;
      default:
        message.error(response.data.data.msg);
    }
  } else {
    return response;
  }
});
//最后把封装好的axios导出
export default service;
