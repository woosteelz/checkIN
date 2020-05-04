<template>
  <v-container fill-height fluid>
    <v-row no-gutters>
      <v-col cols="8">
        <span class="white--text"><h3>새 비밀번호 입력</h3></span>
        <br>
        <ValidationObserver>
          <form>
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
          </form>
        </ValidationObserver>
        <br />
        <v-spacer />
        <div class="d-flex justify-end">
          <v-btn small>submit</v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";
import VTextFieldWithValidation from "@/components/inputs/VTextFieldWithValidation";

export default {
  components: {
    VTextFieldWithValidation,
    ValidationObserver,
    ValidationProvider,
  },
  data() {
    return {
      agentID: null,
      agentPW: null,
      name: null,
      errorCount: null,
      numberOfDevice: null,
      confirmPassword: null,
    };
  },
};
</script>

<style></style>
