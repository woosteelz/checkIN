<template>
  <v-menu offset-y bottom left close-on-click>
    <template v-slot:activator="{ on }">
      <v-btn v-if="isSignedIn" tile dark icon v-on="on">
        <v-icon large color="blue lighten-2">mdi-account-circle</v-icon>
      </v-btn>

      <v-btn v-else disabled tile dark icon>
        <v-icon large color="blue lighten-2">mdi-account-circle</v-icon>
      </v-btn>
    </template>

    <v-list-item two-line>
      <v-list-item-avatar>
        <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" />
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title>
          <span class="mx-1">{{ userInfo }}</span>
        </v-list-item-title>
            
        <v-list-item-subtitle>
          <v-icon small class="my-2">mdi-settings-outline</v-icon>
          <span class="ma-1">프로필 편집</span>
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list-item-group
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
</template>

<script>
import { mapState, mapActions } from "vuex"
export default {
  
  computed: {
    ...mapState(["userInfo", "isSignedIn"])
  },
  methods: {
    ...mapActions(["signOut"])
  },
}
</script>
