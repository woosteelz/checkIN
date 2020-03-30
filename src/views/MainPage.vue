<template>
  <v-container fill-height>
    <v-row>
      <v-col cols="12">
        <v-col align="center" justify="center">
          <!-- connected 영역 -->
          <v-card flat color="accent lighten-2">
            <v-card-title class="color: green--text">Connected</v-card-title>
            <v-card-actions>
              <siteCard/>
            </v-card-actions>
          </v-card>
          <div class="pa-8">
            <v-divider class="style: accent lighten-3" />
          </div>

          <!-- disconnected 영역 -->
          <v-card flat color="accent lighten-2">
            <v-card-title class="color: red--text">Disonnected</v-card-title>
            <v-card-actions>

            </v-card-actions>
          </v-card>
        </v-col>
      </v-col>
    </v-row>
    <v-row justify="end">
      <v-btn
        @click="dialog = !dialog"
        depressed
        icon
        large
        dark
        color="success"
      >
        <v-icon x-large>mdi-plus-circle-outline</v-icon>
      </v-btn>
        <v-dialog v-model="dialog" max-width="500px">
          <v-card>
            <addSite/>
          </v-card>
        </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';
import SiteCard from '@/components/SiteCard'
import AddSite from '@/components/AddSite'
export default {
  data() {
    return {
      dialog: false
    }
  },
  components: {
    siteCard: SiteCard,
    addSite: AddSite
  },
  computed: {
    ...mapState(["userInfo"])
  },
}
</script>