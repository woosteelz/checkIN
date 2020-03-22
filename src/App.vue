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
<<<<<<< HEAD
    <v-app-bar max-height="48" dark dense>
      <v-app-bar-nav-icon @click="drawer = true" />

      <v-toolbar-title style="width:300px">
        <span>Title</span>
      </v-toolbar-title>
      <v-text-field
        flat
        rounded
        dense
        solo-inverted
        hide-details
        prepend-inner-icon="mdi-magnify"
        label="Search"
        class="hidden-sm-and-down"
      />
      <v-spacer />

      <v-btn icon tile color="red">
        <v-icon color="white">mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>

      
        <v-menu offset-y bottom left close-on-click>
          <template v-slot:activator="{ on }">
            <v-btn tile dark icon v-on="on">
              <v-icon large="" color="blue lighten-2"
                >mdi-account-circle</v-icon
              >
            </v-btn>
          </template>
        
          <v-list-item two-line>
            <v-list-item-avatar>
              <img src="" />
            </v-list-item-avatar>
    <v-app-bar height="50" color="deep-purple" dark dense>
      <v-app-bar-nav-icon @click="drawer = true"/>

            <v-list-item-content>
              <v-list-item-title><span class="mx-1">USERNAME</span></v-list-item-title>
              <v-list-item-subtitle>
                <v-icon small class="my-2">mdi-settings-outline</v-icon>
                <span class="ma-1">프로필 편집</span>
              </v-list-item-subtitle>
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

            <v-list-item @click="signOut">
              <v-list-item-icon>
                <v-icon>mdi-logout-variant</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Signout</v-list-item-title>
            </v-list-item>

          </v-list-item-group>
        </v-menu>
      
    </v-app-bar>

    <!-- 컨텐츠 탈부착 영역 -->
    <v-content>
      <router-view/>
    </v-content>

    <v-footer app/>
  </v-app>
</template>

<script>
import { mapActions} from 'vuex'

export default {
  data: () => ({
    group: "",
    drawer: false,
    items: [
      { title: "Click Me" },
      { title: "Click Me" },
      { title: "Click Me" },
      { title: "Click Me 2" }
    ]
  }),
  methods: {
    ...mapActions(['signOut'])
  }
};
</script>
