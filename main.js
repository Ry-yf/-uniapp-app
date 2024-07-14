import App from './App'
import uView from "./uni_modules/uview-ui"
Vue.use(uView);

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
import store from './store/index.js'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	store,
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif