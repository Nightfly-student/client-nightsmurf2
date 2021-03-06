import axiosInstance from "axios";
import store from "../store";
import router from "../router";

const setup = () => {
  axiosInstance.interceptors.request.use(
    (config) => {
      if (config.url.includes("https")) return config;
      const token = JSON.parse(localStorage.getItem("token"));
      if (token && token.access_token) {
        config.headers["Authorization"] = "Bearer " + token.access_token;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      const originalConfig = err.config;
      if (originalConfig.url !== "/api/user/login" && err.response) {
        // Access Token was expired
        if (err.response.status === 403 && !originalConfig._retry) {
          originalConfig._retry = true;

          try {
            const rs = await axiosInstance.post("/api/refresh", {
              refreshToken: JSON.parse(localStorage.getItem("token"))
                .refresh_token,
            });
            localStorage.removeItem("token");
            localStorage.setItem("token", JSON.stringify(rs.data));
            store.commit("tokenSuccesful", rs.data);

            return axiosInstance(originalConfig);
          } catch (_error) {
            store.dispatch("logout");
            router.push("/");
            return Promise.reject(_error);
          }
        }
      }

      return Promise.reject(err);
    }
  );
};

export default setup;
