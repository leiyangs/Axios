export type Methods = 'get' | 'GET' | 'post' | 'POST' | 'delete' | 'DELETE' | 'options' | 'OPTIONS' | 'put' | 'put';

// Record 相当于下面的类型，属性名是string 值any
export interface PlainObject {
  [name: string]: any
}
export interface AxiosRequestConfig {
  url: string
  method: Methods
  // params: Record<string, any>
  params: any
}

// 用来修饰Axios.prototype.request这个方法
// Promise的泛型T代表此promise变成成功态后resolve的值，会resolve(Value: T)
export interface AxiosInstance {
  <T = any>(config: AxiosRequestConfig): Promise<T> // 通过接口定义函数
}

// 返回数据的类型
// 泛型T代表响应体的类型
export interface AxiosResponse<T = any> {
  data: T // 响应体
  status: number // 返回的状态
  statusText: string // 状态类型
  headers: Record<string, any>
  config: AxiosRequestConfig
  request?: XMLHttpRequest
}