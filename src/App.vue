<template>
  <v-app>
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
    </v-app-bar>

    <v-card color="blue lighten-4" class="mt-6  " flat height="" tile>
      <v-toolbar flat tile dens  >
        <v-toolbar-title style="font-size:17px; font-weight:400;">
          {{ data[0]["site_name"] }}
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn text> Login <v-icon>mdi-login</v-icon> </v-btn>
      </v-toolbar>
    </v-card>
    
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import data from "./assets/data/global_data";
export default {
  name: "App",

  components: {},

  data: () => ({
    data: [],
  }),
  beforeMount() {
    this.data.push(data);
  },
  mounted() {
    // console.log(data)
  },
};
</script>
