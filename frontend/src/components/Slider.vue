<template>
  <div
    class="flex transition-transform duration-700 ease-in-out my-2 md:my-5"
    :style="{ transform: 'translateX(' + -currentSlide * 100 + '%)' }"
  >
    <div
      v-for="(slide, index) in slides"
      :key="index"
      class="flex items-start md:items-center justify-center min-h-[80vh] md:h-screen min-w-[100%] px-4 md:px-6 py-6"
    >
      <slide :slide="slide"></slide>
    </div>
  </div>
</template>

<script setup lang="ts">
import Slide from "./Slide.vue";

import { useSlider } from "@/composables/useSlider";

const { currentSlide, slides, nextSlide, prevSlide } = useSlider();

defineExpose({
  nextSlide,
  prevSlide,
});
</script>
