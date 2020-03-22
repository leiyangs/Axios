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
