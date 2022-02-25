import Toast from './Toast.vue'

const obj = {}
obj.install = function (Vue) {
  // console.log("-----------",Vue)

  // Vue.extend(Toast)//创建组件构造器
  //document.body.appendChild(Toast.$el)//把Toast添加到body上
  // console.log(Toast.$el)//undefined

  // 1. 创建组件构造器
  const toastContrustor = Vue.extend(Toast)
  // 2. new的方式，根据组件构造器，可以创建出来一个组件对象
  const toast = new toastContrustor()
  // 3. 将组件对象，手动挂载到某一个元素中
  toast.$mount(document.createElement('div'))
  // 4. toast.$el对应的就是div
  document.body.appendChild(toast.$el)
  Vue.prototype.$toast = toast; //把Toast添加到vue实例上上
}
export default obj