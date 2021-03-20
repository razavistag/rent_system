import "material-design-icons-iconfont/dist/material-design-icons.css"; // css-loader
import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: "md",
  },
});
