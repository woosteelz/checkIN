import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { validate } from 'vee-validate';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: {
      agentID: null,
      agentPW: null,
      name: null,
      errorCount: null,
      numberOfDevice: null,
      JWT: null,
      siteInfo: [
        {
          name: "Google1111",
          URL: "https://www.google.com",
          ID: "",
          PW: ""
        }
      ],
      flag: {
        isSignedIn: false,
        isSignedInError: false,
      }
    },
    isDuplicated: false,
    hasFormError: false
  },
  mutations: {
    init(state) {
      state.hasFormError = false;
      state.isDuplicated = false;
    },
    hasFormError(state) {
      state.hasFormError = true;
      state.isDuplicated = false;
    },
    isDuplicated(state) {
      state.isDuplicated = true;
      state.hasFormError = false;
    },
    verifyEmailSuccess(state) {
      state.hasFormError = false;
      state.isDuplicated = false;
    },
    signUp(){

    },
    // Sigin In 성공
    signInSuccess(state, payload) {
      state.userInfo.flag.isSignedIn = true
      state.userInfo.flag.isSignedInError = false
      state.userInfo.agentID = payload.data.agentID
      state.userInfo.JWT = payload.data.jwtString;
    },
    signInFail(state) {
      state.userInfo.flag.isSignedIn = false
      state.userInfo.flag.isSignedInError = true   
    },
    signOut(state) {
      state.userInfo = null
      state.userInfo.JWT = null
      state.userInfo.flag.isSignedIn = false
      state.userInfo.flag.isSignedInError = false
    }
  },
  actions: {
    verifyEmail ( { commit } , agentAccountDTO ) {
      if(validate(agentAccountDTO.agentID, "email")) {
        commit("hasFormError")
        return false
      }
      axios.post("http://18.218.11.150:8080/checkIN/signUp/verifyEmail", agentAccountDTO)

        .then((res) => {
          res.data.result === true
          ? commit("verifyEmailSuccess")
          : commit("isDuplicated")
        })
        .catch((err) => {
          console.log(err);
        });
    },
    signUp( {commit}, signUpObj ) {

    },
    signIn( { commit }, loginObj) {
      if(!loginObj.agentID || !loginObj.agentPW) {
        alert("이메일 및 비밀번호를 확인하세욧!");
        return false
      }
      axios.post('http://18.218.11.150:8080/checkIN/signIn', loginObj)

        .then((res) => {
          res.data.result === true
          ? (commit("signInSuccess", res))
          : commit("signInFail")
        })
        .catch((err) => {
          console.log(err);
        });
    },
    signOut( {state, commit} ) {
      let config = {
        headers: {
          "Authorizatio": state.userInfo.JWT
        }
      }
      axios.post("http://18.218.11.150:8080/checkIN/signOut", state.userInfo.agentID)
      .then((res) => {
        res.data.result === true
        ? (commit("signOut"), $router.push({name: "SignIn"}))
        : alert("로그아웃 실패")
      })
    },
    addSite( { commit }, siteInfo ) {
      let config = {
        headers: {
          "Authorization": state.JWT
        }
      }
      axios.post("http://18.218.11.150:8080/checkIN/signOut", state.userInfo.agentID)
      .then((res) => {
        res.data.result === true
        ? (commit("signOut"))
        : alert("로그아웃 실패")
      })
    }
  },
  modules: {
  }
})