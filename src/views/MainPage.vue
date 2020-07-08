<template>
  <v-container fill-height>
    <v-row>
      <v-col cols="12">
        <v-col align="center" justify="center">
          <!-- connected 영역 -->
          <v-card flat color="accent lighten-2">
            <v-card-title class="color: green--text">Connected</v-card-title>
            <v-card-actions>
              <v-row dense>
                <!-- 구글 -->
                <template v-for="item in userInfo.siteInfo">
                  <v-card
                    class="ma-3"
                    :key="item.name"
                    v-show="item.result"
                    height="120"
                    width="90"
                    @click="login(item.name)"
                  >
                    <div class="pt-4">
                      <v-img
                        :src="`${item.url}favicon.ico`"
                        height="48"
                        width="48"
                      />
                    </div>
                    <v-card-title
                      style="max-width: 99px"
                      class="d-inline-block text-truncate"
                    >
                      {{ item.name }}
                    </v-card-title>
                  </v-card>
                </template>
              </v-row>
            </v-card-actions>
          </v-card>
          <div class="pa-8">
            <v-divider class="style: accent lighten-3" />
          </div>

          <!-- disconnected 영역 -->
          <v-card flat color="accent lighten-2">
            <v-card-title class="color: red--text">Disonnected</v-card-title>
            <v-card-actions>
              <v-row dense>
                <!-- 구글 -->
                <template v-for="item in userInfo.siteInfo">
                  <v-card
                    class="ma-3"
                    :key="item.name"
                    v-show="!item.result"
                    height="110"
                    width="90"
                    @click="login(item.name)"
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
          <addSite />
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import SiteCard from "@/components/SiteCard";
import AddSite from "@/components/AddSite";

export default {
  data() {
    return {
      dialog: false,
      WEB_DRIVER_PATH: "",
      SELENIUM: "",
      URL: "",
      ID: "",
      PW: "",
    };
  },
  components: {
    siteCard: SiteCard,
    addSite: AddSite,
  },
  computed: {
    ...mapState(["userInfo"]),
  },
  methods: {
    login(name) {
      if (process.platform === "win32") {
        this.WEB_DRIVER_PATH = "src/bin/chromedriver.exe";
      } else {
        this.WEB_DRIVER_PATH = "src/bin/chromedriver";
      }
      var index = this.userInfo.siteInfo.findIndex(function(item) {
        return item.name === name;
      });
      this.ID = this.userInfo.siteInfo[index].id;
      this.PW = this.userInfo.siteInfo[index].password;
      this.URL = this.userInfo.siteInfo[index].url;

      this.userInfo.siteInfo[index].result = true;
      this.SELENIUM = "checkIN-selenium.jar";
      var spawn = require("child_process").spawn;
      var child = spawn(
        "java",
        [
          "-jar",
          this.SELENIUM,
          this.WEB_DRIVER_PATH,
          this.URL,
          this.ID,
          this.PW,
        ],
        ["shell: false"]
      );
      child.stdout.on("data", function(data) {
        console.log(data.toString());
      });

      child.stderr.on("data", function(data) {
        console.log(data.toString());
      });
    },
  },
};
</script>
