<template>
  <v-container fill-height style="max-width:450px">
    <v-layout align-center row wrap>
      <v-flex xs12>
        <!-- alert -->
        <v-alert
          v-model="$store.state.userInfo.flag.isSignedInError"
          dismissible
          type="error"
        >
          아이디와 비빌번호를 확인해주세요.
        </v-alert>

        <!-- form -->
        <v-card>
          <v-toolbar flat>
            <v-toolbar-title>Check in</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <div class="px-3 pt-3">
            <form @keyup.enter="signIn({ agentID, agentPW })">
              <ValidationProvider
                name="email"
                rules="required|email"
                v-slot="{ errors, valid }"
              >
                <v-text-field
                  color="blue"
                  v-model="agentID"
                  label="ID"
                  :error-messages="errors"
                  :success="valid"
                  placeholder="Please enter your Email"
                >
                </v-text-field>
              </ValidationProvider>
              <ValidationProvider
                name="password"
                rules="required"
                v-slot="{ errors, valid }"
              >
                <v-text-field
                  color="blue"
                  v-model="agentPW"
                  label="Password"
                  type="password"
                  :error-messages="errors"
                  :success="valid"
                  placeholder="Please enter your Password"
                >
                </v-text-field>
              </ValidationProvider>
            </form>

            <div class="my-2" style="grid-column-gap:10%">
              <v-btn
                @click="signIn({ agentID, agentPW })"
                color="#43A047"
                depressed
                large
                block
              >
                로그인
              </v-btn>
            </div>
            <v-divider class="mt-4" />
            <div class="d-flex justify-center">
              <v-breadcrumbs :items="items"></v-breadcrumbs>
            </div>
          </div>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";
import { mapActions } from "vuex";
import VTextFieldWithValidation from "@/components/inputs/VTextFieldWithValidation";
import { ValidationProvider } from "vee-validate";

export default {
  data() {
    return {
      jwt: null,
      agentID: "",
      agentPW: "",
      uuid: null,
      result: null,
      items: [
        {
          text: "비밀번호 찾기",
          disabled: false,
          to: "FindPassword",
        },
        {
          text: "회원가입",
          disabled: false,
          to: "SignUp",
        },
        {
          text: "일회용 로그인",
          disabled: false,
          to: "OnetimeLogin",
        },
      ],
    };
  },
  components: {
    VTextFieldWithValidation,
    ValidationProvider,
  },
  methods: {
    ...mapActions(["signIn"]),
  },
};
</script>
