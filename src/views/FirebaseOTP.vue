<template>
  <div id="FirebaseOTP">
    <v-container>
      <v-row>
        <v-col>
          <h1>FirebaseOTP</h1>
        </v-col>
      </v-row>
      <v-row>
        <v-col md="3" sm="3">
          <v-text-field
            outlined
            v-model="mobileNumber"
            label="Register your number"
            placeholder="+94777123456"
            dense
          >
          </v-text-field>
        </v-col>

        <v-col md="3" sm="3">
          <v-btn color="primary" class="mt-1" @click="sendOTP">SEND OTP</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col md="3" sm="3">
          <div id="recaptcha-container"></div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "FirebaseOTP",
  data() {
    return {
      mobileNumber: null
    };
  },
  mounted() {
    this.render();
  },
  methods: {
    render() {
      window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
        "recaptcha-container"
      );
      recaptchaVerifier.render();
    },
    sendOTP() {
      console.log("pressed send OTP");
      firebase
        .auth()
        .signInWithPhoneNumber(this.mobileNumber, window.recaptchaVerifier)
        .then(function(confirmationResult) {
          window.confirmationResult = confirmationResult;
          let coderesult = confirmationResult;
          console.log(coderesult);
          console.log("Message sent");
        })
        .catch(function(error) {
          alert(error.message);
        });
    }
  }
};
</script>

<style></style>
