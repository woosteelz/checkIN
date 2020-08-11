<template>
  <v-container fill-height fluid>
    <v-row align="center">
      <v-col cols="6">
        <div>
          <v-img
            height="300"
            width="500"
            src="@/assets/KakaoTalk_Photo_2020-07-14-12-22-36.png"
          />
        </div>
      </v-col>
      <v-col cols="6">
        <div class="ma-3">
          <div class="ma-3">
            <ValidationObserver v-slot="{ invalid }">
              <v-alert
                v-model="$store.state.isDuplicated"
                dismissible
                type="error"
              >
                중복된 이메일입니다.
              </v-alert>
              <v-alert
                v-model="$store.state.codeMatchError"
                dismissible
                type="error"
              >
                올바르지 않은 인증 코드입니다.
              </v-alert>
              <form
                @keyup.enter="
                  signUp({
                    agentID,
                    agentPW,
                    confirmCode,
                    name,
                  })
                "
              >
                <ValidationProvider
                  name="email"
                  rules="required|email"
                  v-slot="{ errors, valid }"
                >
                  <v-text-field
                    dark
                    v-model="agentID"
                    label="ID"
                    :error-messages="errors"
                    :success="valid"
                    placeholder="Please enter your Email"
                    filled
                  >
                    <template #append>
                      <v-btn
                        depressed
                        small
                        color="blue"
                        class="ma-0"
                        @click="
                          verifyEmail({
                            agentID,
                            agentPW,
                            name,
                          })
                        "
                      >
                        중복 확인
                      </v-btn>
                    </template>
                  </v-text-field>
                </ValidationProvider>
                <VTextFieldWithValidation
                  v-show="verifySuccess"
                  color="blue"
                  rules="required"
                  v-model="confirmCode"
                  label="Confirmation Code"
                  placeholder="Please enter your Confirmation Code"
                />
                <VTextFieldWithValidation
                  vid="agentPW"
                  color="blue"
                  rules="required|password|min:6"
                  v-model="agentPW"
                  label="Password"
                  type="password"
                  placeholder="Please enter your Password"
                />
                <VTextFieldWithValidation
                  color="blue"
                  rules="required|confirmed:agentPW"
                  v-model="confirmPassword"
                  label="Password Confirmation"
                  type="password"
                  placeholder="Please enter your Confirm Password"
                />
                <VTextFieldWithValidation
                  color="blue"
                  rules="required"
                  v-model="name"
                  label="name"
                  placeholder="Please enter your name"
                />
                <div class="ma-3">
                  <v-divider dark style="grey" />
                </div>
                <br />
                <div class="ma-3 and d-flex justify-space-between">
                  <v-btn
                    width="100"
                    color="grey darken-1 and white--text"
                    depressed
                    @click="$router.push({ name: 'SignIn' })"
                  >
                    취소
                  </v-btn>
                  <v-btn
                    color="success"
                    width="100"
                    depressed
                    :disabled="invalid"
                    @click="
                      signUp({
                        agentID,
                        agentPW,
                        confirmCode,
                        name,
                      })
                    "
                  >
                    가입하기
                  </v-btn>
                </div>
              </form>
            </ValidationObserver>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";
import VTextFieldWithValidation from "@/components/inputs/VTextFieldWithValidation";
import VCheckBoxWithValidation from "@/components/inputs/VCheckBoxWithValidation";
import { mapState, mapActions } from "vuex";
import axios from "axios";

export default {
  components: {
    VTextFieldWithValidation,
    VCheckBoxWithValidation,
    ValidationObserver,
    ValidationProvider,
  },
  data() {
    return {
      agentID: null,
      agentPW: null,
      name: null,
      confirmPassword: null,
      agreement: false,
      confirmCode: null,
    };
  },
  computed: {
    ...mapState([
      "hasFormError",
      "isDuplicated",
      "codeMatchError",
      "verifySuccess",
    ]),
  },
  methods: {
    ...mapActions(["verifyEmail", "signUp"]),
  },
};
</script>

<style></style>
