import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

//给$bus赋值一个Vue实例作为事件总线
Vue.prototype.$bus = new Vue()

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
