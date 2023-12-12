'use client'
import { AuthDataStorageKey } from "@/types";
import axios from "axios";
export const axiosIns = axios.create({
    baseURL: "https://9gc3ha01gb.execute-api.us-east-1.amazonaws.com/dev",
    //60s
    timeout: 60 * 1000,
    headers: {
        "Content-Type": 'Application/json',
        //add typeof fix: window or localStorage is not defined in nextjs server rendering
        'auth-header': typeof window !== 'undefined' && JSON.parse(localStorage.getItem(AuthDataStorageKey) || "null")?.id_token
    }
});
// Add a request interceptor
axiosIns.interceptors.request.use(function (config) {
    // 添加Auth请求头
    // (config.headers || (config.headers = {}))['Authorization'] = getItem(StorageKey.token)
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
axiosIns.interceptors.response.use(function (response: any) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error: { response: { status: number; }; }) {
    // const store = initializeStore()
    //遇到401的状态后删除本地token并重置登陆状态
    console.log(error)
    if(error && error.response && error.response.status === 401){
        //用户授权token expires
        location.href = process.env.NEXT_PUBLIC_singup_url as string
    }
    if (error.response.status != 200) {
        // store.logout()
        console.error(error)
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});