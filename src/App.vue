<template>
  <v-app>
    <!-- 네비게이션 드로어 영역-->
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense class="py-0">
        <v-list-item two-line>
          <v-list-item-avatar>
            <img src />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ userInfo.name }}</v-list-item-title>
            <v-list-item-subtitle>{{ userInfo.agentID }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item router :to="{ name: 'Home' }" exact>
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>

          <v-list-item router :to="{ name: 'SignIn' }" exact>
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Account</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <div id="header">
      <v-system-bar
        id="systembar"
        class="justify-space-between"
        app
        dark
        height="48"
      >
        <v-toolbar-title @click="$router.push({ name: 'SignIn' })">
          <span class="ml-4">
            <strong>checkIN</strong>
          </span>
        </v-toolbar-title>
        <!-- 검색창 -->
        <span id="search" width="150">
          <v-text-field
            flat
            rounded
            dense
            solo-inverted
            hide-details
            prepend-inner-icon="mdi-magnify"
            label="Search"
            class="hidden-sm-and-down"
            color="blue"
          />
        </span>

        <!-- profile -->
        <div>
          <span id="profile" class="mr-4">
            <v-btn
              class="mr-4"
              v-if="userInfo.flag.isSignedIn"
              tile
              icon
              @click="dialog = !dialog"
            >
              <v-icon large color="white">mdi-pencil</v-icon>
            </v-btn>
            <v-btn class="mr-4" v-else tile icon disabled>
              <v-icon large color="white">mdi-pencil</v-icon>
            </v-btn>
            <profile />
          </span>
          <span>
            <v-btn id="minus" icon tile @click="window_minimize()">
              <v-icon small>mdi-minus</v-icon>
            </v-btn>
            <v-btn id="box" icon tile @click="change()">
              <v-icon v-if="maximized" small
                >mdi-checkbox-multiple-blank-outline</v-icon
              >
              <v-icon v-else small>mdi-checkbox-blank-outline</v-icon>
            </v-btn>
            <v-btn id="close" color="red" icon tile @click="window_close()">
              <v-icon small>mdi-close</v-icon>
            </v-btn>
          </span>
        </div>
      </v-system-bar>
    </div>
    <!-- app 바 영역 -->
    <div>
      <v-app-bar
        style="positon: relative"
        app
        dark
        max-height="48"
        color="primary"
        dense
      >
        <!-- 메뉴열기 -->
        <v-app-bar-nav-icon @click="drawer = true" />

        <v-spacer />

        <!-- 상단 우측 아이콘 -->
        <v-btn icon tile color="red">
          <v-icon color="white">mdi-heart</v-icon>
        </v-btn>
      </v-app-bar>
    </div>

    <!-- 컨텐츠 탈부착 영역 -->
    <v-content>
      <router-view />
    </v-content>

    <!-- Edit -->
    <v-dialog v-model="dialog">
      <v-col align="center" justify="center">
        <v-card flat color="accent lighten-2">
          <v-card-title class="color: blue--text">Edit</v-card-title>
          <v-card-actions>
            <v-row dense>
              <!-- 사이트 카드 -->

              <template v-for="editItem in userInfo.siteInfo">
                <v-menu offset-x :key="userInfo.siteInfo.indexOf(editItem)">
                  <template v-slot:activator="{ on, attr }">
                    <v-card
                      class="ma-3"
                      height="110"
                      width="90"
                      v-on="on"
                      v-bind="attr"
                    >
                      <div class="pt-4">
                        <v-img
                          :src="
                            `http://www.google.com/s2/favicons?sz=32&domain=${editItem.url}`
                          "
                          height="32px"
                          width="32px"
                        />
                      </div>
                      <v-card-title
                        style="max-width: 99px"
                        class="px-1 d-inline-block text-truncate"
                      >
                        {{ editItem.name }}
                      </v-card-title>
                    </v-card>
                  </template>

                  <!-- list -->
                  <v-list dense>
                    <v-list-item @click="(edit = !edit), (dialog = false)">
                      <v-list-item-title>사이트 정보 수정</v-list-item-title>
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list-item @click="siteDelete(editItem)">
                      <v-list-item-title>사이트 정보 삭제</v-list-item-title>
                    </v-list-item>
                  </v-list>

                  <!-- edit -->
                  <v-dialog v-model="edit" width="500px">
                    <v-card dark color="accent lighten-3">
                      <v-card-title class="accent lighten-2 and justify-center">
                        사이트 정보 수정
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
                                v-model="editItem.name"
                                label="사용자 지정 이름"
                                :error-messages="errors"
                                :success="valid"
                                readonly
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
                                v-model="editItem.url"
                                label="URL"
                                :error-messages="errors"
                                :success="valid"
                                readonly
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
                                v-model="editItem.id"
                                label="ID"
                                :error-messages="errors"
                                :success="valid"
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
                                v-model="editItem.pw"
                                label="Password"
                                :error-messages="errors"
                                :success="valid"
                                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                                :type="show ? 'text' : 'password'"
                                @click:append="show = !show"
                              >
                              </v-text-field>
                            </ValidationProvider>
                            <v-divider class="my-3"></v-divider>
                            <v-card-actions>
                              <v-btn
                                large
                                depressed
                                color="error"
                                @click="edit = false"
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
                                  editSite({
                                    name: editItem.name,
                                    URL: editItem.url,
                                    ID: editItem.id,
                                    PW: editItem.pw,
                                  }),
                                    (edit = false)
                                "
                                >등록</v-btn
                              >
                            </v-card-actions>
                          </form>
                        </ValidationObserver>
                      </v-card-text>
                    </v-card>
                  </v-dialog>
                </v-menu>
              </template>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-dialog>
    <!-- app Footer -->
    <v-footer color="secondary" dark padless>
      <v-btn
        v-for="link in links"
        :key="link"
        color="white"
        text
        rounded
        class="my-2"
        >{{ link }}</v-btn
      >
      <v-spacer />
      <strong class="mr-5">Copyright by checkIN service team</strong>
    </v-footer>
  </v-app>
</template>

<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { mapState, mapActions } from "vuex";
import Profile from "@/components/Profile";
import amqp from "amqplib/callback_api";
import store from "./store";

export default {
  components: {
    profile: Profile,
    ValidationProvider,
    ValidationObserver,
  },
  data: () => ({
    edit: false,
    dialog: false,
    logOut: "false",
    state: "signIn",
    group: "",
    drawer: false,
    links: ["About Us", "Team", "Contact Us"],
    maximized: false,
    name: "",
    URL: "",
    ID: "",
    PW: "",
    show: false,
  }),
  computed: {
    ...mapState(["userInfo"]),
  },
  watch: {
    logOut: () => {
      this.getState();
    },
  },
  methods: {
    ...mapActions(["signIn", "signOut", "updateSite", "editSite"]),
    resetForm() {
      (this.ID = ""), (this.PW = ""), (this.URL = ""), (this.name = "");
    },
    getState() {
      const url = "amqp://54.180.253.154:5672";
      const queueName = "msg_queue";

      amqp.connect(url, function(error, connect) {
        if (error) {
          console.log(error);
          return;
        }
        connect.createChannel(function(error, channel) {
          if (error) {
            console.log(error);
            return;
          }
          channel.assertQueue(queueName, { durable: true }, function(error) {
            let recevieMessage = function() {
              channel.get(queueName, {}, function(error, message) {
                if (error) {
                  console.log(error);
                } else if (message) {
                  console.log(message.content.toString());
                  channel.ack(message);
                  setTimeout(recevieMessage, 1000);
                } else {
                  this.logOut = "NO MESSAGE";
                  setTimeout(recevieMessage, 1000);
                }
              });
            };
            recevieMessage();
          });
        });
      });
    },
    window_close() {
      const remote = require("electron").remote;
      const currentWindow = remote.getCurrentWindow();
      currentWindow.close();
    },
    window_minimize() {
      const remote = require("electron").remote;
      const currentWindow = remote.getCurrentWindow();
      currentWindow.minimize();
    },
    change() {
      const remote = require("electron").remote;
      const currentWindow = remote.getCurrentWindow();
      if (this.maximized === false) {
        this.maximized = true;
        currentWindow.maximize();
      } else {
        this.maximized = false;
        currentWindow.unmaximize();
      }
    },
    siteDelete(editItem) {
      var id = editItem.id;
      var pw = editItem.pw;
      var url = editItem.url;
      var name = editItem.name;
      store.dispatch("deleteSite", { id, pw, url, name });
    },
  },
};
</script>

<style scoped>
#app {
  background-color: #202b43;
}
#myAccount {
  background-color: #202b43;
}
#header {
  -webkit-app-region: drag;
}
#systembar {
  -webkit-app-region: drag;
}
#minus {
  -webkit-app-region: no-drag;
}
#profile {
  -webkit-app-region: no-drag;
}
#search {
  -webkit-user-select: auto;
  -webkit-app-region: no-drag;
}
#box {
  -webkit-app-region: no-drag;
}
#close {
  -webkit-app-region: no-drag;
}
#minus:hover {
  background: grey;
  opacity: 0.7;
}
#box:hover {
  background: grey;
  opacity: 0.7;
}
#close:hover {
  background: red;
  opacity: 0.9;
}
</style>
