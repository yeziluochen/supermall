import axios from 'axios'

export function request(config){
  //1.创建axios的实例
  const instance = axios.create({
    baseURL:'http://123.207.32.32:8000',
    timeout:5000
  })

  // 2. axios的拦截器 全局拦截axios.interceptors（axios默认为全局）
  // 2.1请求拦截的作用
  instance.interceptors.request.use(config =>{
    // console.log(config);

    // 01. 比如config中的一些信息不符合服务器的要求

    // 02. 比如每次发送网络请求时，都希望在界面中显示一个请求的图标（比如加载中）
    
    // 03. 某些网络请求（比如登录（token）），必须携带某些特殊信息（例如登录状态当发现请求的时候需要登录而未登录的时候就会拦截）

    return config
  },err =>{
    // console.log(err)
  })

  // 2.2响应拦截
  instance.interceptors.response.use(res =>{
    console.log(res);
    return res.data//data才是服务器返回的有用数据
  },err =>{
    console.log(err)
  })

  //3. 发送真正的网络请求
  return instance(config)

}
