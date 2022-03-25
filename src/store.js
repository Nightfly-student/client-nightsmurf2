import { createStore } from "vuex";
import axios from "axios";
import { authHeader } from "./helpers/authHeader";

const store = createStore({
  state() {
    return {
      user: null,
      isAuthenticated: false,
      isAdmin: false,
    };
  },
  getters: {
    isLogged(state) {
      return state.isAuthenticated;
    },
    getId(state) {
      return state.user._id;
    },
    isAdmin(state) {
      return state.isAdmin;
    },
  },
  mutations: {
    loginSuccesful(state, payload) {
      state.user = payload;
      state.isAuthenticated = true;
      state.isAdmin = payload.isAdmin;
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.isAdmin = false;
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
        axios
          .get("/api/users/autologin", {
            headers: authHeader(),
          })
          .then((res) => {
            commit("loginSuccesful", user);
          })
          .catch((err) => {
            localStorage.removeItem("user");
            commit("logout");
          });
      }
    },
  },
});

export default store;
