<template>
  <v-parallax
    height="700"
    src="https://cdn.pixabay.com/photo/2018/07/14/15/27/cafe-3537801_1280.jpg"
  >
    <v-container fill-height style="max-width:450px">
      <v-layout align-center row wrap>
        <v-flex xs12>
          <v-card>
            <v-toolbar flat>
              <v-toolbar-title>Sign in</v-toolbar-title>
            </v-toolbar>

            <!-- 이메일 입력란 -->
            <v-window v-model="step">
              <v-window-item :value="1">
                <v-card-text>
                  <v-text-field v-model="email" label="Please enter your Email" :rules="[rules.email]"></v-text-field>
                  <span class="caption grey--text text--darken-1">
                    This is the email you will use to login to your Vuetify
                    account
                  </span>
                  <v-btn block :disabled="[!rules.email]">Send Confirm Code</v-btn>
                </v-card-text>
              </v-window-item>

              <!-- 확인코드 입력란 -->
              <v-window-item :value="2">
                <v-card-text>
                  <v-text-field
                    label="Please enter your Confirm Code"
                  ></v-text-field>
                  <span class="caption grey--text text--darken-1">
                    This is the email you will use to login to your Vuetify
                    account
                  </span>
                  <v-btn block>Confirm Email</v-btn>
                </v-card-text>
              </v-window-item>

              <!-- 패스워드 입력 및 확인란 -->
              <v-window-item :value="3">
                <v-card-text>
                  <v-text-field label="Password" type="password"></v-text-field>
                  <v-text-field
                    label="Confirm Password"
                    type="password"
                  ></v-text-field>
                  <span class="caption grey--text text--darken-1">
                    Please enter a password for your account
                  </span>
                </v-card-text>
                <div class="pa-2">
                <v-checkbox
                  v-model="agreement"
                  :rules="[rules.required]"
                  color="deep-purple"
                >
                  <template v-slot:label>
                    위치정보 수집에 동의합니다 *
                  </template>
                </v-checkbox>
                </div>
              </v-window-item>

              <!-- 회원가입 완료 페이지 -->
              <v-window-item :value="4">
                <div class="pa-4 text-center">
                  <v-img
                    class="mb-4"
                    contain
                    height="128"
                    src="https://cdn.vuetifyjs.com/images/logos/v.svg"
                  ></v-img>
                  <h3 class="title font-weight-light mb-2">
                    Welcome to Checkin!
                  </h3>
                  <span class="caption grey--text">Thanks for signing up!</span>
                </div>
              </v-window-item>
            </v-window>
            <v-divider></v-divider>

            <v-card-actions>
              <v-btn :disabled="step === 1" text @click="step--">
                Back
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn
                :disabled="step === 4"
                color="#BF360C"
                depressed
                @click="step++"
              >
                Next
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-parallax>
</template>

<script>
export default {
  data: () => ({
    step: 1,
    rules: {
      email: v =>
        (v || "").match(/@/) ||
        "올바른 이메일 형식이 아닙니다! 다시 입력해주세요",
      length: len => v =>
        (v || "").length >= len || `Invalid character length, required ${len}`,
      password: v =>
        (v || "").match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/) ||
        "Password must contain an upper case letter, a numeric character, and a special character",
      required: v => !!v || "This field is required"
    }
  }),
  computed: {
    currentTitle() {
      switch (this.step) {
        case 1:
          return "Sign-up";
        case 2:
          return "Create a password";
        default:
          return "Account created";
      }
    }
  }
};
</script>
