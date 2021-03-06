import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import router from "@/router/index";
import { validate } from "vee-validate";
import amqp from "amqplib/callback_api";
import CryptoJS from "crypto-js";

Vue.use(Vuex);

const url = "amqp://pushService:kfc0409@54.180.153.254:5672/pushHost";
const queueName = "msg_queue";

const USER_INFO = () => {
  return {
    forSignUp: {
      verify_code: null,
    },
    agentID: null,
    agentPW: null,
    name: null,
    errorCount: null,
    numberOfDevice: null,
    JWT: null,
    otpEnable: 0,
    siteInfo: [],
    device: [],
    flag: {
      isSignedIn: false,
      isSignedInError: false,
    },
    isDuplicated: false,
    hasFormError: false,
    verifySuccess: false,
    codeMatchError: false,
    codeMatchSuccess: false,
  };
};

export default new Vuex.Store({
  state: {
    forSignUp: {
      verify_code: null,
    },
    userInfo: {
      agentID: null,
      agentPW: null,
      name: null,
      errorCount: null,
      numberOfDevice: null,
      JWT: null,
      otpEnable: 0,
      siteInfo: [],
      device: [],
      flag: {
        isSignedIn: false,
        isSignedInError: false,
      },
    },
    isDuplicated: false,
    hasFormError: false,
    verifySuccess: false,
    codeMatchError: false,
    codeMatchSuccess: false,
  },
  getters: {},
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
    verifyEmailSuccess(state, payload) {
      state.forSignUp.verify_code = payload.verify_code;
      state.verifySuccess = true;
      state.hasFormError = false;
      state.isDuplicated = false;
    },
    confirmCode(state, payload) {
      if (state.forSignUp.verify_code != payload.confirmCode) {
        state.codeMatchError = true;
      } else {
        state.codeMatchError = false;
        state.codeMatchSuccess = true;
      }
    },

    signUp() { },
    // Sigin In 성공
    signInSuccess(state, payload, payload2) {
      state.userInfo.flag.isSignedIn = true;
      state.userInfo.flag.isSignedInError = false;
      state.userInfo.agentID = payload.data.agentID;
      state.userInfo.JWT = payload.data.jwt;
      state.userInfo.name = payload.data.name;
    },
    signInFail(state) {
      state.userInfo.flag.isSignedIn = false;
      state.userInfo.flag.isSignedInError = true;
    },
    signOut(state) {
      state.userInfo = USER_INFO();
    },
    addSite(state, payload) {
      state.userInfo.siteInfo.push(payload);
    },
  },
  actions: {
    verifyEmail({ commit }, agentAccountDTO) {
      if (!agentAccountDTO.agentID) {
        commit("hasFormError");
        return false;
      }
      axios
        .post(
          "https://54.180.153.254/checkIN/signUp/verifyEmail",
          agentAccountDTO
        )
        .then((res) => {
          let payload = {
            agentID: agentAccountDTO.agentID,
            verify_code: res.data.verify_code,
          };
          res.data.result === true
            ? commit("verifyEmailSuccess", payload)
            : commit("isDuplicated");
        })
        .catch((err) => {
          console.log(err);
        });
    },

    reVerifyEmail({ commit }, agentAccountDTO) {
      if (!agentAccountDTO.agentID) {
        commit("hasFormError");
        return false;
      }
      axios
        .post(
          "https://54.180.153.254/checkIN/signUp/verifyCode",
          agentAccountDTO
        )

        .then((res) => {
          res.data.result === true
            ? commit(
              "verifyEmailSuccess",
              agentAccountDTO.agentID,
              res.data.verify_code
            )
            : commit("isDuplicated");
        })
        .catch((err) => {
          console.log(err);
        });
    },

    changePassword({ state, commit }, changePasswordDTO) {
      if (changePasswordDTO.agentID !== changePasswordDTO.confirmPassword) {
        alert("다시 입력해주세요");
      }
      axios.post("URL", changePasswordDTO).then((res) => {
        if (res === true) {
          alert("비밀번호를 성공적으로 변경했습니다.");
        } else {
          alert("오류 발생! 다시 시도해주세요");
        }
      });
    },
    signUp({ state, commit }, signUpData) {
      commit("confirmCode", signUpData);
      const info = {
        agentID: signUpData.agentID,
        agentPW: CryptoJS.SHA256(signUpData.agentPW).toString(),
        name: signUpData.name,
      };
      if (state.codeMatchError == false) {
        axios
          .post("https://54.180.153.254/checkIN/signUp/signAccount", info)

          .then((res) => {
            res.data.result === true
              ? commit("verifyEmailSuccess")
              : commit("isDuplicated");
          })
          .catch((err) => {
            console.log(err);
          });
        router.push({ name: "SignIn" });
      }
    },
    reVerifyEmail({ commit }, agentAccountDTO) {
      if (!agentAccountDTO.agentID) {
        commit("hasFormError");
        return false;
      }
      axios
        .post(
          "https://54.180.153.254/checkIN/signUp/verifyCode",
          agentAccountDTO
        )

        .then((res) => {
          res.data.result === true
            ? commit("verifyEmailSuccess")
            : commit("isDuplicated");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    changePassword({ state, commit }, changePasswordDTO) {
      if (changePasswordDTO.agentID !== changePasswordDTO.confirmPassword) {
        alert("다시 입력해주세요");
      }
      axios.post("URL", changePasswordDTO).then((res) => {
        if (res === true) {
          alert("비밀번호를 성공적으로 변경했습니다.");
        } else {
          alert("오류 발생! 다시 시도해주세요");
        }
      });
    },
    signIn({ state, commit, dispatch }, loginObj) {
      if (!loginObj.agentID || !loginObj.agentPW) {
        commit("signInFail");
        return;
      }
      const info = {
        agentID: loginObj.agentID,
        agentPW: CryptoJS.SHA256(loginObj.agentPW).toString(),
      };
      axios
        .post("https://54.180.153.254/checkIN/signIn", info)

        .then((res) => {
          if (res.data.result === true) {
            if (res.data.otpEnable === 0) {
              state.userInfo.agentPW = loginObj.agentPW;
              commit("signInSuccess", res);

              const loginData = {
                agentID: state.userInfo.agentID,
                jwt: state.userInfo.JWT,
              };

              // 로그인 후 사이트 정보 불러오기
              axios
                .post("https://54.180.153.254/checkIN/siteRead", loginData)
                .then((result) => {
                  if (result.data.result === true) {
                    state.userInfo.siteInfo = result.data.list;
                    console.log(result.data.list);
                  } else {
                    alert("사이트 정보 불러오기 실패!");
                  }
                  var args = process.argv.slice(2);
                  if (args.length == 0) {
                    console.log(
                      "Usage: receive_logs_direct.js [info] [warning] [error]"
                    );
                    process.exit(1);
                  }
                  amqp.connect(url, function (error, connect) {
                    if (error) {
                      console.log(error);
                      return;
                    }
                    connect.createChannel(function (error, channel) {
                      if (error) {
                        console.log(error);
                        return;
                      }
                      var exchange = "amq.direct";

                      channel.bindQueue(
                        queueName,
                        exchange,
                        state.userInfo.agentID
                      );
                      channel.assertQueue(
                        queueName,
                        { durable: false, autoDelete: true },
                        function (error) {
                          let recevieMessage = function () {
                            channel.get(queueName, {}, function (
                              error,
                              message
                            ) {
                              if (error) {
                                console.log(error);
                              } else if (message) {
                                console.log(message.content.toString());
                                if (
                                  message.content.toString() ==
                                  "remote sign out"
                                ) {
                                  dispatch("signOut", state);
                                  channel.ack(message);
                                  console.log("[info] Message dequeued");
                                  console.log("[info] Connection terminated");
                                  return;
                                }
                                setTimeout(recevieMessage, 1000);
                              } else {
                                console.log("Connected!");
                                if (state.userInfo.flag.isSignedIn == false) {
                                  console.log("[info] Connection terminated");
                                  return;
                                }
                                setTimeout(recevieMessage, 1000);
                              }
                            });
                          };
                          recevieMessage();
                        }
                      );
                    });
                  });
                  router.push({ name: "MainPage" });
                });
            } else {
              state.userInfo.agentID = res.data.agentID;
              state.userInfo.agentPW = loginObj.agentPW;
              router.push({ name: "OTP" });
            }
          } else {
            commit("signInFail");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    OTP({ state, commit, dispatch }, otp) {
      const verify_code = otp;
      axios
        .post("https://54.180.153.254/checkIN/verifyOTP", {
          agentID: state.userInfo.agentID,
          verify_code: otp,
        })
        .then((res) => {
          if (res.data.result === true) {
            commit("signInSuccess", res);

            const loginData = {
              agentID: state.userInfo.agentID,
              jwt: state.userInfo.JWT,
            };

            axios
              .post("https://54.180.153.254/checkIN/siteRead", loginData)
              .then((result) => {
                if (result.data.result === true) {
                  state.userInfo.siteInfo = result.data.list;
                  console.log(result.data.list);
                } else {
                  alert("사이트 정보 불러오기 실패!");
                }
                var args = process.argv.slice(2);
                if (args.length == 0) {
                  console.log(
                    "Usage: receive_logs_direct.js [info] [warning] [error]"
                  );
                  process.exit(1);
                }
                amqp.connect(url, function (error, connect) {
                  if (error) {
                    console.log(error);
                    return;
                  }
                  connect.createChannel(function (error, channel) {
                    if (error) {
                      console.log(error);
                      return;
                    }
                    var exchange = "amq.direct";

                    channel.bindQueue(
                      queueName,
                      exchange,
                      state.userInfo.agentID
                    );
                    channel.assertQueue(
                      queueName,
                      { durable: false, autoDelete: true },
                      function (error) {
                        let recevieMessage = function () {
                          channel.get(queueName, {}, function (error, message) {
                            if (error) {
                              console.log(error);
                            } else if (message) {
                              console.log(message.content.toString());
                              if (
                                message.content.toString() == "remote sign out"
                              ) {
                                dispatch("signOut", state);
                                channel.ack(message);
                                console.log("[info] Message dequeued");
                                console.log("[info] Connection terminated");
                                return;
                              }
                              setTimeout(recevieMessage, 1000);
                            } else {
                              console.log("Connected!");
                              if (state.userInfo.flag.isSignedIn == false) {
                                console.log("[info] Connection terminated");
                                return;
                              }
                              setTimeout(recevieMessage, 1000);
                            }
                          });
                        };
                        recevieMessage();
                      }
                    );
                  });
                });
                router.push({ name: "MainPage" });
              });
          } else {
            alert("OTP가 일치하지 않습니다.");
          }
        });
    },

    OTL({ state, commit }, otl) {
      const verify_code = otl;

      axios
        .post("https://54.180.153.254/checkIN/loginNumber/verify", {
          verify_code,
        })
        .then((res) => {
          if (res.data.result === true) {
            commit("signInSuccess", res);

            const loginData = {
              agentID: state.userInfo.agentID,
              jwt: state.userInfo.JWT,
            };

            axios
              .post("https://54.180.153.254/checkIN/siteRead", loginData)
              .then((result) => {
                if (result.data.result === true) {
                  state.userInfo.siteInfo = result.data.list;
                  console.log(result.data.list);
                } else {
                  alert("사이트 정보 불러오기 실패!");
                }
                var args = process.argv.slice(2);
                if (args.length == 0) {
                  console.log(
                    "Usage: receive_logs_direct.js [info] [warning] [error]"
                  );
                  process.exit(1);
                }
                amqp.connect(url, function (error, connect) {
                  if (error) {
                    console.log(error);
                    return;
                  }
                  connect.createChannel(function (error, channel) {
                    if (error) {
                      console.log(error);
                      return;
                    }
                    var exchange = "amq.direct";

                    channel.bindQueue(
                      queueName,
                      exchange,
                      state.userInfo.agentID
                    );
                    channel.assertQueue(
                      queueName,
                      { durable: false, autoDelete: true },
                      function (error) {
                        let recevieMessage = function () {
                          channel.get(queueName, {}, function (error, message) {
                            if (error) {
                              console.log(error);
                            } else if (message) {
                              console.log(message.content.toString());
                              if (
                                message.content.toString() == "remote sign out"
                              ) {
                                dispatch("signOut", state);
                                channel.ack(message);
                                console.log("[info] Message dequeued");
                                console.log("[info] Connection terminated");
                                return;
                              }
                              setTimeout(recevieMessage, 1000);
                            } else {
                              console.log("Connected!");
                              if (state.userInfo.flag.isSignedIn == false) {
                                console.log("[info] Connection terminated");
                                return;
                              }
                              setTimeout(recevieMessage, 1000);
                            }
                          });
                        };
                        recevieMessage();
                      }
                    );
                  });
                });
                router.push({ name: "MainPage" });
              });
          } else {
            alert("번호를 다시 확인해 주세요.");
          }
        });
    },

    signOut({ state, commit }) {
      const logoutData = {
        agentID: state.userInfo.agentID,
        jwt: state.userInfo.JWT,
      };

      axios
        .post("https://54.180.153.254/checkIN/signOut", logoutData)
        .then((res) => {
          res.data.result === true
            ? commit("signOut") && $router.push({ name: "SignIn" })
            : alert("로그아웃 실패");
        });
      router.push({ name: "SignIn" });
    },

    addSite({ state }, siteInfo) {
      var key = state.userInfo.agentPW;
      const info = {
        agentID: state.userInfo.agentID,
        jwt: state.userInfo.JWT,
        id: siteInfo.ID,
        pw: CryptoJS.AES.encrypt(siteInfo.PW, key).toString(),
        url: siteInfo.URL,
        name: siteInfo.name,
      };
      const loginData = {
        agentID: state.userInfo.agentID,
        jwt: state.userInfo.JWT,
      };
      axios.post("https://54.180.153.254/checkIN/siteAdd", info).then((res) => {
        if (res.data.result === true) {
          // 로그인 후 사이트 정보 불러오기
          axios
            .post("https://54.180.153.254/checkIN/siteRead", loginData)
            .then((result) => {
              if (result.data.result === true) {
                state.userInfo.siteInfo = result.data.list;
                console.log(result.data.list);
              } else {
                alert("사이트 정보 불러오기 실패!");
              }
            });
        } else {
          alert("사이트 등록 실패");
        }
      });
    },
    editSite({ state }, siteInfo) {
      var key = state.userInfo.agentPW;
      const info = {
        agentID: state.userInfo.agentID,
        jwt: state.userInfo.JWT,
        id: siteInfo.ID,
        pw: CryptoJS.AES.encrypt(siteInfo.PW, key).toString(),
        url: siteInfo.URL,
        name: siteInfo.name,
      };
      const loginData = {
        agentID: state.userInfo.agentID,
        jwt: state.userInfo.JWT,
      };
      axios
        .post("https://54.180.153.254/checkIN/siteEdit", info)
        .then((result) => {
          if (result.data.result === true) {
            axios
              .post("https://54.180.153.254/checkIN/siteRead", loginData)
              .then((res) => {
                if (res.data.result === true) {
                  state.userInfo.siteInfo = res.data.list;
                  console.log(res.data.list);
                } else {
                  alert("사이트 정보 불러오기 실패!");
                }
              });
          } else {
            alert("사이트 수정 실패!");
          }
        });
    },

    deleteSite({ state }, siteInfo) {
      const info = {
        agentID: state.userInfo.agentID,
        jwt: state.userInfo.JWT,
        id: siteInfo.id,
        pw: siteInfo.pw,
        url: siteInfo.url,
        name: siteInfo.name,
      };
      const loginData = {
        agentID: state.userInfo.agentID,
        jwt: state.userInfo.JWT,
      };

      axios
        .post("https://54.180.153.254/checkIN/siteDelete", info)
        .then((res) => {
          if (res.data.result === true) {
            // 로그인 후 사이트 정보 불러오기
            axios
              .post("https://54.180.153.254/checkIN/siteRead", loginData)
              .then((result) => {
                if (result.data.result === true) {
                  state.userInfo.siteInfo = result.data.list;
                  console.log(result.data.list);
                } else {
                  alert("사이트 정보 불러오기 실패!");
                }
              });
          } else {
            alert("사이트 삭제 실패");
          }
        });
    },
    changeName({ state }, name) {
      const data = {
        agentID: state.userInfo.agentID,
        jwt: state.userInfo.JWT,
        accountName: name,
      };
      axios
        .post("https://54.180.153.254/checkIN/update/accountName", data)
        .then((res) => {
          if (res.data.result === true) {
            state.userInfo.name = name;
          } else {
            alert("이름 변경 실패!");
          }
        });
    },
    readDevice({ state }) {
      const loginData = {
        agentID: state.userInfo.agentID,
        jwt: state.userInfo.JWT,
      };
      axios
        .post("https://54.180.153.254/checkIN/deviceRead", loginData)
        .then((result) => {
          state.userInfo.device = result.data;
          console.log(result.data);
        });
    },
    otpEnable({ state }, otpEnable) {
      const data = {
        agentID: state.userInfo.agentID,
        jwt: state.userInfo.JWT,
        otpEnable,
      };
      axios
        .post("https://54.180.153.254/checkIN//update/otpEnable", data)
        .then((result) => {
          state.userInfo.device = result.data.list;
          console.log(result.data.list);
        });
    },
    deviceEnable({ state }, deviceID, deviceEnable) {
      const data = {
        agentID: state.userInfo.agentID,
        jwt: state.userInfo.JWT,
        deviceID,
        deviceEnable,
      };
      axios
        .post("https://54.180.153.254/checkIN//update/deviceEnable", data)
        .then((result) => { });
    },
  },
  modules: {},
});
