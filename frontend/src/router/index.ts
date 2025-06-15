import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
import { ref } from "vue";

import { useAuth } from "@/composables/useAuth";

import MainView from "@/views/MainView.vue";
import CreateView from "@/views/CreateView.vue";
import LoadView from "@/views/LoadView.vue";
import GetLinkView from "@/views/GetLinkView.vue";

export const isLoading = ref(false);

const routes: RouteRecordRaw[] = [
  { path: "/", name: "main", component: MainView },
  { path: "/create", name: "create", component: CreateView, meta: { requiresAuth: true } },
  { path: "/load/:id", name: "load", component: LoadView, meta: { requiresAuth: true } },
  { path: "/link/:path", name: "link", component: GetLinkView, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const { isAuthenticated, login, initAuth } = useAuth();

  isLoading.value = true;

  await initAuth();

  if (to.meta.requiresAuth && !isAuthenticated.value) {
    await login();
    return;
  }

  isLoading.value = false;

  next();
});

export default router;
