<template>
  <div class="pa-3">
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-card
          height="120"
          width="90"
          @click="$router.push({ name: 'Home' })"
          v-on="on"
        >
          <div class="pt-4">
            <v-img
              :src="`${userInfo.siteInfo[0].URL}/favicon.ico`"
              :lazy-src="`${userInfo.siteInfo[0].URL}/favicon.ico`"
              height="48"
              width="48"
            />
          </div>
          <v-card-title
            style="max-width: 99px"
            class="d-inline-block text-truncate"
          >
            {{ userInfo.siteInfo[0].name }}
          </v-card-title>
        </v-card>
      </template>
      <span>{{ userInfo.siteInfo[0].name }}</span>
    </v-tooltip>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data: {
  },
  computed: {
    ...mapState(["userInfo"])
  }
};
</script>
