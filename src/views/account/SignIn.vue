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
            <v-btn @click="signIn" color="#43A047" block depressed large
              >Check in</v-btn
            >
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
    agentID: '',
    password: '',
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
    signIn() {
      const id = this.agentID
      const pwd = this.password

      if(!id || !pwd) {
        alert("이메일 및 비밀번호를 확인하세욧!");
        return false
      }
      axios.post("http://18.218.11.150:8080/checkIN/signIn", {id, pwd})
        .then((res) => {
          if (res.data.result === true) {
            alert("로그인 성공!");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
};
</script>
