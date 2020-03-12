<template>
    <v-app id="inspire">
      <v-navigation-drawer v-model="drawer" app floating>
        <v-list dense>
          <v-list-item router :to="{ name: 'Home' }">
            <v-list-item-action>
              <v-icon>mdi-home</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Home</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item router :to="{ name: 'Login' }">
            <v-list-item-action>
              <v-icon>mdi-contact-mail</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>로그인</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-app-bar dark app color="#B71C1C">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
        <v-toolbar-title>Welcome to Check IN</v-toolbar-title>
        <div class="ma-3">
          <v-text-field
            outlined
            append-icon="mdi-search"
            label="Search"
          ></v-text-field>
        </div>
      </v-app-bar>

      <v-content>
        <router-view></router-view>
      </v-content>
      <v-footer color="#B71C1C" app>
        <span class="white--text">&copy; 2019</span>
      </v-footer>
    </v-app>
</template>

<script>
export default {
  props: {
    source: String
  },
  data: () => ({
    drawer: null
  })
};
</script>
