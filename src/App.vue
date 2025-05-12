<template>
  <TheHeader />
  <main>
    <RouterView></RouterView>
  </main>
  <TheFooter />
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
import TheHeader from "./components/header/TheHeader.vue";
import TheFooter from "./components/footer/TheFooter.vue";
</script>
