import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import '@mdi/font/css/materialdesignicons.css';
import "./vee-validate";
import CryptoJS from "crypto-js"

Vue.config.productionTip = false
Vue.config.devtools = true

Vue.use(CryptoJS)

new Vue({
  router,
  store,
  vuetify,
  CryptoJS,
  render: h => h(App)
}).$mount('#app')