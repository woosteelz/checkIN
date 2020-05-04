<template>
  <v-container fill-height fluid>
    <v-row no-gutters>
      <v-col cols="8">
        <span class="white--text"><h3>현재 비밀번호 입력</h3></span>
        <br>
        <v-divider color="#607D8B" />
        <br>
        <VTextFieldWithValidation
          vid="agentPW"
          color="blue"
          rules="required|password|min:6"
          v-model="agentPW"
          label="Password"
          type="password"
          placeholder="Please enter your Password"
        />
        <br>
        <div class="d-flex justify-end">
          <v-btn small @click="$router.push({ name: 'NewPassword' })">
          submit
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";
import VTextFieldWithValidation from "@/components/inputs/VTextFieldWithValidation";
import { mapState, mapActions } from "vuex";
import axios from "axios";

export default {
  components: {
    VTextFieldWithValidation
  },
};
</script>

<style></style>
