<template>
  <v-col align="center" justify="center">
    <v-card flat color="accent lighten-2">
      <v-card-title class="color: red--text">Disonnected</v-card-title>
      <v-card-actions>
        <v-row dense>
          <!-- 사이트 카드 -->
          <template v-for="item in userInfo.siteInfo">
            <v-card
              class="ma-3"
              height="110"
              width="90"
              @click.left="login(item)"
              @click.right="open"
              :key="userInfo.siteInfo.indexOf(item)"
              v-show="!item.result"
            >
              <div class="pt-4">
                <v-img
                  :src="
                    `http://www.google.com/s2/favicons?sz=32&domain=${item.url}`
                  "
                  height="32px"
                  width="32px"
                />
              </div>
              <v-card-title
                style="max-width: 99px"
                class="px-1 d-inline-block text-truncate"
              >
                {{ item.name }}
              </v-card-title>
            </v-card>
          </template>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["isSignedIn"]),
  },
};
</script>

<style></style>
