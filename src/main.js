import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import VueAgile from 'vue-agile'
import VeeValidate from 'vee-validate';

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/css/main.css'
import i18n from './i18n'

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueAgile)
Vue.use(VeeValidate);

new Vue({
  router,
  i18n,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
