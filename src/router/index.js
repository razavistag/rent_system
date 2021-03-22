import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Property from "../views/Property.vue";

import Dashboard from "../views/Admin/Dashboard.vue";
import Manage_Properties from "../views/Admin/Properties.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem("Key")) {
        console.log("Auth True");
        return next({
          path: "/dashboard",
          name: "Dashboard",
          component: Dashboard,
        });
      } else {
        console.log("Auth Fail");
        next();
      }
    },
  },
  {
    path: "/property",
    name: "Property",
    component: Property,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem("Key") != "access_token") {
        router.push({ path: "login" });
      }
      next();
    },
  },
  {
    path: "/manage_properties",
    name: "Manage_Properties",
    component: Manage_Properties,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem("Key") != "access_token") {
        router.push({ path: "login" });
      }
      next();
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
