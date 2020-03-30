<template>
  <v-container fill-height>
    <v-row>
      <v-col cols="12">
        <v-col align="center" justify="center">
          <!-- connected 영역 -->
          <v-card color="accent lighten-2">
            <v-card-title class="color: green--text">Connected</v-card-title>
            <v-card-actions>
              <div class="ma-5">
                <v-card height="180">
                  <v-img src="https://www.naver.com/favicon.ico" />
                  <v-card-subtitle>
                    Naver
                  </v-card-subtitle>
                  <v-card-text>
                    content
                  </v-card-text>
                </v-card>
              </div>
            </v-card-actions>
          </v-card>
          <div class="pa-8">
            <v-divider color="red" />
          </div>

          <!-- disconnected 영역 -->
          <v-card color="accent lighten-2">
            <v-card-title class="color: red--text">Disonnected</v-card-title>
            <v-card-actions>
              <div class="ma-5">
                <v-card height="180">
                  <v-img src="https://www.google.com/favicon.ico" />
                  <v-card-subtitle>
                    Google
                  </v-card-subtitle>
                  <v-card-text>
                    content
                  </v-card-text>
                </v-card>
              </div>
              <div class="ma-5">
                <v-card height="180">
                  <v-img src="https://www.naver.com/favicon.ico" />
                  <v-card-subtitle>
                    Naver
                  </v-card-subtitle>
                  <v-card-text>
                    content
                  </v-card-text>
                </v-card>
              </div>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-col>
    </v-row>
    <v-row justify="end">
      <v-btn
        @click="$router.push({ name: AddSite })"
        small
        depressed
        fab
        dark
        color="success"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-row>
  </v-container>
</template>
