<template>
  <TheHeader />
  <main>
    <RouterView></RouterView>
  </main>
  <TheFooter />
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { RouterView } from "vue-router";

import { useAuth } from "./composables/useAuth";

import TheHeader from "./components/header/TheHeader.vue";
import TheFooter from "./components/footer/TheFooter.vue";

const { handleRedirect } = useAuth();

onMounted(async () => {
  await handleRedirect();
});
</script>
