<template>
  <div class="text-xs-center mt-5">
    <h1 class="display-1 mb-5">Welcome to {{ title }}!</h1>
    <img
      width="200"
      alt="Azkaban Logo"
      src="data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='200' height='200' version='1.1' viewBox='0 0 800.00001 800.00001' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cmask id='a' maskUnits='userSpaceOnUse'%3E%3Ccircle cx='400' cy='400' r='400' color='%23000000' color-rendering='auto' fill='%23fff' image-rendering='auto' shape-rendering='auto' solid-color='%23000000' style='isolation:auto;mix-blend-mode:normal'/%3E%3C/mask%3E%3ClinearGradient id='b' x1='291.14' x2='27.94' y1='440.49' y2='666.76' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-opacity='.42' offset='0'/%3E%3Cstop stop-opacity='0' offset='1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg transform='translate(0 -252.36)'%3E%3Ccircle cx='400' cy='652.36' r='400' color='%23000000' color-rendering='auto' fill='%231c8adb' image-rendering='auto' shape-rendering='auto' solid-color='%23000000' style='isolation:auto;mix-blend-mode:normal'/%3E%3Cpath transform='translate(0 252.36)' d='m191.35 226.75-191.13 191.13c8.3675 198.71 112.21 310.9 272.72 371.72 72.418-72.1 144.67-144.35 216.64-217.35z' fill='url(%23b)' fill-rule='evenodd' mask='url(%23a)'/%3E%3Cpath d='m400 418.03c-68.55 33.477-145.63 60.635-208.65 61.081 38.706 239.37 60.915 331.87 208.65 407.59 147.74-75.717 169.95-168.22 208.65-407.59-63.019-0.44559-140.1-27.604-208.65-61.081z' fill='%23fff' fill-rule='evenodd'/%3E%3Cpath transform='translate(0 252.36)' d='m400 165.66v234.34h175.93c11.796-47.668 21.583-104.35 32.725-173.26-63.019-0.44559-140.1-27.601-208.65-61.078zm0 234.34h-175.93c29.182 117.93 70.72 180.41 175.93 234.33v-234.33z' fill-opacity='.13473' fill-rule='evenodd'/%3E%3C/g%3E%3C/svg%3E%0A"
    >
    <v-layout row justify-center mt-5>
      <v-flex xs8 sm6 md4 lg4 xl2>
        <v-layout v-if="signInState === SIGN_IN_STATE_READY" row wrap>
          <v-flex xs12>
            <v-form>
              <v-text-field v-model="email" label="Email Address" prepend-icon="email"></v-text-field>
              <v-text-field v-model="password" label="Password" prepend-icon="lock" type="password"></v-text-field>
              <v-checkbox v-model="rememberMe" label="Remember Me" color="primary"></v-checkbox>
            </v-form>
          </v-flex>
          <v-flex xs12>
            <a href="#reset">Forgot your password?</a> (Use user:pass)
          </v-flex>
          <v-flex xs12 mt-4>
            <v-btn color="primary" @click="signIn">
              <v-icon left>security</v-icon>Sign In
            </v-btn>
          </v-flex>
        </v-layout>
        <v-layout v-if="signInState === SIGN_IN_STATE_IN_PROGRESS" row wrap>
          <v-flex xs12>
            <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
          </v-flex>
          <v-flex xs12 mt-3>
            <div class="title">You are being signed in.</div>
          </v-flex>
          <v-flex xs12 mt-1>
            <div class="subheading">Please wait...</div>
          </v-flex>
        </v-layout>
        <v-layout v-if="signInState === SIGN_IN_STATE_SUCCESS" row wrap>
          <v-flex xs12>
            <v-icon color="green" x-large>check_circle_outline</v-icon>
          </v-flex>
          <v-flex xs12 mt-3>
            <div class="title">You have signed in successfully.</div>
          </v-flex>
          <v-flex xs12 mt-1>
            <div class="subheading">You're on the way to managing your passwords.</div>
          </v-flex>
        </v-layout>
        <v-layout v-if="signInState === SIGN_IN_STATE_ERROR" row wrap>
          <v-flex xs12>
            <v-icon color="red" x-large>error</v-icon>
          </v-flex>
          <v-flex xs12 mt-3>
            <div class="title">{{error}}</div>
          </v-flex>
          <v-flex xs12 mt-1>
            <div class="subheading">
              Please try again or
              <a href="#reset">reset your password</a>.
            </div>
          </v-flex>
          <v-flex xs12 mt-3>
            <v-btn @click="signInState = SIGN_IN_STATE_READY" secondary>Retry</v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { AzkabanService } from '../services/AzkabanService';

const SIGN_IN_STATE_READY = 'READY';
const SIGN_IN_STATE_IN_PROGRESS = 'IN_PROGRESS';
const SIGN_IN_STATE_ERROR = 'ERROR';
const SIGN_IN_STATE_SUCCESS = 'SUCCESS';

export default {
  components: {},
  data() {
    return {
      title: 'Azkaban - Password Manager',
      email: '',
      password: '',
      rememberMe: '',
      signInState: SIGN_IN_STATE_READY,
      error: '',
      SIGN_IN_STATE_READY: SIGN_IN_STATE_READY,
      SIGN_IN_STATE_IN_PROGRESS: SIGN_IN_STATE_IN_PROGRESS,
      SIGN_IN_STATE_ERROR: SIGN_IN_STATE_ERROR,
      SIGN_IN_STATE_SUCCESS: SIGN_IN_STATE_SUCCESS
    };
  },
  methods: {
    signIn() {
      this.signInState = SIGN_IN_STATE_IN_PROGRESS;

      AzkabanService.signIn(this.email, this.password)
        .then(() => {
          this.signInState = SIGN_IN_STATE_SUCCESS;
          setTimeout(() => {
            this.$router.push('/passwords');
          }, 750);
        })
        .catch(error => {
          this.error = error;
          this.signInState = SIGN_IN_STATE_ERROR;
        });
    }
  }
};
</script>
