<template>
  <div id="Dashboard">
    <AdminLayout />
    <v-row class="mt-10 d-flex justify-center">
      <v-col
        md="2"
        sm="3"
        cols="3"
        class="bg-danger ma-2 rounded pointer "
        @click="properties()"
      >
        <v-row class="">
          <v-col
            md="3"
            sm="3"
            cols="12"
            class="  text-white d-flex flex-column justify-center align-center"
          >
            <v-icon>mdi-shield-home</v-icon>
          </v-col>

          <v-col
            md="9"
            sm="9"
            cols="12"
            class="red lighten-3 text-light d-flex align-center justify-center flex-column"
          >
            <p class="pa-0 m-0 text-center">PROPERTIES</p>
            <h6 class="">00</h6>
          </v-col>
        </v-row>
      </v-col>

      <v-col
        md="2"
        sm="3"
        cols="3"
        class="bg-info ma-2 rounded pointer"
        @click="customers()"
      >
        <v-row>
          <v-col
            md="3"
            sm="3"
            cols="12"
            class=" text-white d-flex flex-column justify-center align-center"
          >
            <v-icon>mdi-badge-account-outline</v-icon>
          </v-col>

          <v-col
            md="9"
            sm="9"
            cols="12"
            class="cyan lighten-3 text-light d-flex align-center justify-center flex-column    "
          >
            <p class="pa-0 m-0 text-center">CUSTOMERS</p>
            <h6 class="">00</h6>
          </v-col>
        </v-row>
      </v-col>

      <v-col
        md="2"
        sm="3"
        cols="3"
        class="bg-success ma-2 rounded pointer"
        @click="availableSlots()"
      >
        <v-row>
          <v-col
            md="3"
            sm="3"
            cols="12"
            class=" text-white d-flex flex-column justify-center align-center"
          >
            <v-icon>mdi-dns-outline</v-icon>
          </v-col>

          <v-col
            md="9"
            sm="9"
            cols="12"
            class="light-green lighten-2 text-light d-flex align-center justify-center flex-column    "
          >
            <p class="pa-0 m-0 text-center">Available Slots</p>
            <h6 class="">00</h6>
          </v-col>
        </v-row>
      </v-col>

      <v-col
        md="2"
        sm="3"
        cols="3"
        class="bg-info ma-2 rounded pointer"
        @click="rentedSlots()"
      >
        <v-row>
          <v-col
            md="3"
            sm="3"
            cols="12"
            class=" text-white d-flex flex-column justify-center align-center"
          >
            <v-icon>mdi-hot-tub</v-icon>
          </v-col>

          <v-col
            md="9"
            sm="9"
            cols="12"
            class="blue lighten-3 text-light d-flex align-center justify-center flex-column    "
          >
            <p class="pa-0 m-0 text-center">Rented Slots</p>
            <h6 class="">00</h6>
          </v-col>
        </v-row>
      </v-col>

      <v-col
        md="2"
        sm="3"
        cols="3"
        class="brown ma-2 rounded pointer"
        @click="preOrders()"
      >
        <v-row>
          <v-col
            md="3"
            sm="3"
            cols="12"
            class=" text-white d-flex flex-column justify-center align-center"
          >
            <v-icon>mdi-pound-box-outline</v-icon>
          </v-col>

          <v-col
            md="9"
            sm="9"
            cols="12"
            class="brown lighten-3 text-light d-flex align-center justify-center flex-column    "
          >
            <p class="pa-0 m-0 text-center">Pre Orders</p>
            <h6 class="">00</h6>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import AdminLayout from "../../components/AdminLayout";
export default {
  name: "Dashboard",
  components: {
    AdminLayout,
  },
  methods: {
    properties() {
      console.log("properties");
    },
    customers() {
      console.log("customers");
    },
    availableSlots() {
      console.log("availableSlots");
    },
    rentedSlots() {
      console.log("rentedSlots");
    },
    preOrders() {
      console.log("preOrders");
    },
  },
};
</script>

<style scopped>
.pointer {
  cursor: pointer;
}
</style>
