<template>
  <v-container id="myAccount" fluid>
    <v-row>
      <v-col cols="3">
        <v-navigation-drawer expand-on-hover mini-variant-width="140" dark absolute permanent color="#131C2E">
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

            <!-- 등록기기 관리 -->
            <v-list-item link>
              <v-list-item-content>
                <v-list-item-title @click="$router.push({ name: 'Config' })"
                  >등록기기 관리</v-list-item-title
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
                  <v-card-title class="red white--text pt-3">
                    경고!
                  </v-card-title>

                  <v-card-text class="py-5">
                    <strong
                      >더 이상 CheckIn 서비스를 이용할 수 없게됩니다.
                      <pre />
                      정말 탈퇴하시겠습니까?</strong
                    >
                  </v-card-text>

                  <v-divider></v-divider>

                  <v-card-actions>
                    <v-btn color="red" text @click="dialog = false">
                      취소
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="green" text @click="dialog = false">
                      동의
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
      dialog: false,
    };
  },
};
</script>
<style></style>
