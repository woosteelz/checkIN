<template>
  <v-container fill-height>
    <v-row justify="center" align="center">
      <v-col cols="5">
        <form>
          <span class="text-center and white--text">
            <h2><strong>일회용 로그인</strong></h2>
            <br />
          </span>
          <ValidationProvider
            name="email"
            rules="required|email"
            v-slot="{ errors, valid }"
          >
            <v-text-field
              dark
              v-model="otl"
              :error-messages="errors"
              :success="valid"
              placeholder="일회용 로그인 번호"
              filled
            >
            </v-text-field>
            <br />
            <div class="d-flex justify-space-between">
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
                    confirmPassword,
                    confrimCode,
                    name,
                    errorCount,
                    numberOfDevice,
                  })
                "
              >
                로그인
              </v-btn>
            </div>
          </ValidationProvider>
        </form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ValidationProvider } from "vee-validate";
export default {
  data() {
    return {
      otl: null,
    };
  },
  components: {
    ValidationProvider,
  },
};
</script>

<style></style>>
