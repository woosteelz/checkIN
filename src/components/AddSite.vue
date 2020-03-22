<template>
  <v-card>
    <v-card-title primary-title>
      새 사이트 등록
    </v-card-title>
    <v-card-text>
      <v-text-field
        ref="name"
        v-model="name"
        :rules="[() => !!name || 'This field is required']"
        :error-messages="errorMessages"
        label="사용자 지정 이름"
        placeholder="사이트의 이름을 입력해주세요."
        required
      />
      <v-text-field
        ref="URL"
        v-model="URL"
        :rules="[
          () => !!address || 'This field is required',
          () => !!address && address.length <= 25 || 'Address must be less than 25 characters',
          addressCheck
        ]"
        label="URL"
        placeholder="사이트의 로그인 양식이 있는 URL을 입력해주세요."
        counter="25"
        required
      />
      <v-text-field
        ref="ID"
        v-model="ID"
        :rules="[() => !!city || 'This field is required', addressCheck]"
        label="아이디"
        placeholder="해당 사이트에 로그인하기 위한 아이디를 입력해주세요."
        required
      />
      <v-text-field
        ref="password"
        v-model="password"
        :rules="[() => !!state || 'This field is required']"
        label="State/Province/Region"
        required
        placeholder="해당 사이트에 로그인하기 위한 비밀번호를 입력해주세요."
      />
      <v-divider class="mt-12"></v-divider>
      <v-card-actions>
          <v-btn text>취소</v-btn>
          <v-spacer></v-spacer>
          <v-slide-x-reverse-transition>
            <v-tooltip
              v-if="formHasErrors"
              left
            >
              <template v-slot:activator="{ on }">
                <v-btn
                  icon
                  class="my-0"
                  @click="resetForm"
                  v-on="on"
                >
                  <v-icon>mdi-refresh</v-icon>
                </v-btn>
              </template>
              <span>Refresh form</span>
            </v-tooltip>
          </v-slide-x-reverse-transition>
          <v-btn color="primary" text @click="submit">등록</v-btn>
        </v-card-actions>
  </v-card-text>
</template>
<script>
export default {
  data() {
    return {
      name: '',
      URL: '',
      ID: '',
      password: ''
    }
  },
}
</script>

<style>

</style>