<template>
  <v-parallax
    height="700"
    src="https://cdn.pixabay.com/photo/2018/07/14/15/27/cafe-3537801_1280.jpg"
  >
    <v-container fill-height style="max-width:450px">
      <v-layout align-center row wrap>
        <v-flex xs12>

          <v-card>
            <!-- 이메일 중복 경고창 -->
            <v-alert v-if="isDuplicated" type="error" tile>
              Already exists! Enter a diffrent agentID!
            </v-alert>

            <v-alert v-else-if="hasFormError" type="error" tile>
              Please enter the correct Form!
            </v-alert>

            <v-card-title flat primary-title>
              {{ currentTitle }}
            </v-card-title>

            <!-- 이메일 입력란 -->
            <v-window v-model="level">
              <v-window-item :value="1">
                <v-card-text>
                  <VTextFieldWithValidation color="blue" rules="required|email" v-model="agentID" label="ID" placeholder="Please enter your Email" />
                  <v-btn block @click="verifyEmail({agentID, agentPW, name, errorCount, numberOfDevice})">Send Confirm Code</v-btn>
                </v-card-text>
              </v-window-item>

              <!-- 확인코드 입력란 -->
              <v-window-item :value="2">
                <v-card-text>
                  <v-text-field
                    v-model="confirmCode"
                    label="Confirm Code"
                    placeholder="Please enter your Confirm Code"
                    color="blue"
                  />
                  <span class="caption grey--text text--darken-1">
                    This is the email you will use to signin to your checkIN
                    account
                  </span>
                  <v-btn block>Confirm Email</v-btn>
                </v-card-text>
              </v-window-item>

              <!-- 패스워드 입력 및 확인란 -->
              <v-window-item :value="3">
                <v-card-text>
                  <VTextFieldWithValidation vid="agentPW" color="blue" rules="required|password|min:6" v-model="agentPW" label="Password" type="password"/>
                  <VTextFieldWithValidation color="blue" rules="required|confirmed:confirmPassword" v-model="confirmPassword" label="Password Confirmation" type="password"/>
                  <span class="caption grey--text text--darken-1">
                    Please enter a password for your account
                  </span>
                </v-card-text>
                <div class="pa-2">
                <VCheckBoxWithValidation color="blue" rules="required" v-model="agreement" label="위치정보 수집에 동의합니다 *" />
                </div>
              </v-window-item>

              <!-- name 입력칸 -->
              <v-window-item :value="4">
                <v-card-text>
                  <VTextFieldWithValidation color="blue" v-model="name" label="name" placeholder="Please enter your name" />
                </v-card-text>
              </v-window-item>

              <!-- 회원가입 완료 페이지 -->
              <v-window-item :value="5">
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

            <v-card-actions v-if="step!==5">
              <v-btn text @click="$router.push({ name: 'SignIn' })">
                Close
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn :disabled="step === 1" text color="#BF360C" @click="step--">
                Back
              </v-btn>
              <v-btn
                :disabled="step === 5"
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
                @click="$router.push({ name: 'SignIn' })"
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
import { ValidationObserver, ValidationProvider } from "vee-validate";
import VTextFieldWithValidation from '@/components/inputs/VTextFieldWithValidation';
import VCheckBoxWithValidation from '@/components/inputs/VCheckBoxWithValidation';
import { mapState, mapActions } from 'vuex';
import axios from 'axios'

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
    VTextFieldWithValidation,
    VCheckBoxWithValidation
  },
  data ()  {
    return {
      agentID: null,
      agentPW: null,
      name: null,
      errorCount: null,
      numberOfDevice: null,
      confirmPassword: null,
      agreement: false,
      level: step
    }
  },
  computed: {
    ...mapState(["hasFormError", "isDuplicated", "codeMatchError", "step"]),
    currentTitle() {
      switch (step) {
        case 1:
          return "Sign Up";
        case 2:
          return "Validate a confirm code";
        case 3:
          return "Create a password";
        case 4: 
          return "Enter your name or nickname"  ;
        default:
          return "Account created";
      }
    }
  },
  methods: {
    ...mapActions(["verifyEmail"]),
    signUp() {
      const agentID = this.agentID
      const agentPW = this.password
      const name = '테스트'
      const errorCount = 0
      const numberOfDevice = 0
      if(!agentID || !agentPW || !name) {
        return false
      }
      axios.post("http://18.218.11.150:8080/checkIN/signUp/signAccount", {agentID, agentPW, name, errorCount, numberOfDevice})
        .then(res => {
          if(res.status === 200) {
            this.$router.push({ name: 'SignIn' })
            return true
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },
};
</script>
