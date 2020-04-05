import axios, { AxiosResponse, AxiosRequestConfig } from './axios';

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
  config.headers && (config.headers.name += '1')
   return config
 })
 let request = axios.interceptors.request.use((config: AxiosRequestConfig): AxiosRequestConfig => {
  config.headers && (config.headers.name += '2')
  return config
 })
//  返回config或者Promise返回的config
 axios.interceptors.request.use((config: AxiosRequestConfig): AxiosRequestConfig | Promise<AxiosRequestConfig> => {
  //  成功的promise，会等promise执行完在向后执行
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.timeEnd('cost')
      config.headers && (config.headers.name += '3')
      resolve(config)
    },3000)
  }) 
  // 失败的promise会直接跳过，请求失败
  // return Promise.reject('失败的promise')
  // return config
 }, (error: any):any  => error)
 axios.interceptors.request.eject(request);

 let response = axios.interceptors.response.use((response: AxiosResponse): AxiosResponse => {
  response.data.name += '1'
   return response;
 })
 axios.interceptors.response.use((response: AxiosResponse): AxiosResponse => {
  response.data.name += '2'
  return response;
 })
 axios.interceptors.response.use((response: AxiosResponse): AxiosResponse => {
  response.data.name += '3'
  return response;
 })
 axios.interceptors.response.eject(response);

 let user1: User = {
   name: '杨磊',
   age: '18'
 }
axios({
  method: 'post',
  url: baseURL + 'post',
  data: user1,
  // headers: {
  //   name: 'yang'
  // }
}).then((response: AxiosResponse<User>) => {
  console.log(response.data,'data');
  return response.data;
}).catch((error: any) => {
  console.log(error);
})