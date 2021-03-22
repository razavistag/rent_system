<template>
  <v-app>
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

  data: () => ({}),
  beforeMount() {},
  mounted() {},
  methods: {},
};
</script>
