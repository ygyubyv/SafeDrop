<template>
  <div class="slider relative overflow-hidden h-screen w-full">
    <slider ref="slider" />

    <button
      @click="prevSlide"
      class="absolute top-1/2 left-10 flex items-center justify-center w-10 h-10 rounded-full text-white bg-black cursor-pointer hover:scale-110"
    >
      <font-awesome-icon icon="fa-solid fa-arrow-left" />
    </button>
    <button
      @click="nextSlide"
      class="absolute top-1/2 right-10 flex items-center justify-center w-10 h-10 rounded-full text-white bg-black cursor-pointer hover:scale-110"
    >
      <font-awesome-icon icon="fa-solid fa-arrow-right" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Slider from "@/components/Slider.vue";

const slider = ref();

const nextSlide = () => {
  slider.value.nextSlide();
};

const prevSlide = () => {
  slider.value.prevSlide();
};
</script>
