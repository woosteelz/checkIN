<template>
  <v-container fill-height fluid>
    <v-row align="center" justify="center">
      <v-col cols="3" align-self="start"></v-col>
      <v-col cols="6">
        <div class="ma-3">
          <div class="ma-3">
            <span class="text-center and white--text">
              <h2>
                <strong>비밀번호 변경</strong>
              </h2>
              <br />
            </span>
            <ValidationObserver v-slot="{ invalid }">
              <form>
                <ValidationProvider name="email" rules="required|email" v-slot="{ errors, valid }">
                  <v-text-field
                    dark
                    v-model="agentID"
                    label="ID"
                    :error-messages="errors"
                    :success="valid"
                    placeholder="가입시 입력했던 이메일을 입력해 주세요"
                    filled
                  >
                    <template #append>
                      <v-btn
                        depressed
                        small
                        color="blue"
                        class="ma-0"
                        @click="
                          reVerifyEmail({
                            agentID,
                            agentPW,
                            name,
                            errorCount,
                            numberOfDevice,
                          })
                        "
                      >코드 전송</v-btn>
                    </template>
                  </v-text-field>
                </ValidationProvider>
                <VTextFieldWithValidation
                  v-show="verifySuccess"
                  color="blue"
                  rules="required"
                  v-model="confirmCode"
                  label="Confirmation Code"
                  placeholder="이메일로 전송된 확인 코드를 입력해주세요"
                />
                <VTextFieldWithValidation
                  vid="agentPW"
                  color="blue"
                  rules="required|password|min:6"
                  v-model="agentPW"
                  label="New Password"
                  type="password"
                  placeholder="새로운 비밀번호를 입력해주세요"
                />
                <VTextFieldWithValidation
                  color="blue"
                  rules="required|confirmed:agentPW"
                  v-model="confirmPassword"
                  label="New Password Confirmation"
                  type="password"
                  placeholder="새로운 비밀번호를 다시 입력해 주세요"
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
                  >취소</v-btn>
                  <v-btn
                    color="success"
                    width="100"
                    depressed
                    :disabled="invalid"
                    @click="
                      changePassword({
                        agentID,
                        agentPW,
                        confirmPassword,
                        confrimCode,
                      })
                    "
                  >비밀번호 변경</v-btn>
                </div>
              </form>
            </ValidationObserver>
          </div>
        </div>
      </v-col>
      <v-col cols="3"></v-col>
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
    ValidationProvider
  },
  data() {
    return {
      agentID: null,
      agentPW: null,
      confirmPassword: null,
      confirmCode: null
    };
  },
  computed: {
    ...mapState([
      "forSignUp, hasFormError",
      "isDuplicated",
      "codeMatchError",
      "verifySuccess"
    ])
  },
  methods: {
    ...mapActions(["reVerifyEmail", "changePassword"])
  }
};
</script>

<style></style>
