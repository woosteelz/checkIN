import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '@/router/index'
import { validate } from 'vee-validate';

Vue.use(Vuex)

const USER_INFO = () => { 
  return {
    agentID: null,
    agentPW: null,
    name: null,
    errorCount: null,
    numberOfDevice: null,
    JWT: null,
    siteInfo: [],
    flag: {
      isSignedIn: false,
      isSignedInError: false,
    }
  }
}

export default new Vuex.Store({
  state: {
    forSignUp: {
      agentID: null,
      confirmCode: null,
      name: null,
      agentPW: null,
      confirmPW: null,
      step: 1
    },
    userInfo: {
      agentID: null,
      agentPW: null,
      name: null,
      errorCount: null,
      numberOfDevice: null,
      JWT: null,
      siteInfo: [],
      flag: {
        isSignedIn: false,
        isSignedInError: false,
      }
    },
    isDuplicated: false,
    hasFormError: false,
    verifySuccess: false,
    codeMatchError: false,
    codeMatchSuccess: false
  },
  getters: {

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
    verifyEmailSuccess(state, agentID, verify_code) {
      state.forSignUp.agentID = agentID;
      state.forSignUp.verify_code = verify_code;
      state.verifySuccess = true;
      state.hasFormError = false;
      state.isDuplicated = false;
    },
    rejectConfirmCode(state) {
      state.codeMatchError = true;
    },
    confirmCode(state) {
      state.codeMatchError = false;
      state.codeMatchSuccess = true;
    },

    signUp(){

    },
    // Sigin In 성공
    signInSuccess(state, payload) {
      state.userInfo.flag.isSignedIn = true
      state.userInfo.flag.isSignedInError = false
      state.userInfo.agentID = payload.data.agentID
      state.userInfo.JWT = payload.data.jwt;
    },
    signInFail(state) {
      state.userInfo.flag.isSignedIn = false
      state.userInfo.flag.isSignedInError = true   
    },
    signOut(state) {
      state.userInfo = USER_INFO()
    }
  },
  actions: {

    verifyEmail ( { commit } , agentAccountDTO ) {
      if(!agentAccountDTO.agentID) {
        commit("hasFormError")
        return false
      }
      axios.post("https://54.180.153.254/checkIN/signUp/verifyEmail", agentAccountDTO)

        .then((res) => {
          res.data.result === true
          ? commit("verifyEmailSuccess")
          : commit("isDuplicated")
        })
        .catch((err) => {
          console.log(err);
        });
    },

    confirmCode ({ state, commit }, verify_code) {
      if(verify_code !== state.forSignUp.verify_code) {
        commit("rejectConfirmCode")
        return false
      }
      commit("ConfirmCode")
    },

    signUp( { state, commit }, agentAccountDTO ) {
      router.push({ name: 'SignIn' })
    },

    signIn( { state, commit }, loginObj) {
      if(!loginObj.agentID || !loginObj.agentPW) {
        alert("이메일 및 비밀번호를 확인하세욧!");
        return false
      }
      axios.post('https://54.180.153.254/checkIN/signIn', loginObj)

        .then((res) => {
          if(res.data.result === true){
            commit("signInSuccess", res)
            
            const loginData = { 
              agentID: state.userInfo.agentID,
              jwt: state.userInfo.JWT
            }
            // 로그인 후 사이트 정보 불러오기
            axios.post('https://54.180.153.254/checkIN/siteRead', loginData)
              .then((result) => {
                if(result.data.result === true){
                  for(var i = 0; i < result.data.list.length; i++){
                    state.userInfo.siteInfo[i] = result.data.list[i];
                    console.log(state.userInfo.siteInfo[i]);
                  }
                }
                else{
                  alert("사이트 정보 불러오기 실패!")
                }
            })

            router.push({ name: 'MainPage' })
          }
          else{
            commit("signInFail")
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    signOut( {state, commit} ) {

      const logoutData = { 
        agentID: state.userInfo.agentID,
        jwt: state.userInfo.JWT
      }

      axios.post("https://54.180.153.254/checkIN/signOut", logoutData)
      .then((res) => {
        res.data.result === true
        ? (commit("signOut") && $router.push({name: "SignIn"}))
        : alert("로그아웃 실패")
      })
    },

    addSite( { commit }, siteInfo ) {

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