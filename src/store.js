import { createStore } from "vuex";
import axios from "axios";

const store = createStore({
  state() {
    return {
      user: null,
      isAuthenticated: false,
    };
  },
  getters: {
    isLogged(state) {
      return state.isAuthenticated;
    },
    getId(state) {
      return state.user._id;
    },
  },
  mutations: {
    loginSuccesful(state, payload) {
      state.user = payload;
      state.isAuthenticated = true;
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  actions: {
    login({ commit }, { email, password }) {
      return new Promise((resolve, reject) => {
        axios
          .post("/api/users/login", {
            email: email,
            password: password,
          })
          .then((res) => {
            localStorage.setItem("user", JSON.stringify(res.data));
            commit("loginSuccesful", res.data);
            resolve();
          })
          .catch((error) => {
            reject(error.response.data.message);
          });
      });
    },
    logout({ commit }) {
      localStorage.removeItem("user");
      commit("logout");
    },
    autoLogin({ commit }) {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        commit("loginSuccesful", user);
      }
    },
  },
});

export default store;
