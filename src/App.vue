<template>
  <TheHeader />
  <main>
    <div class="h-screen w-full flex items-center justify-center cl" v-if="isLoading">
      <BaseSpinner mode="Black-spinner" />
    </div>
    <RouterView></RouterView>
  </main>
  <TheFooter />
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
import { isLoading } from "./router";
import TheHeader from "./components/header/TheHeader.vue";
import TheFooter from "./components/footer/TheFooter.vue";
import BaseSpinner from "./components/ui/BaseSpinner.vue";
</script>
