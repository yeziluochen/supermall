import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

import toast from 'components/common/toast'

Vue.config.productionTip = false


Vue.prototype.$bus = new Vue()//给$bus赋值一个Vue实例作为事件总线

Vue.use(toast)//安装toast插件

FastClick.attach(document.body)//解决移动端300ms延迟问题

//使用懒加载的插件
Vue.use(VueLazyLoad, {
  loading: require('./assets/img/common/placeholder.png')
})
new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')








// class Animal {
//   run() {

//   }
// }
// //类的继承，对象不可继承
// //下边两个可继承类 Animal中的run
// class Person extends Animal {
//   // run() {

//   // }
// }
// class Dog extends Animal {
//   // run() {

//   // }
// }