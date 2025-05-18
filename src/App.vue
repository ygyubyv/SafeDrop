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
import { myMSALObj } from "./azure/azure_msal/msalConfig";

import TheHeader from "./components/header/TheHeader.vue";
import TheFooter from "./components/footer/TheFooter.vue";

const { handleRedirect } = useAuth();

const initialize = async () => {
  try {
    await myMSALObj.initialize();
  } catch (error) {
    console.error("Error in initialize", error);
  }
};

onMounted(async () => {
  await initialize();
  await handleRedirect();
});
</script>
