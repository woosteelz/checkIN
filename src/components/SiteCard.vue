<template>
  <div class="pa-3">
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-col>
          <v-card
            height="120"
            width="90"
            @click="$router.push({ name: 'Home' })"
            v-on="on"
          >
            <div class="pt-4">
              <v-img
                :src="`${userInfo.siteInfo[1].url}/favicon.ico`"
                :lazy-src="`${userInfo.siteInfo[1].url}/favicon.ico`"
                height="48"
                width="48"
              />
            </div>
            <v-card-title
              style="max-width: 99px"
              class="d-inline-block text-truncate"
            >
              {{ userInfo.siteInfo[1].name }}
            </v-card-title>
          </v-card>
        </v-col>
      </template>
    </v-tooltip>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { mapGetters } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["userInfo"]),
  },
};
</script>
