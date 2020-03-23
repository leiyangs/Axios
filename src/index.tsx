import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';

const baseURL = 'http://localhost:8080/';
// 服务器返回的对象类型
interface User {
  name: string
  age: string
}

let user:User = {
  name: 'yang',
  age: '26'
}

/**
 * get/post请求
 */
// get 请求
axios({
  method: 'get',
  url: baseURL + 'get',
  params: user
}).then((response: AxiosResponse) => {
  console.log(response);
  return response.data;
}).catch((error: any) => {
  console.log(error);
})

// post 请求
let data = {
  name: 'yang',
  age: 16
}
axios({
  method: 'post',
  url: baseURL + 'post',
  headers: {
    'content-type': 'application/json'
  },
  data: data
}).then((response: AxiosResponse) => {
  console.log(response);
  return response.data;
}).catch((error: any) => {
  console.log(error)
})

/**
 * 错误处理
 */
// 1、无网络
setTimeout(() => {
  axios({
    method: 'post',
    url: baseURL + 'post',
    headers: {
      'content-type': 'application/json'
    },
    data: data
  }).then((response: AxiosResponse) => {
    console.log(response);
    return response.data;
  }).catch((error: any) => {
    console.log(error)
  })
}, 5000);

// 2、超时
axios({
  method: 'post',
  url: baseURL + 'post_timeout?timeout=3000',
  headers: {
    'content-type': 'application/json'
  },
  timeout: 1000,
  data: data
}).then((response: AxiosResponse) => {
  console.log(response);
  return response.data;
}).catch((error: any) => {
  console.log(error);
})  

// 3、状态码错误
axios({
  method: 'post',
  url: baseURL + 'post_status?code=400',
  headers: {
    'content-type': 'application/json'
  },
  data: data
}).then((response: AxiosResponse) => {
  console.log(response);
  return response.data;
}).catch((error: any) => {
  console.log(error);
})

/**
 * 拦截器
 */

// request是先进后出  response是先进先出
// interceptors.request.use 改变请求头  interceptors.response.use 改变响应返回值
console.time('cost')
 axios.interceptors.request.use((config: AxiosRequestConfig): AxiosRequestConfig => {
   config.headers.name += '1'
   return config
 })
 let request = axios.interceptors.request.use((config: AxiosRequestConfig): AxiosRequestConfig => {
  config.headers.name += '2'
  return config
 })
//  返回config或者Promise返回的config
 axios.interceptors.request.use((config: AxiosRequestConfig): AxiosRequestConfig | Promise<AxiosRequestConfig> => {
  //  成功的promise，会等promise执行完在向后执行
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.timeEnd('cost')
      config.headers.name += '3'
      resolve(config)
    },3000)
  }) 
  // 失败的promise会直接跳过，请求失败
  // return Promise.reject('失败的promise')
  // return config
 })
 axios.interceptors.request.eject(request);

 let response = axios.interceptors.response.use((config: AxiosResponse): AxiosResponse => {
   config.data.name += '1'
   return config;
 })
 axios.interceptors.response.use((config: AxiosResponse): AxiosResponse => {
  config.data.name += '2'
  return config;
 })
 axios.interceptors.response.use((config: AxiosResponse): AxiosResponse => {
  config.data.name += '3'
  return config;
 })
 axios.interceptors.response.eject(response);

axios({
  method: 'post',
  url: baseURL + 'post',
  data: user,
  headers: {
    name: 'yang'
  }
}).then((response: AxiosResponse) => {
  console.log(response.data);
  return response.data;
}).catch((error: any) => {
  console.log(error);
})