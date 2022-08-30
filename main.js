import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import uView from '@/uni_modules/uview-ui'
Vue.config.productionTip = false
Vue.use(uView)
import $req from './common/request.js'
import $pri from './common/privateInfo.js'
import $pub from '@/uni_modules/pubsub-js/src/pubsub.js'
Vue.prototype.$req = $req
Vue.prototype.$pri = $pri
Vue.prototype.$pub = $pub

import { OpenIMSDK } from '@/uni_modules/open-im-sdk'
const openIM = new OpenIMSDK()
export default openIM
Vue.prototype.$openIM = openIM

App.mpType = 'app'
const app = new Vue({
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