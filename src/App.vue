<template>
  <v-app>
    <v-app-bar app color="dark" dark height="50">
      <div class="d-flex align-center">
        <v-btn to="/" text class="text-decoration-none">
          <span class="mr-2">Home</span>
          <v-icon small>mdi-home</v-icon>
        </v-btn>
        <!-- <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        /> -->
      </div>

      <v-spacer></v-spacer>

      <v-btn to="/login" text class="text-decoration-none">
        <span class="mr-2">Login</span>
        <v-icon small>mdi-login</v-icon>
      </v-btn>

      <v-btn to="/firebaseOTP" text class="text-decoration-none">
        <span class="mr-2">OTP Message</span>
        <v-icon small>mdi-message</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld'

export default {
  name: "App",

  components: {
    // HelloWorld
  },

  data: () => ({
    //
  })
};
</script>
