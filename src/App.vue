<template>
  <v-app> 

    <!-- 네비게이션 드로어 영역-->
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense class="py-0">
        <v-list-item two-line>
          <v-list-item-avatar>
            <img src="" />
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

    <div class="d-flex" id="header">
      <v-system-bar class="justify-space-between" app dark height="48" >
        <v-toolbar-title @click="$router.push({ name: 'Home'})" style="width:300px">
          <span class="ml-4"><strong>checkIN</strong></span>
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
        <div>
        <span id="profile" class="mr-4">
          <edit class="mx-4"/>
          <profile/>
        </span>
        <span>
          <v-btn id="minus" icon tile @click="window_minimize()">
          <v-icon small>mdi-minus</v-icon>
          </v-btn>
          <v-btn id="box" icon tile @click="change()">
            <v-icon v-if="maximized" small>mdi-checkbox-multiple-blank-outline</v-icon>
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
      <v-app-bar app dark max-height="48" color="primary" dense>

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
      <router-view/>
    </v-content>

    <!-- app Footer -->
    <v-footer
    color="secondary"
    dark
    padless
    >
      <v-btn
        v-for="link in links"
        :key="link"
        color="white"
        text
        rounded
        class="my-2"
      >
        {{ link }}
      </v-btn>
      <v-spacer/>
      <strong class="mr-5">Copyright by checkIN service team</strong>
  </v-footer>
  </v-app>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Profile from "@/components/Profile"
import Edit from "@/components/Edit"

export default {
  components: {
    "profile": Profile,
    "edit": Edit
  },
  data: () => ({
    group: "",
    drawer: false,
    items: [
      { title: "Click Me" },
      { title: "Click Me" },
      { title: "Click Me" },
      { title: "Click Me 2" }
    ],
    links: [
        'About Us',
        'Team',
        'Contact Us',
      ],
      maximized: false
  }),
  computed: {
    ...mapState(['userInfo'])
  },
  methods: {
    ...mapActions(["signIn, signOut"]),
    window_close() {
      const remote=require('electron').remote
      const currentWindow = remote.getCurrentWindow()
      currentWindow.close()
    },
    window_minimize() {
      const remote=require('electron').remote
      const currentWindow = remote.getCurrentWindow()
      currentWindow.minimize()
    },
    change() {
      const remote=require('electron').remote
      const currentWindow = remote.getCurrentWindow()
      if(this.maximized === false) {
        this.maximized = true
        currentWindow.maximize()
      }
      else{
        this.maximized = false
        currentWindow.unmaximize()
      }
    }
  },
};
</script>

<style scoped>
#app {
  background-color: #202B43;
}
#myAccount {
  background-color: #202B43;
}
#header {
  -webkit-app-region: drag;
}
#minus {
  -webkit-app-region: no-drag
}
#profile {
  -webkit-app-region: no-drag
}
#search {
  -webkit-user-select: auto;
  -webkit-app-region: no-drag;
}
#box {
  -webkit-app-region: no-drag
}
#close {
  -webkit-app-region: no-drag
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