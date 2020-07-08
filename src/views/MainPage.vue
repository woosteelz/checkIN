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
      <v-dialog v-model="dialog" width="500px">
        <v-card dark color="accent lighten-3">
          <v-card-title class="accent lighten-2 and justify-center">
            새 사이트 등록
          </v-card-title>
          <v-card-text class="pb-0">
            <ValidationObserver v-slot="{ invalid }">
              <form class="pa-3">
                <ValidationProvider
                  name="name"
                  rules="required"
                  v-slot="{ errors, valid }"
                  class="mt-5"
                >
                  <v-text-field
                    color="blue"
                    v-model="name"
                    label="사용자 지정 이름"
                    :error-messages="errors"
                    :success="valid"
                    placeholder="사이트 이름을 입력해주세요."
                  >
                  </v-text-field>
                </ValidationProvider>
                <ValidationProvider
                  name="URL"
                  rules="required"
                  v-slot="{ errors, valid }"
                >
                  <v-text-field
                    color="blue"
                    v-model="URL"
                    label="URL"
                    :error-messages="errors"
                    :success="valid"
                    placeholder="로그인 양식이 있는 페이지의 URL을 입력해주세요."
                  >
                  </v-text-field>
                </ValidationProvider>
                <ValidationProvider
                  name="ID"
                  rules="required"
                  v-slot="{ errors, valid }"
                >
                  <v-text-field
                    color="blue"
                    v-model="ID"
                    label="ID"
                    :error-messages="errors"
                    :success="valid"
                    placeholder="로그인하기 위한 아이디를 입력해주세요."
                  >
                  </v-text-field>
                </ValidationProvider>
                <ValidationProvider
                  name="PW"
                  rules="required"
                  v-slot="{ errors, valid }"
                >
                  <v-text-field
                    color="blue"
                    v-model="PW"
                    label="Password"
                    :error-messages="errors"
                    :success="valid"
                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show ? 'text' : 'password'"
                    @click:append="show = !show"
                    placeholder="로그인하기 위한 비밀번호를 입력해주세요."
                  >
                  </v-text-field>
                </ValidationProvider>
                <v-divider class="my-3"></v-divider>
                <v-card-actions>
                  <v-btn large depressed color="error" @click="dialog = false"
                    >취소</v-btn
                  >
                  <v-spacer></v-spacer>
                  <v-slide-x-reverse-transition>
                    <v-tooltip left>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          icon
                          class="my-0"
                          v-bind="attrs"
                          @click="resetForm"
                          v-on="on"
                        >
                          <v-icon>mdi-refresh</v-icon>
                        </v-btn>
                      </template>
                      <span>양식 초기화</span>
                    </v-tooltip>
                  </v-slide-x-reverse-transition>
                  <v-btn
                    :disabled="invalid"
                    large
                    depressed
                    color="success"
                    @click="addSite({ name, URL, ID, PW })"
                    >등록</v-btn
                  >
                </v-card-actions>
              </form>
            </ValidationObserver>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import SiteCard from "@/components/SiteCard";
import AddSite from "@/components/AddSite";
import { ValidationProvider, ValidationObserver } from "vee-validate";

export default {
  data() {
    return {
      dialog: false,
      show: false,
      ID: "",
      PW: "",
      URL: "",
      name: "",
      WEB_DRIVER_PATH: "",
      SELENIUM: "",
      sURL: "",
      sID: "",
      sPW: "",
    };
  },
  components: {
    siteCard: SiteCard,
    addSite: AddSite,
    ValidationProvider,
    ValidationObserver,
  },
  computed: {
    ...mapState(["userInfo"]),
  },
  methods: {
    ...mapActions(["addSite"]),
    resetForm() {
      (this.ID = ""), (this.PW = ""), (this.URL = ""), (this.name = "");
    },
    login(name) {
      if (process.platform === "win32") {
        this.WEB_DRIVER_PATH = "src/bin/chromedriver.exe";
      } else {
        this.WEB_DRIVER_PATH = "src/bin/chromedriver";
      }
      var index = this.userInfo.siteInfo.findIndex(function(item) {
        return item.name === name;
      });
      this.sID = this.userInfo.siteInfo[index].id;
      this.sPW = this.userInfo.siteInfo[index].password;
      this.sURL = this.userInfo.siteInfo[index].url;

      this.userInfo.siteInfo[index].result = true;
      this.SELENIUM = "checkIN-selenium.jar";
      var spawn = require("child_process").spawn;
      var child = spawn(
        "java",
        [
          "-jar",
          this.SELENIUM,
          this.WEB_DRIVER_PATH,
          this.sURL,
          this.sID,
          this.sPW,
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
