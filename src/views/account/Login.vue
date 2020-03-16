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
            <v-text-field v-model="email" :rules="[rules.email]" label="Please enter your email">
            </v-text-field>
            <v-text-field v-model="password" :rules="[rules.password]" type="password" label="Please enter your password">
            </v-text-field>
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
                >Sign in</v-btn
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
      email: v => (v || '').match(/@/) || '올바른 이메일 형식이 아닙니다! 다시 입력해주세요',
      length: len => v => (v || '').length >= len || `Invalid character length, required ${len}`,
      password: v => (v || '').match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/) || 'Password must contain an upper case letter, a numeric character, and a special character',
      required: v => !!v || 'This field is required'
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
