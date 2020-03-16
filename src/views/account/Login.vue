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
            <v-text-field v-model="password" :rules="rules.passwordRules" type="password" label="Please enter your password"/>
            <v-btn @click="login" color="#43A047" block depressed large
              >Check in</v-btn
            >
            <div class="my-5">
              <v-divider />
            </div>
            <div class="my-2">
              <v-btn
                @click="$router.push({ name: 'Signup' })"
                color="gray-lighten-5"
                block
                depressed
                large
                >Sign Up</v-btn
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

export default {
  data: () => ({
    rules: {        
      emailRules: [
          v => !!v || 'E-mail is required',
          v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || '올바른 이메일 형식이 아닙니다! 다시 입력해주세요',
      ],
      passwordRules: [
          v => !!v || 'Password is required',
      ],
    }
  }),
  methods: {
    login() {
      axios
        .post("http://18.218.11.150:8080/checkIN/send", {
          id: this.email,
          pwd: this.password
        })
        .then(function(response) {
          if (response.data[0].result === true) {
            alert("로그인 성공!");
          } else {
            alert("이메일 및 비밀번호를 확인하세욧!");
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>
