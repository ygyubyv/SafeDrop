<template>
  <div class="flex items-center justify-center min-h-screen px-4">
    <div class="flex flex-col items-center justify-center w-full max-w-2xl gap-4">
      <!-- Інформаційна секція початок -->
      <section class="w-full bg-neutral-800 rounded-xl p-6 text-white shadow-md">
        <h2 class="text-xl font-bold mb-3 justify-self-center">
          SafeDrop — швидкий і безпечний обмін файлами
        </h2>
        <p class="text-sm text-gray-300 mb-3">
          Завантажуйте будь-які типи файлів та передавайте їх іншим за кілька секунд. Ми не
          обмежуємо вас розширенням файлу — лише розміром.
        </p>
        <ul class="list-disc list-inside mb-2 text-gray-300">
          <li>
            Максимальний розмір одного файлу — <span class="font-semibold text-white">1GB</span>
          </li>
          <li>Шифрування під час передачі та зберігання</li>
          <li>Дані зберігаються у хмарі Microsoft Azure</li>
        </ul>
        <p class="text-sm text-gray-400 mt-2">Безпека та конфіденційність — наш пріоритет.</p>

        <!-- Кнопки перемикання початок -->
        <div class="flex gap-4 justify-self-center mt-5">
          <button
            :class="[
              'px-4 py-2 rounded-lg text-sm font-semibold transition cursor-pointer',
              currentView === 'UploadFile'
                ? 'bg-white text-black scale-110'
                : 'bg-neutral-700 text-white hover:bg-neutral-600',
            ]"
            @click="currentView = 'UploadFile'"
          >
            Додати файл
          </button>

          <button
            :class="[
              'px-4 py-2 rounded-lg text-sm font-semibold transition cursor-pointer',
              currentView === 'UploadText'
                ? 'bg-white text-black scale-110'
                : 'bg-neutral-700 text-white hover:bg-neutral-600',
            ]"
            @click="currentView = 'UploadText'"
          >
            Додати текст
          </button>
        </div>
        <!-- Кнопки перемикання кінець -->
      </section>
      <!-- Інформаційна секція кінець -->

      <!-- Динамічний компонент початок -->
      <div class="w-full">
        <component :is="components[currentView]" />
      </div>
      <!-- Динамічний компонент кінець -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import UploadFile from "@/components/UploadFile.vue";
import UploadText from "@/components/UploadText.vue";

type View = "UploadFile" | "UploadText";

const components = { UploadFile, UploadText };

const currentView = ref<View>("UploadFile");
</script>
