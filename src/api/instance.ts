import axios from "axios";
export const axiosIns = axios.create({
    baseURL:"https://ohiv5hc3rbfckomnt4opoft7km0jdjqq.lambda-url.us-east-1.on.aws",
    //60s
    timeout: 60 * 1000,
    headers:{
        "Content-Type":'Application/json'
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
    if (error.response.status === 401) {
        // store.logout()
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});