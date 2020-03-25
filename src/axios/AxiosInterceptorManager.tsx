// 拦截器管理器

// 此处Onfulfilled/Onrejected定义相当于Record原理(types文件中的demo PlainObject)
interface OnFulfilled<V> {  // 值是config 返回一个config或者Promise(config)
  (value: V): V | Promise<V>
}
interface OnRejected { // 值是error 返回一个error
  (error: any): any
}
export interface Interceptor<V> {
  onFulfilled?: OnFulfilled<V> // 成功的回调
  onRejected?: OnRejected // 失败的回调
}
// V可能是AxiosRequestConfig | Promise<AxiosRequestConfig>  也可能是AxiosResponse
export default class AxiosInterceptorManager<V> {
  public interceptors: Array<Interceptor<V> | null> = [];
  use(onFulfilled?: OnFulfilled<V>, onRejected?: OnRejected): number {
    this.interceptors.push({
      onFulfilled,
      onRejected
    })
    return this.interceptors.length - 1; // 返回拦截器索引 用于eject弹出(删除拦截器)
  }
  eject(id: number) {
    if(this.interceptors[id]) {
      this.interceptors[id] = null;
    }
  }
}