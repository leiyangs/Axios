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

// 错误处理
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
