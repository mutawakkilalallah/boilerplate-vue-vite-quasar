import axios from "axios";
import { Notify } from "quasar";
import router from "../router";
// import { useAuthStore } from "../store/auth";

let base;

if (process.env.NODE_ENV === "production") {
  base = "http://localhost:3008/api/v1";
} else {
  base = "http://localhost:3008/api/v1";
}

const api = axios.create({ baseURL: base });
api.defaults.headers.get.Accept = "applications/json";
api.defaults.headers.common["x-auth"] = JSON.parse(
  localStorage.getItem("token")
);

const removeToken = () => {
  localStorage.clear();
  router.replace("/search");
};

const interceptResErrors = async (err) => {
  if (err.status == 401 && router.currentRoute.value.path != "/login") {
    removeToken();
  } else {
    var errStat = err.response.data.status ?? err.status ?? 500;
    var errMsg = err.response.data.message ?? err.code ?? "ERR_NETWORK";
    var errData = err.response.data.error ?? err.message ?? "Network Error";
    Notify.create({
      message: `${errStat} | ${errMsg}`,
      caption: errData,
      color: "red",
      icon: "fas fa-exclamation-circle",
      progress: true,
      multiLine: true,
    });
  }
  return Promise.reject(err);
};

const interceptResponse = (res) => {
  var respStat = res.data.status ?? res.status ?? 200;
  var respMsg = res.data.message ?? res.statusText ?? "OK";

  let capt = "";
  if (res.status == 204) {
    capt = "menghapus";
  } else if (res.status == 201) {
    capt = "menambahkan";
  } else {
    capt = "mengubah";
  }

  if (
    res.config.method != "get" &&
    router.currentRoute.value.path != "/login"
  ) {
    Notify.create({
      message: `${respStat} | ${respMsg}`,
      caption: `Berhasil ${capt} data`,
      color: "green",
      icon: "fas fa-check",
      progress: true,
      multiLine: true,
    });
  }
  return Promise.resolve(res);
};
api.interceptors.response.use(interceptResponse, interceptResErrors);

const interceptReqErrors = (err) => Promise.reject(err);
const interceptRequest = (config) => {
  return config;
};
api.interceptors.request.use(interceptRequest, interceptReqErrors);

export default ({ app }) => {
  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$api = api;
};

export { axios, api };
