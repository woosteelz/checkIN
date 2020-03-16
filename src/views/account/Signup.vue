<template>
  <v-parallax
    height="700"
    src="https://cdn.pixabay.com/photo/2018/07/14/15/27/cafe-3537801_1280.jpg"
  >
    <v-container fill-height style="max-width:450px">
      <v-layout align-center row wrap>
        <v-flex xs12>
          <v-card>
            <v-card-title flat primary-title>
              {{ currentTitle }}
            </v-card-title>

            <!-- 이메일 입력란 -->
            <v-window v-model="step">
              <v-window-item :value="1">
                <v-card-text>
                  <v-text-field v-model="email" label="Please enter your Email" :rules="rules.emailRules"/>
                  <span class="caption grey--text text--darken-1">
                    This is the email you will use to login to your Vuetify
                    account
                  </span>
                  <v-btn block :disabled="!rules.email">Send Confirm Code</v-btn>
                </v-card-text>
              </v-window-item>

              <!-- 확인코드 입력란 -->
              <v-window-item :value="2">
                <v-card-text>
                  <v-text-field
                    label="Please enter your Confirm Code"
                  />
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
                  <v-text-field
                    v-model="password"
                    :rules="rules.passwordRules"
                    label="Password"
                    type="password"
                  />
                  <v-text-field
                    v-model="confirmPassword"
                    :rules="rules.checkPasswordRules"
                    label="Confirm Password"
                    type="password"
                  />
                  <span class="caption grey--text text--darken-1">
                    Please enter a password for your account
                  </span>
                </v-card-text>
                <div class="pa-2">
                <v-checkbox
                  v-model="agreement"
                  :rules="rules.required"
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
            <v-divider/>

            <v-card-actions v-if="step!==4">
              <v-btn text @click="$router.push({ name: 'Login' })">
                Close
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn :disabled="step === 1" text color="#BF360C" @click="step--">
                Back
              </v-btn>
              <v-btn
                :disabled="step === 4"
                color="#66BB6A"
                depressed
                @click="step++"
              >
                Next
              </v-btn>
            </v-card-actions>
            <v-card-actions v-else>
              <v-btn
                color="#66BB6A"
                depressed
                block
                @click="$router.push({ name: 'Login' })"
              >
                Done
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
  data ()  {
    return {
      agentID: '',
      password: '',
      confirmPassword: '',
      step: 1,
      length: 6,
      rules: {
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || '올바른 이메일 형식이 아닙니다! 다시 입력해주세요',
        ],
        passwordRules: [
          v => !!v || 'Password is required',
          v => v.length <= this.length || 'Password must be less than 10 characters',
          v => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/.test(v) ||
          "Password must contain an upper case letter, a numeric character, and a special character"
        ],
        checkPasswordRules: [
          v => !!v || 'Confirm password is required',
          v => this.password === this.confirmPassword ||'It does not match'
        ],
        required: [v => !!v || "This field is required"]
      }
    }
  },
  computed: {
    currentTitle() {
      switch (this.step) {
        case 1:
          return "Sign-Up";
        case 2:
          return "Validate a confirm code";
        case 3:
          return "Create a password";
        default:
          return "Account created";
      }
    }
  }
};
</script>
