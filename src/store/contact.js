import { defineStore } from "pinia";
import { api } from "../plugins/api";
import { useGStore } from "./global";
const store = useGStore();

export const useContactStore = defineStore("contact_store", {
  state: () => ({
    isOpen: false,
    isEdit: false,
    items: [],
    meta: {
      x_total_page: 0,
      x_total_data: 0,
      x_current_page: 1,
      x_page_limit: 25,
    },
    params: {
      cari: "",
      keterangan: "",
      page: 1,
      limit: 25,
    },
    form: {
      nama_lengkap: "",
      keterangan: "",
    },
    idEdit: null,
    limitOpt: ["25", "50", "100", "250", "500", "1000"],
    keteranganOpt: [
      { label: "Valid", value: "valid" },
      { label: "Tidak Valid", value: "tidak-valid" },
    ],
  }),

  actions: {
    resetForm() {
      this.idEdit = null;
      this.form.nama_lengkap = "";
      this.form.keterangan = "";
      this.isEdit = false;
    },
    setOpenAdd() {
      this.resetForm();
      this.isOpen = !this.isOpen;
    },
    setOpenEdit(d) {
      this.form.nama_lengkap = d.nama_lengkap;
      this.form.keterangan = d.keterangan;
      this.idEdit = d.id;
      this.isEdit = true;
      this.isOpen = !this.isOpen;
    },
    async getData() {
      store.loading = true;
      const params = { params: this.params };
      try {
        await api.get("/contact", params).then((resp) => {
          if (resp.status === 200) {
            this.meta = resp.headers;
            this.items = resp.data.data;
            store.loading = false;
          }
        });
      } catch (error) {
        store.loading = false;
      }
    },
    async handleSubmit() {
      store.loading = true;
      try {
        if (!this.isEdit) {
          await api.post("/contact", this.form);
          store.loading = false;
          this.isOpen = false;
          this.resetForm();
          this.getData();
        } else {
          await api.put(`/contact/${this.idEdit}`, this.form);
          store.loading = false;
          this.isOpen = false;
          this.resetForm();
          this.getData();
        }
      } catch (err) {
        store.loading = false;
        console.log(err);
      }
    },
    async delete() {
      store.loading = true;
      try {
        await api.delete(`/contact/${this.idEdit}`);
        store.loading = false;
        this.isOpen = false;
        this.resetForm();
        this.getData();
      } catch (err) {
        store.loading = false;
        console.log(err);
      }
    },
  },
});
