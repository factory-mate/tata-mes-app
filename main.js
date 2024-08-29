import App from './App.vue'
//引入Store(vue3/2)
import { store } from './store/index.js'
// #ifdef H5
// import VConsole from 'vconsole'
// const vConsole = new VConsole()
// #endif
// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
//注入方法vuex
// Vue.prototype.$store = store
App.mpType = 'app'
const app = new Vue({
  // store,
  ...App
})
app.$mount()
// #endif

//vue3.2
// #ifdef VUE3
import { createSSRApp } from 'vue'
import uviewPlus from 'uview-plus'
export function createApp() {
  const app = createSSRApp(App)
  app.use(uviewPlus)
  //挂载Store
  app.use(store)
  return {
    app
  }
}
// #endif
