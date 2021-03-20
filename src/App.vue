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

    <v-card color="blue lighten-4" class="mt-6" flat height=""   tile>
       <v-toolbar flat tile dense>
      <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->

      <v-toolbar-title style="font-size:17px; font-weight:400;"> {{data[0]['site_name']}}  </v-toolbar-title>

      <v-spacer></v-spacer>
 

      <v-btn  text >
        Login <v-icon>mdi-login</v-icon>
      </v-btn>
      
    </v-toolbar>
    </v-card>

    <!-- <v-row>
      <v-col cols="12" sm="12" md="12" class="">
        <v-card color="grey lighten-4" flat height="0px" tile>
          <v-toolbar color="red" dark>
            <v-app-bar-nav-icon></v-app-bar-nav-icon>
          </v-toolbar>
        </v-card>
      </v-col>
    </v-row> -->
    <!-- <v-row>
      <v-col
        v-for="(bar, i) in bars"
        :key="i"
        cols="12"
        sm="12"
        md="6"
        class="my-4"
      >
        <v-card color="grey lighten-4" flat height="200px">
          <v-toolbar :color="bar.class" :dark="bar.dark">
            <v-app-bar-nav-icon></v-app-bar-nav-icon>
            <v-toolbar-title>Title</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>mdi-magnify</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>mdi-heart</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </v-toolbar>
        </v-card>
      </v-col> -->
    <!-- </v-row> -->
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
    // console.log(data.colors.light_green)
  },
};
</script>
