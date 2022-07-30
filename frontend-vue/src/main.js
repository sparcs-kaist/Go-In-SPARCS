import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import router from './router'
import store from './store'

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$socket = null

new Vue({
  vuetify,
  render: h => h(App),
  router,
  store
}).$mount('#app')
