<template>
  <div id="Login">
    <v-row align-content="center" class="h-100">
      <v-col
        md="12"
        sm="12"
        cols="12"
        class="d-flex justify-content-center h-100 mx-auto"
      >
        <v-card width="400" height="370">
          <v-card-title> <h3>Sign In</h3> </v-card-title>
          <v-card-text>
            <ValidationObserver ref="form">
              <v-row>
                <v-col md="12" cols="12" class="  pa-0 mt-4 pl-4 pr-8">
                  <ValidationProvider
                    rules="required|email"
                    name="Email"
                    v-slot="{ errors }"
                  >
                    <v-text-field
                      outlined
                      dense
                      v-model="email"
                      hide-details=""
                      :label="errors[0] ? errors[0] : 'Email'"
                      :error-messages="errors"
                    >
                      <template v-slot:prepend>
                        <v-icon>mdi-account</v-icon>
                      </template>
                    </v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col md="12" cols="12" class="  pa-0 mt-4 pl-4  pr-8">
                  <ValidationProvider
                    rules="required|min:4"
                    name="Password"
                    v-slot="{ errors }"
                  >
                    <v-text-field
                      outlined
                      dense
                      v-model="password"
                      :error-messages="errors"
                      :label="errors[0] ? errors[0] : 'Password'"
                      hide-details=""
                    >
                      <template v-slot:prepend>
                        <v-icon>mdi-form-textbox-password</v-icon>
                      </template>
                    </v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col md="12" cols="12" class="pa-0  ma-0  mt-3 pl-12 ">
                  <b-form-checkbox>
                    Remember Me
                  </b-form-checkbox>
                </v-col>
                <v-col
                  md="12"
                  cols="12"
                  class="  pt-0 pb-0  ma-0  mt-3 pl-8 pr-8 "
                >
                  <v-btn block color="success" @click="Login">Login</v-btn>
                </v-col>
              </v-row>
            </ValidationObserver>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <Footer />
  </div>
</template>

<script>
import Footer from "../components/Footer";
import { ValidationObserver, ValidationProvider } from "vee-validate";

export default {
  name: "Login",
  components: {
    Footer,
    ValidationObserver,
    ValidationProvider,
  },
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    Login() {
      this.$refs.form.validate().then((success) => {
        if (!success) {
          return;
        }

        console.log("sucess");

        this.email = "";
        this.password = "";

        this.$nextTick(() => {
          this.$refs.form.reset();
          console.log("cleared");
        });
      });
    },
  },
};
</script>

<style scoped>
#Login {
  background-image: url("https://cdn.homesthetics.net/wp-content/uploads/2014/01/8320-Grand-View-Drive-Modern-Mansion-on-Sunset-Strip-Offering-Expansive-Views-over-Los-Angeles-homesthetics-5.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  height: 100%;
  font-family: "Numans", sans-serif;
  padding-top: 100px;
}
</style>
