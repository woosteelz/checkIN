<template>
  <v-container fill-height style="max-width:450px" >
    <v-layout align-center row wrap>
      <v-flex xs12>
        <v-card>
          <v-toolbar flat>
            <v-toolbar-title>Check in</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <div class="pa-3">
            <VTextFieldWithValidation color="blue" rules="required|email" v-model="agentID" label="ID" placeholder="Please enter your Email"/>
            <VTextFieldWithValidation color="blue" rules="required" v-model="agentPW" label="Password" placeholder="Please enter your Password" type="password"/>
            <v-btn
              @click="signIn({agentID, agentPW, jwtString, uuid, result})" color="#43A047" block depressed large
            >
              Check in
            </v-btn>
            <div class="my-5">
              <v-divider />
            </div>
            <div class="my-2">
              <v-btn
                @click="$router.push({ name: 'SignUpTest' })"
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
import VTextFieldWithValidation from '@/components/inputs/VTextFieldWithValidation';

export default {
  data() {
    return {
      jwtString: null,
      agentID: '',
      agentPW: '',
      uuid: null,
      result: null
    }
  },
  components: {
    VTextFieldWithValidation
  },
  methods: {
    ...mapActions(["signIn"])
  }
}
</script>

