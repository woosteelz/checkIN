<template>
  <v-container fill-height fulid>
    <v-row no-gutters>
      <v-col cols="10">
        
        <span class="white--text"><h3 class="mb-3">기타 설정</h3></span>
        <v-divider color="#607D8B"/>
        <div class="justify-space-between">
          <v-row class="justify-space-between" no-gutters>
            <span class="white--text and d-flex align-center">
              <h5>OTP 사용</h5>
            </span>
            <v-switch
              dark
              dense
              v-model="use"
            ></v-switch>
          </v-row>
          <v-divider color="#607D8B"/>
          <v-row class="justify-space-between" no-gutters>
            <span class="white--text and d-flex align-center">
              <h5>OTP 사용</h5>
            </span>
            <v-switch
              dark
              dense
              v-model="use"
            ></v-switch>
          </v-row>
          <v-divider color="#607D8B"/>
          <v-row class="justify-space-between" no-gutters>
            <span class="white--text and d-flex align-center">
              <h5>OTP 사용</h5>
            </span>
            <v-switch
              dark
              dense
              v-model="use"
            ></v-switch>
          </v-row>
          <v-divider color="#607D8B"/>
          <v-row class="justify-space-between" no-gutters>
            <span class="white--text and d-flex align-center">
              <h5>OTP 사용</h5>
            </span>
            <v-switch
              dark
              dense
              v-model="use"
            ></v-switch>
          </v-row>
          <v-divider color="#607D8B"/>
          <v-row class="justify-space-between" no-gutters>
            <span class="white--text and d-flex align-center">
              <h5>OTP 사용</h5>
            </span>
            <v-switch
              dark
              dense
              v-model="use"
            ></v-switch>
          </v-row>
          <v-divider color="#607D8B"/>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      use: true
    }
  },
}
</script>

<style>

</style>