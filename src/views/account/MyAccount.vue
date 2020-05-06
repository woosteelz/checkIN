<template>
  <v-container id="myAccount" fluid>
    <v-row>
      <v-col cols="3">
        <v-navigation-drawer dark absolute permanent color="#131C2E">
          <v-list>

            <!-- Home -->
            <v-list-item link>
              <v-list-item-content>
                <v-list-item-title @click="$router.push({ name: 'MainPage' })"
                  >Home</v-list-item-title
                >
              </v-list-item-content>
            </v-list-item>

            <!-- 프로필 수정  버튼 -->
            <v-list-item link>
              <v-list-item-content>
                <v-list-item-title
                  @click="$router.push({ name: 'EditProfile' })"
                  >프로필 수정</v-list-item-title
                >
              </v-list-item-content>
            </v-list-item>

            <!-- 비밀번호 변경 버튼 -->
            <v-list-item link>
              <v-list-item-content>
                <v-list-item-title
                  @click="$router.push({ name: 'ChangePassword' })"
                  >비밀번호 변경</v-list-item-title
                >
              </v-list-item-content>
            </v-list-item>

            <!-- 기타설정 버튼 -->
            <v-list-item link>
              <v-list-item-content>
                <v-list-item-title @click="$router.push({ name: 'Config' })"
                  >기타 설정</v-list-item-title
                >
              </v-list-item-content>
            </v-list-item>

            <!-- 회원탈퇴 버튼 -->
            <div class="">
              <v-dialog v-model="dialog" width="500">
                <template v-slot:activator="{ on }">
                  <v-list-item link>
                    <v-list-item-content>
                      <v-list-item-title v-on="on">회원탈퇴</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </template>
                <v-card>
                  <v-card-title class="red white--text" >
                    경고!
                  </v-card-title>

                  <v-card-text>
                    <strong>더이상 편리한 CheckIn 서비스를 이용하실 수 없게 됩니다. 그래도 하시겠습니까?</strong>
                  </v-card-text>

                  <v-divider></v-divider>

                  <v-card-actions>
                    <v-btn color="primary" text @click="dialog = false">
                      아니요 더 이용할래요
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="dialog = false">
                      네. 더 이용하고 싶지 않아요
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </div>

          </v-list>
        </v-navigation-drawer>
      </v-col>
      
      <v-col cols="9" align-self="start">
        <router-view />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      dialog: false
    };
  },
};
</script>
<style></style>
