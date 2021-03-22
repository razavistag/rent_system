<template>
  <div id="AdminLayout">
    <v-app-bar dark app z-index="100" :color="navBarColor" height="50">
      <!-- menu button -->
      <v-btn small icon @click="openDrawer"> <v-icon>mdi-menu</v-icon> </v-btn>
      {{ data[0]["site_name"].substring(0, 18) + "..." }}
      <v-spacer></v-spacer>

      <!-- full screen -->
      <v-btn
        color="white"
        dark
        text
        icon
        @click="fullscreenChange"
        v-if="!fullscreen"
      >
        <v-icon>mdi-arrow-expand-all</v-icon>
      </v-btn>
      <v-btn icon color="white" dark text @click="exitFullscreenChange" v-else>
        <v-icon>mdi-arrow-expand</v-icon>
      </v-btn>

      <!-- Calculator -->
      <div class="text-center ">
        <v-menu
          v-model="calculator"
          :close-on-content-click="false"
          :nudge-width="300"
          offset-x
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="white" dark text v-bind="attrs" v-on="on" icon>
              <v-icon>mdi-calculator</v-icon>
            </v-btn>
          </template>

          <v-card>
            <v-list color="#2f2f31">
              <v-list-item>
                <v-list-item-content>
                  <!-- calculator Component-->
                  <cal />
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </v-menu>
      </div>

      <!-- Profile Model -->
      <div class="text-center">
        <v-menu
          v-model="menu"
          :close-on-content-click="false"
          :nudge-width="200"
          offset-x
        >
          <template v-slot:activator="{ on, attrs }">
            <v-avatar
              color="white"
              dark
              v-bind="attrs"
              v-on="on"
              text
              size="30"
              class="ma-1"
            >
              <v-img
                contain
                src="https://www.rentwell.ca/storage/app/public/upload/settings/FOHjzDyLgxN8F2IKQESPucIseho9JaIbaxSj88xS.png"
                width="100%"
              />
            </v-avatar>

            <v-btn
              color="red"
              dark
              class="text-decoration-none"
              icon
              text
              @click="LogoutConfirmatioDialog = true"
            >
              <v-icon>mdi-power-standby</v-icon>
            </v-btn>
          </template>

          <v-card>
            <v-list>
              <v-list-item>
                <v-list-item-avatar>
                  <img
                    src="https://www.rentwell.ca/storage/app/public/upload/settings/FOHjzDyLgxN8F2IKQESPucIseho9JaIbaxSj88xS.png"
                  />
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>VistaG</v-list-item-title>
                  <v-list-item-subtitle
                    >VistaG Consultant (PVT) LTD</v-list-item-subtitle
                  >
                </v-list-item-content>

                <v-list-item-action>
                  <v-btn
                    :class="online ? 'green--text' : 'red--text'"
                    icon
                    @click="online = !online"
                  >
                    <v-icon>mdi-progress-check</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-list>

            <v-divider></v-divider>

            <v-list>
              <v-list-item>
                <v-list-item-action>
                  <v-icon>mdi-account-settings</v-icon>
                </v-list-item-action>
                <v-list-item-title>
                  <v-btn text>
                    Profile Config
                  </v-btn>
                </v-list-item-title>
              </v-list-item>

              <v-list-item>
                <v-list-item-action>
                  <v-icon>mdi-microsoft-access</v-icon>
                </v-list-item-action>
                <v-list-item-title>
                  <v-btn text>
                    View Audits
                  </v-btn>
                </v-list-item-title>
              </v-list-item>

              <v-list-item>
                <v-list-item-action>
                  <v-icon>mdi-logout</v-icon>
                </v-list-item-action>
                <v-list-item-title>
                  <v-btn text>
                    LOGOUT
                  </v-btn>
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card>
        </v-menu>
      </div>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      app
      class=""
      dark
      :color="sideBarColor"
      :mini-variant.sync="drawerMini"
      :expand-on-hover="dawerHover"
    >
      <v-list dense nav class="pa-0">
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          :to="item.to"
          class="text-decoration-none"
        >
          <v-list-item-icon>
            <v-icon class="whie--text">{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="text-light">
              {{ item.title }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Logout confirmation -->
    <v-row justify="center">
      <v-dialog v-model="LogoutConfirmatioDialog" persistent max-width="350">
        <v-card>
          <v-card-title class="headline blue-grey lighten-2 white--text">
            LOGOUT CONFIMRATION
          </v-card-title>
          <v-card-text class="pa-5">
            <p>Are you sure do you want to logout?</p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="green darken-1"
              text
              @click="LogoutConfirmatioDialog = false"
            >
              Stay In
            </v-btn>
            <v-btn color="red darken-1" text @click="Logout">
              Logout
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
import data from "../assets/data/global_data";
import cal from "../components/Calculator";
export default {
  name: "AdminLayout",
  components: {
    cal,
  },
  beforeMount() {
    this.data.push(data);
  },
  data() {
    return {
      data: [],
      LogoutConfirmatioDialog: false,
      online: true,
      menu: false,
      calculator: false,
      drawerMini: false,
      dawerHover: true,
      drawer: true,
      navBarColor: "#004D40",
      sideBarColor: "red",
      items: [
        {
          title: "DASHBOARD",
          icon: "mdi-home",
          to: "/dashboard",
        },
        {
          title: "PROPERTIES",
          icon: "mdi-image-filter-center-focus-strong",
          to: "/manage_properties",
        },
        {
          title: "SETTINGS",
          icon: "mdi-clipboard-list",
          to: "/settings",
        },
        { title: "LOGOUT", icon: "mdi-logout", to: "/" },
      ],
      right: null,
      fullscreen: false,
    };
  },
  methods: {
    fullscreenChange() {
      document.documentElement
        .requestFullscreen()
        .then(() => {
          this.fullscreen = true;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    exitFullscreenChange() {
      document
        .exitFullscreen()
        .then(() => {
          this.fullscreen = false;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    openDrawer() {
      this.drawer = !this.drawer;
      this.dawerHover = !this.dawerHover;
    },
    Logout() {
      localStorage.removeItem("Key");
      this.$router.push({ path: "/" });
    },
  },
};
</script>

<style></style>
