<template>
  <div
    class="bg-white rounded-2xl shadow-2xl px-6 py-6 md:px-12 md:py-10 max-w-6xl w-full border border-gray-200 flex flex-col md:flex-row gap-6 md:gap-10 items-center"
  >
    <div class="flex-1 space-y-6 md:px-5 xl:px-0">
      <h2 class="text-2xl md:text-4xl font-bold text-gray-800">{{ slide.title }}</h2>
      <h3 class="text-lg md:text-xl text-gray-500">{{ slide.subtitle }}</h3>
      <p class="text-base md:text-lg text-gray-600 leading-relaxed">
        {{ slide.description }}
      </p>
      <ul class="list-disc list-inside text-gray-600 text-base space-y-1">
        <li v-for="(item, idx) in slide.features" :key="idx">{{ item }}</li>
      </ul>
    </div>
    <div class="flex-1">
      <img
        :src="slide.image"
        alt="Ілюстрація"
        class="w-full max-h-40 sm:max-h-48 md:max-h-72 object-contain"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Slide } from "@/types/Slide";

interface Props {
  slide: Slide;
}

defineProps<Props>();
</script>
