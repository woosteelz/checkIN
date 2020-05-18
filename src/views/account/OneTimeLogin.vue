<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <form>
            <ValidationProvider name="email" rules="max:8" v-slot="{ errors, valid }">
              <v-text-field
                color="blue"
                v-model="otl"
                solo
                solo-inverted
                :error-messages="errors"
                :success="valid"
                placeholder="Please enter your Email"
              >
              </v-text-field>
            </ValidationProvider>
          </form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      otl: null
    }
  },
}
</script>

<style>

</style>>