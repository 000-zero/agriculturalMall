import App from './App'
// #ifndef VUE3
import Vue from 'vue'
import uView from "uview-ui";
import store from '@/store';

let vuexStore = require("@/store/$u.mixin.js");
Vue.mixin(vuexStore);
Vue.use(uView);
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	store,
	...App
})

require('./config/request.js')(app)
//自定义工具
require('./config/utils.js')(app)

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