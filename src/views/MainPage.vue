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
                    :key="userInfo.siteInfo.indexOf(item)"
                    v-show="item.result"
                    height="110"
                    width="90"
                    @click="item.result = !item.result"
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
                      >{{ item.name }}</v-card-title
                    >
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
                <!-- 사이트 카드 -->
                <template v-for="item in userInfo.siteInfo">
                  <v-card
                    class="ma-3"
                    height="110"
                    width="90"
                    @click.left="login(item)"
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
                      >{{ item.name }}</v-card-title
                    >
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
          <v-card-title class="accent lighten-2 and justify-center"
            >새 사이트 등록</v-card-title
          >
          <v-card-text class="pb-0">
            <ValidationObserver v-slot="{ invalid }">
              <form
                class="pa-3"
                @keyup.enter="
                  addSite({ name, URL, ID, PW }), (dialog = false), resetForm()
                "
              >
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
                  ></v-text-field>
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
                  ></v-text-field>
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
                  ></v-text-field>
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
                  ></v-text-field>
                </ValidationProvider>
                <v-divider class="my-3"></v-divider>
                <v-card-actions>
                  <v-btn
                    large
                    depressed
                    color="error"
                    @click="(dialog = false), resetForm()"
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
                    @click="
                      addSite({ name, URL, ID, PW }),
                        (dialog = false),
                        resetForm()
                    "
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
import { userInfo } from "os";
import CryptoJS from "crypto-js";

export default {
  data() {
    return {
      showMenu: false,
      x: 0,
      y: 0,
      dialog: false,
      show: false,
      ID: "",
      PW: "",
      URL: "",
      name: "",
      browser: "chrome",
      d_id: "",
      d_path: "",
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
    open(e) {
      e.preventDefault();
      this.showMenu = false;
      this.x = e.clientX;
      this.y = e.clientY;
      this.$nextTick(() => {
        this.showMenu = true;
      });
    },
    login(item) {
      if (process.platform === "win32") {
        switch (this.browser) {
          case "chrome":
            this.d_id = "webdriver.chrome.driver";
            this.d_path = "src/bin/chromedriver.exe";
            break;
          case "edge":
            this.d_id = "webdriver.edge.driver";
            this.d_path = "src/bin/msedgedriver.exe";
            break;
          case "ie":
            this.d_id = "webdriver.ie.driver";
            this.d_path = "src/bin/IEDriverServer.exe";
            break;
          default:
            break;
        }
      } else {
        switch (this.BROWSER) {
          case "chrome":
            this.d_id = "webdriver.chrome.driver";
            this.d_path = "src/bin/chromedriver";
            break;
          case "edge":
            this.d_id = "webdriver.edge.driver";
            this.d_path = "src/bin/msedgedriver";
            break;
          default:
            break;
        }
      }
      var key = this.$store.state.userInfo.agentPW;
      this.sID = item.id;
      this.sPW = CryptoJS.AES.decrypt(item.pw, key).toString(CryptoJS.enc.Utf8);
      this.sURL = item.url;
      this.SELENIUM = "checkIN-selenium.jar";

      var spawn = require("child_process").spawn;
      var child = spawn(
        "java",
        [
          "-jar",
          this.SELENIUM,
          this.browser,
          this.d_id,
          this.d_path,
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
