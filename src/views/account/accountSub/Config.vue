<template>
  <v-container fill-height fulid>
    <v-row no-gutters>
      <v-col cols="10">
        <span class="white--text"><h3 class="mb-3">기타 설정</h3></span>
        <v-divider color="#607D8B" />
        <div class="justify-space-between">
          <v-row class="justify-space-between" no-gutters>
            <span class="white--text and d-flex align-center">
              <h5>OTP 사용</h5>
            </span>
            <v-switch dark dense v-model="use"></v-switch>
          </v-row>
        </div>
        <div class="justify-space-between">
          <v-row class="justify-space-between" no-gutters>
            <span class="white--text and d-flex align-center">
              <h5>브라우저 설정</h5>
            </span>
            
            <div class="justify-end"><v-select :items="items" label="Standard" dark></v-select></div>
          </v-row>
        </div>
        <v-divider color="#607D8B" />
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
export default {
  data() {
    return {
      use: true,
    };
  },
};
</script>