<template>
  <v-btn v-if="isSignedIn" tile icon>
    <v-icon large color="white">mdi-pencil</v-icon>
  </v-btn>
  <v-btn v-else tile icon disabled>
    <v-icon large color="white">mdi-pencil</v-icon>
  </v-btn>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["isSignedIn"])
  }
}
</script>

<style>

</style>