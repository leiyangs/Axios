import Axios from './Axios';
import { AxiosInstance } from './types';
// 可以创建一个axios实例 axios其实就是一个函数
// 定义一个类的时候（Axios），其实是定义了：一个类的原型（Axios.prototype），一个类的实例。所以context的类型是Axios
function createInstance(): AxiosInstance {
  let context: Axios<any> = new Axios(); // this指针上下文
  let instance = Axios.prototype.request.bind(context); // 让request里的方法 this永远指向context也就是new Axios()
  instance = Object.assign(instance, Axios.prototype, context); // 把类的实例和类的原型上的方法都拷贝到instance上
  return instance as AxiosInstance;
}

let axios = createInstance();
export default axios;
export * from './types'; // 导出类型供axios/index使用
