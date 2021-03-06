import { createStore } from "vuex";
import router from "./router/index";
import axios from "axios";

const user = JSON.parse(localStorage.getItem("user"));
const token = JSON.parse(localStorage.getItem("token"));
const affiliate = JSON.parse(localStorage.getItem("affiliate"));

const store = createStore({
  state() {
    return {
      user: user ? user : null,
      token: token ? token : null,
      isAuthenticated: user ? true : false,
      isAdmin: user ? user.isAdmin : false,
      isMod: user ? user.isMod : false,
      isAffiliate: user ? user.isAffiliate : false,
      isRedirected: affiliate ? affiliate : null,
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
    isMod(state) {
      return state.isMod;
    },
    isAffiliate(state) {
      return state.isAffiliate;
    },
  },
  mutations: {
    loginSuccesful(state, payload) {
      state.user = payload;
      state.isAuthenticated = true;
      state.isAdmin = payload.isAdmin;
      state.isMod = payload.isMod;
      state.isAffiliate = payload.isAffiliate;
    },
    tokenSuccesful(state, payload) {
      state.token = payload;
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isAdmin = false;
      state.isMod = false;
      state.isAffiliate = false;
    },
    affiliateAdd(state, payload) {
      state.isRedirected = payload;
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
      return new Promise((resolve, reject) => {
        axios
          .post("/api/users/logout", {
            token: JSON.parse(localStorage.getItem("token")).refresh_token,
          })
          .then(() => {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            commit("logout");
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    affiliate({ commit }, { affiliate }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/api/affiliates/r/${affiliate}`)
          .then((res) => {
            localStorage.setItem("affiliate", JSON.stringify(res.data));
            commit("affiliateAdd", res.data);
            resolve();
            router.push("/");
          })
          .catch((err) => {
            reject();
          });
      });
    },
    affiliateCoupon({ commit }, { coupon }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/api/affiliates/coupon/${coupon}`)
          .then((res) => {
            localStorage.setItem("affiliate", JSON.stringify(res.data));
            commit("affiliateAdd", res.data);
            resolve();
          })
          .catch((err) => {
            reject();
          });
      });
    },
  },
});

export default store;
