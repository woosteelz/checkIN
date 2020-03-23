import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: null,
    JWT: null,
    isSignedIn: false,
    isSignedInError: false
  },
  mutations: {
    // Sigin In 성공
    signInSuccess(state, payload) {
      state.isSignedIn = true
      state.isSignedInError = false
      state.JWT = payload.headers["Authorization"]
    },
    signInFail(state) {
      state.isSignedIn = false
      state.isSignedInError = true   
    },
    signOut(state) {
      state.userInfo = null
      state.JWT = null
      state.isSignedIn = false
      state.isSignedInError = false
    }
  },
  actions: {
    signIn( { commit }, loginObj) {

      if(!loginObj.agentID || !loginObj.agentPW) {
        alert("이메일 및 비밀번호를 확인하세욧!");
        return false
      }
      axios.post("http://18.218.11.150:8080/checkIN/signIn", loginObj)

        .then((res) => {
          res.data.result === true
          ? (commit("signInSuccess", res))
          : commit("signInFail")
        })
        .catch((err) => {
          console.log(err);
        });
    },
    signOut( {commit} ) {

    }
  },
  modules: {
  }
})