import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/pages/Login.vue"),
  },
  {
    path: "/",
    component: () => import("@/layouts/Main.vue"),
    meta: { requireAuth: true },
    children: [
      { path: "", redirect: "/dashboard" },
      {
        path: "/dashboard",
        name: "dashboard",
        component: () => import("@/pages/Dashboard.vue"),
      },
      {
        path: "/contact",
        name: "contact",
        component: () => import("@/pages/contact/Index.vue"),
      },
    ],
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

router.beforeEach((to, from, next) => {
  if (to.name !== "login" && !localStorage.getItem("token"))
    next({ name: "login" });
  if (to.name === "login" && localStorage.getItem("token"))
    next({ name: "dashboard" });
  else next();
});

export default router;
