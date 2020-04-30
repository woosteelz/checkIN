<template>
  <v-container id="myAccount" fluid>
    <v-row>
      <v-col cols="3">
        <v-navigation-drawer dark absolute permanent color="#131C2E"> 
          <v-list>
            <v-list-item link>
              <v-list-item-content>
                <v-list-item-title @click="$router.push({ name: 'MainPage' })">Home</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item link>
              <v-list-item-content>
                <v-list-item-title @click="$router.push({ name: 'EditProfile' })">프로필 수정</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item link>
              <v-list-item-content>
                <v-list-item-title @click="$router.push({ name: 'ChangePassword' })">비밀번호 변경</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item link>
              <v-list-item-content>
                <v-list-item-title @click="$router.push({ name: 'Config' })">기타 설정</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item link>
              <v-list-item-content>
                <v-list-item-title @click="$router.push({ name: 'Config' })">회원탈퇴</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
      </v-col>
      <v-col cols="9" align-self="start">  
        <router-view/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { title: "Home", icon: "mdi-home-city" },
        { title: "My Account", icon: "mdi-account" },
        { title: "Users", icon: "mdi-account-group-outline" },
      ],
    };
  },
};
</script>
<style>
</style>
