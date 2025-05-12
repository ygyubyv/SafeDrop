import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
import MainView from "@/views/MainView.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "main",
    component: MainView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
