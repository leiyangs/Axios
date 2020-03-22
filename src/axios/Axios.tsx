
import { AxiosRequestConfig, AxiosResponse } from './types';
import qs from 'qs';
import parseHeaders from 'parse-headers';
export default class Axios {
  // T用来限制响应对象response里的data的类型
  request<T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.dispatchRequest(config);
  }
  dispatchRequest<T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    // 返回promise建立请求
    return new Promise<AxiosResponse<T>>((resolve, reject) => {
      let { method, url, params, headers, data, timeout } = config;
      let request = new XMLHttpRequest();
      // 利用qs模块把传入的参数转为name='yang'的格式
      if(params) {
        params = qs.stringify(params);
        // 断言url和method一定有值
        url += (url!.indexOf('?') > 0 ? '&' : '?') + params;
      }
      request.open(method!, url!, true);
      request.responseType = 'json';
      request.onreadystatechange = function () { // 指定一个状态变更函数
        // readyState 有1 2 3 4 四个状态 4 表示完成
        if(request.readyState === 4 && request.status !== 0) { // 超时的时候请求的状态码是0
          if(request.status >= 200 && request.status < 300) {
            // 如果成功，返回axios响应体
            let response:AxiosResponse = {
              data: request.response ? request.response : request.responseText,
              status: request.status,
              statusText: request.responseType,
              // request.getAllResponseHeaders() 获取到的是content-type=xx; content-length=42=>content-type:xx, content-length:42 利用parse-headers来转为json
              headers: parseHeaders(request.getAllResponseHeaders()),
              config,
              request
            }
            resolve(response);
          }else { // 状态码错误
            reject(`Error: Request failed with status code ${request.status}`)
          }
        }
      }
      if(headers) {
        for (const key in headers) {
          if (headers.hasOwnProperty(key)) {
            request.setRequestHeader(key, headers[key])
          }
        }
      }
      let body: string | null = null;
      if(data) {
        body = JSON.stringify(data);
      }
      // 如果请求没发出去
      request.onerror = function () {
        reject('net::ERR_INTERNET_DISCONNECTED')
      }
      // 如果传入了timeout且超时
      if(timeout) {
        request.timeout = timeout; // 设置超时时间
        request.ontimeout = function () {
          reject(`Error: timeout of ${timeout}ms exceeded`)
        }
      }
      request.send(body);
    })
  }
}