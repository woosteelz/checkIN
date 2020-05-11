<template>
  <v-container fluid>
    <v-row align="start" no-gutters="">
      <v-col cols="10" align-self="start">
        <div class="white--text"><h3>프로필 수정</h3></div>
        <br />

        <v-divider color="#607D8B" />

        <v-row>
          <v-col cols="2">
            <v-subheader dark class="pt-5"><h3>이름:</h3></v-subheader>
          </v-col>
          <v-col cols="10">
            <v-text-field
              label="Name"
              value="기존 이름"
              dark
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="2">
            <v-subheader dark class="pt-5"><h3>이메일:</h3></v-subheader>
          </v-col>
          <v-col cols="10">
            <v-text-field
              label="Email"
              value="Email"
              dark
              readonly=""
            ></v-text-field>
          </v-col>
        </v-row>

        <br>
        <div class="d-flex justify-end">
          <v-btn small @click="onclick">
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
import VCheckBoxWithValidation from "@/components/inputs/VCheckBoxWithValidation";
import { mapState, mapActions } from "vuex";

export default {
  components: {
    VTextFieldWithValidation,
    VCheckBoxWithValidation,
    ValidationObserver,
    ValidationProvider,
  },
};
</script>
