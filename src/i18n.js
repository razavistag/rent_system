import VueI18n from "vue-i18n";
import Vue from "vue";
Vue.use(VueI18n);
export default new VueI18n({
  locale: localStorage.getItem("Lang") || "English",
  messages: {
    English: {
      title: {
        one: "TRENDING",
        two: "PROPERTIES",
      },
      calories: "calories",
    },
    Belarusian: {
      title: {
        one: "Тэндэнцыйныя ",
        two: "ўласцівасці",
      },
      calories: "ўласцівасці",
      fat: "ўлаі",

    },
  },
});
