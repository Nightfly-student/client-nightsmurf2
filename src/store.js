import { createStore } from "vuex";
import axios from "axios";
import { authHeader } from "./helpers/authHeader";

const user = JSON.parse(localStorage.getItem("user"));
const token = JSON.parse(localStorage.getItem("token"));

const store = createStore({
  state() {
    return {
      user: user ? user : null,
      token: token ? token : null,
      isAuthenticated: user ? true : false,
      isAdmin: user ? user.isAdmin : false,
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
    tokenSuccesful(state, payload) {
      state.token = payload;
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
            localStorage.setItem("user", JSON.stringify(res.data.user));
            commit("loginSuccesful", res.data.user);
            localStorage.setItem("token", JSON.stringify(res.data.tokens));
            commit("tokenSuccesful", res.data.tokens);

            resolve();
          })
          .catch((error) => {
            reject(error.response.data.message);
          });
      });
    },
    logout({ commit }) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      commit("logout");
    },
  },
});

export default store;
