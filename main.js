import Vue from 'vue'
import App from './App'
import store from './store' // store
import plugins from './plugins' // plugins
import './permission' // permission
Vue.use(plugins)

Vue.config.productionTip = false
Vue.prototype.$store = store

App.mpType = 'app'

/** 引入uView */
import uView from 'node_modules/uview-ui';
Vue.use(uView);

/** 引入扫码 */
import scan from '@/utils/scan.js';
Vue.prototype.$scan = scan;

/** 引入识别NFC */
import nfc from '@/utils/nfc.js';
Vue.prototype.$nfc = nfc;

const app = new Vue({
  ...App
})

app.$mount()
