import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import io from 'socket.io-client'
const socket = io(`http://${process.env.VUE_APP_BACK_HOST_PORT}`);

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$socket = socket

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
