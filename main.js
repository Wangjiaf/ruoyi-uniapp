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

const app = new Vue({
  ...App
})

app.$mount()
