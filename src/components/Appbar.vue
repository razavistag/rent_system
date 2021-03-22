<template>
  <div id="Appbar">
    <v-app-bar
      app
      dark
      flat
      dense
      :color="data[0]['colors'].light_green"
      height="25px"
    >
      <span class="app-header-caption-text ml-3">
        <v-icon small>mdi-clock</v-icon>
        Mon - Fri 8.00 - 18.00
      </span>
      <v-spacer></v-spacer>
      <span class="app-header-caption-text mr-3">
        <v-icon small>mdi-phone</v-icon>
        Tel No. (+94) 777-123-456
      </span>

      <v-menu top :close-on-click="closeOnClick">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="white" dark v-bind="attrs" v-on="on" icon>
            <v-icon small>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item v-for="(item, index) in Languages" :key="index">
            <v-btn text @click="languageChange(item.lan)">{{ item.lan }}</v-btn>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-card color="blue lighten-4" class="mt-1 mb-6  " flat height="" tile>
      <v-toolbar flat tile dens>
        <v-toolbar-title style="font-size:17px; font-weight:400;">
          <v-btn text to="/" class="text-decoration-none">
            {{ data[0]["site_name"] }}</v-btn
          >
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn text to="login" class="text-decoration-none">
          Login <v-icon>mdi-login</v-icon>
        </v-btn>
      </v-toolbar>
    </v-card>
  </div>
</template>

<script>
import data from "../assets/data/global_data";
export default {
  name: "Appbar",

  components: {},

  data: () => ({
    data: [],
    Languages: [{ lan: "English" }, { lan: "Belarusian" }],
    closeOnClick: false,
  }),
  beforeMount() {
    this.data.push(data);
  },
  mounted() {
    // console.log(data)
  },
  methods: {
    languageChange(e) {
      console.log(e);
      localStorage.setItem("Lang", e);
      window.location.reload();
    },
  },
};
</script>
