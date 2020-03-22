// 如果引用的JS包没有官方类型声明文件也没有第三方类型声明文件，自己也不想写，就声明了，但是声明类型没有写，这样可以不报错而已
declare module 'parse-headers'; // parse-headers没有申明文件包，自己写，需要配置tsconfig