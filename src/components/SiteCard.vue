<template>
  <div class="pa-3">
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-col v-for="card in userInfo.siteInfos" :key="card.id">
          <v-card
            height="120"
            width="90"
            @click="$router.push({ name: 'Home' })"
            v-on="on"
          >
            <div class="pt-4">
              <v-img
                :src="`${card.url}/favicon.ico`"
                :lazy-src="`${card.url}/favicon.ico`"
                height="48"
                width="48"
              />
            </div>
            <v-card-title
              style="max-width: 99px"
              class="d-inline-block text-truncate"
            >
              {{ card.id }}
            </v-card-title>
          </v-card>
        </v-col>
      </template>
      <span>{{ card.id }}</span>
      <v-btn color="success" @click="loadSiteInfo">text</v-btn>
    </v-tooltip>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      siteInfos :[],
    }
  },
  methods: {
    loadSiteInfo(){
      for (let index = 0; index < userInfo.siteInfo.length; index++) {
        siteInfos[i] = userInfo.siteInfo[i];
      }
    }
  },
  computed: {
    ...mapState(["userInfo"]),
  },
};
</script>
