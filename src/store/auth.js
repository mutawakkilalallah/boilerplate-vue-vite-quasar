import { defineStore } from "pinia";
import { api } from "../plugins/api";
import router from "../router";
import { useGStore } from "./global";
const store = useGStore();

export const useAuthStore = defineStore("auth_store", {
  state: () => ({
    form: {
      username: "",
      password: "",
    },
    user: JSON.parse(localStorage.getItem("user")),
  }),
  actions: {
    async login() {
      store.loading = true;
      try {
        const resp = await api.post("/login", this.form);
        api.defaults.headers.common["x-auth"] = resp.data.token;
        localStorage.setItem("token", JSON.stringify(resp.data.token));
        localStorage.setItem("user", JSON.stringify(resp.data.data));
        this.user = resp.data.data;
        store.loading = false;
        router.replace("/");
        this.form.username = "";
        this.form.password = "";
      } catch (err) {
        store.loading = false;
        console.log(err);
      }
    },
    async logout() {
      localStorage.clear();
      router.push("/login");
    },
  },
});
