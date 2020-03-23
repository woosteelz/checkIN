<template>
  <v-container fill-height style="max-width:450px">
    <v-layout align-center row wrap>
      <v-flex xs12>
        <v-card>
          <v-toolbar flat>
            <v-toolbar-title>Check in</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <div class="pa-3">
            <v-text-field v-model="agentID" :rules="rules.emailRules" label="Please enter your email"/>
            <v-text-field v-model="agentPW" :rules="rules.passwordRules" type="password" label="Please enter your password"/>
            <v-btn
              @click="signIn({agentID, agentPW, jwtString, uuid, result})"
              @keypress.enter="signIn({agentID, agentPW, jwtString, uuid, result})" color="#43A047" block depressed large
            >
              Check in
            </v-btn>
            <div class="my-5">
              <v-divider />
            </div>
            <div class="my-2">
              <v-btn
                @click="$router.push({ name: 'SignUp' })"
                color="gray-lighten-5"
                block
                depressed
                large
                >Create Account</v-btn
              >
            </div>
            <div class="my-2">
              <v-btn
                @click="$router.push({ name: 'FindPassword' })"
                color="gray-lighten-5"
                block
                depressed
                large
                >Find Password</v-btn
              >
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

export default {
  data() {
    return {
      jwtString: null,
      agentID: '',
      agentPW: '',
      uuid: null,
      result: null,
      rules: {        
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || '올바른 이메일 형식이 아닙니다! 다시 입력해주세요',
        ],
        passwordRules: [
          v => !!v || 'Password is required'
        ],
      }
    }
  },
  methods: {
    ...mapActions(["signIn"])
  }
}
</script>

