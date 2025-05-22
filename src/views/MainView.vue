<template>
  <div class="slider relative overflow-hidden w-full py-10 xl:py-0">
    <slider ref="slider" />

    <button
      @click="prevSlide"
      class="absolute w-10 h-10 rounded-full text-white bg-black cursor-pointer hover:scale-110 flex items-center justify-center transition-transform duration-200 top-auto bottom-4 left-1/2 translate-x-[-120%] md:top-1/2 md:bottom-auto md:left-10 md:translate-x-0"
    >
      <font-awesome-icon icon="fa-solid fa-arrow-left" />
    </button>

    <button
      @click="nextSlide"
      class="absolute w-10 h-10 rounded-full text-white bg-black cursor-pointer hover:scale-110 flex items-center justify-center transition-transform duration-200 top-auto bottom-4 left-1/2 translate-x-[20%] md:top-1/2 md:bottom-auto md:right-10 md:left-auto md:translate-x-0"
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
