<template>
  <v-container fill-height fluid>
    <v-row align="center">
      <v-col cols="6">
        
      </v-col>
      <v-col cols="6">
        <div class="ma-3">
          <div class="ma-3">
            <form>
              <ValidationProvider name="email" rules="required|email" v-slot="{ errors, valid }">
                <v-text-field
                  dark
                  v-model="agentID"
                  label="ID"
                  :error-messages="errors"
                  :success="valid"
                  placeholder="Please enter your Email"
                  filled
                >
                  <template v-slot:append>
                  <v-btn
                    depressed 
                    small
                    color="blue"
                    class="ma-0"
                    @click="emailCheck({agentID})"
                  >
                    중복 확인
                  </v-btn> 
                </template>
                </v-text-field>
              </ValidationProvider>
              <VTextFieldWithValidation v-if="isEmailExsisted" color="blue" rules="required" v-model="confirmCode" label="Confirmation Code" placeholder="Please enter your Confirmation Code"/>
              <VTextFieldWithValidation vid="agentPW" color="blue" rules="required|password|min:6" v-model="agentPW" label="Password" type="password" placeholder="Please enter your Password"/>
              <VTextFieldWithValidation color="blue" rules="required|confirmed:confirmPassword" v-model="confirmPassword" label="Password Confirmation" type="password" placeholder="Please enter your Confirm Password"/>
            </form>
          </div>
          <div class="ma-3 and d-flex justify-space-between">
            <v-btn width="80" color="grey" @click="$router.push({ name: 'SignIn' })">
              Close
            </v-btn>
            <v-btn
              v-if="isEmailExsisted"
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
    VCheckBoxWithValidation,
    ValidationObserver,
    ValidationProvider
  },
  data() {
    return {
      agentID: null,
      agentPW: null,
      confirmPassword: null,
    }
  },
  computed: {
    ...mapState(["isEmailExsisted"]),
  },
  methods: {
    ...mapActions(["emailCheck"])
  },
}
</script>