<template>
  <v-container fill-height fulid>
    <v-row no-gutters>
      <v-col cols="10">
        <span class="white--text"><h3>등록기기 관리</h3></span>
        <br />
        <v-divider color="#607D8B" />
        <!-- 등록기기 관리 -->
        <div class="justify-space-between">
          <v-row class="justify-space-between" no-gutters>
            <span class="white--text and d-flex align-center">
              <h5>등록기기</h5>
            </span>
            <div class="">
              <v-dialog v-model="dialog" width="500">
                <template v-slot:activator="{ on }">
                  <div class="d-flex justify-end pt-5">
                    <v-btn small v-on="on" @click="readDevice()">
                      조회
                    </v-btn>
                  </div>
                </template>
                <v-card>
                  <v-card-title class="primary white--text">
                    등록기기 목록
                  </v-card-title>

                  <v-card-text>
                    <v-data-table
                      v-model="selected"
                      :headers="headers"
                      :items="enrollInfo"
                      :single-select="singleSelect"
                      item-key="deviceName"
                      show-select
                      class="elevation-1"
                    >
                      <template v-slot:top>
                        <v-switch
                          v-model="singleSelect"
                          label="Single select"
                          class="pa-3"
                        ></v-switch>
                      </template>
                    </v-data-table>
                  </v-card-text>

                  <v-divider></v-divider>

                  <v-card-actions>
                    <v-btn color="primary" text @click="dialog = false">
                      취소
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="otpEnable()">
                      설정 완료
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </div>
          </v-row>
        </div>
        <!-- OTP 사용 -->
        <div class="justify-space-between">
          <v-row class="justify-space-between" no-gutters>
            <span class="white--text and d-flex align-center">
              <h5>OTP 사용</h5>
            </span>
            <v-switch dark dense v-model="use" false-value="0" true-value="1" @change="otpEnable(use)"></v-switch>
          </v-row>
        </div>
        <!-- 브라우저 설정 -->
        <div class="justify-space-between">
          <v-row class="justify-space-between" no-gutters>
            <span class="white--text and d-flex align-center">
              <h5>브라우저 설정</h5>
            </span>
            <div class="justify-end">
              <v-select label="Standard" dark></v-select>
            </div>
          </v-row>
        </div>

        <v-divider class="mt-5" color="#607D8B" />

        <div class="d-flex justify-end pt-5">
          <v-btn small @click="$router.push({ name: 'NewPassword' })">
            submit
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      dialog: false,
      use: this.$store.state.userInfo.otpEnable,
      singleSelect: false,
      selected: [],
      headers: [
        {
          text: "등록 기기 명",
          align: "center",
          sortable: false,
          value: "deviceName",
        },
        { text: "등록 일시", align: "center", value: "enrollmentDate" },
        { text: "인증 여부", align: "center", value: "deviceEnable" },
      ],
      enrollInfo: []
    };
  },
  computed: {
    ...mapState(["userInfo"]),
    check_enrollInfo() {
      return this.enrollInfo = this.$store.state.userInfo.device
    }
  },
  methods: {
    ...mapActions(["readDevice", "otpEnable"]),
  },
  watch: {
    check_enrollInfo(newVal) {
      this.enrollInfo = newVal
    }
  },
};
</script>
