<template>
  <v-container fill-height fluid>
    <v-row align="center" justify="spcae-between">
      <v-col cols="6">
        
      </v-col>
      <v-col cols="6">
        <div class="ma-3">
          <div class="ma-3">
            <form>
              <VTextFieldWithValidation color="blue" rules="required|email" v-model="agentID" label="ID" placeholder="Please enter your Email"/>
              <VTextFieldWithValidation vid="agentPW" color="blue" rules="required|password|min:6" v-model="agentPW" label="Password" type="password" placeholder="Please enter your Password"/>
              <VTextFieldWithValidation color="blue" rules="required|confirmed:confirmPassword" v-model="confirmPassword" label="Password Confirmation" type="password" placeholder="Please enter your Confirm Password"/>
              <VTextFieldWithValidation color="blue" rules="required" v-model="name" label="name" placeholder="Please enter your name" />
            </form>
          </div>
          <div class="ma-3 and d-flex justify-space-between">
            <v-btn width="80" color="grey" @click="$router.push({ name: 'SignIn' })">
              Close
            </v-btn>
            <v-btn
              color="success"
              width="80"
              depressed
              @click="$router.push({ name: 'SignIn' })"
            >
              Done
            </v-btn> 
          </div>
        </div>

      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";
import VTextFieldWithValidation from '@/components/inputs/VTextFieldWithValidation';
import VCheckBoxWithValidation from '@/components/inputs/VCheckBoxWithValidation';
import { mapState, mapActions } from 'vuex';
import axios from 'axios';

export default {
  components: {
    VTextFieldWithValidation,
    VCheckBoxWithValidation
  },
}
</script>

<style>

</style>