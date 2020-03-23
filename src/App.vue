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
            <v-list-item-title>USERNAME</v-list-item-title>
            <v-list-item-subtitle>userEmail</v-list-item-subtitle>
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

    <!-- app 바 영역 -->
    <v-app-bar dark max-height="48" color="primary" dense>

      <!-- 메뉴열기 -->
      <v-app-bar-nav-icon @click="drawer = true" />

      <v-toolbar-title style="width:300px">
        <span class=""><strong>checkIN</strong></span>
      </v-toolbar-title>

      <!-- 검색창 -->
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
      <v-spacer />

      <!-- 상단 우측 아이콘 -->
      <v-btn icon tile color="red">
        <v-icon color="white">mdi-heart</v-icon>
      </v-btn>

      <edit/>
      <profile/>

    </v-app-bar>

    <!-- 컨텐츠 탈부착 영역 -->
    <v-content>
      <router-view/>
    </v-content>


    <v-footer
    color="secondary"
    dark
    padless
  >
    <v-row
      justify="center"
      no-gutters
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
      <v-col
        class="primary py-4 text-center white--text"
        cols="12"
      >
        <strong>Copyright by checkIN service team</strong>
      </v-col>
    </v-row>
  </v-footer>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";
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
  }),
  methods: {
    ...mapActions(["signIn, signOut"])
  },
};
</script>

<style scoped>
#app {
  background-color: #202B43;
}
</style>