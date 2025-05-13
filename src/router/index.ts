import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";

import MainView from "@/views/MainView.vue";
import LoginView from "@/views/LoginView.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "main",
    component: MainView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
