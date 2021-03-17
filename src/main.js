import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
// import * as firebase from "firebase";
import firebase from "firebase/app";

import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

// Import Bootstrap an BootstrapVue CSS files (order is important)
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

Vue.config.productionTip = false;

var firebaseConfig = {
  apiKey: "AIzaSyA35nBB3l_57SEWZr9txx9YOdhHIKj1_K8",
  authDomain: "testotp-5d04e.firebaseapp.com",
  projectId: "testotp-5d04e",
  storageBucket: "testotp-5d04e.appspot.com",
  messagingSenderId: "416518779547",
  appId: "1:416518779547:web:b3bd2846dfb1206c9bcc3e",
  measurementId: "G-6PEFXSDQRM"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
