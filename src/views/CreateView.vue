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
      </section>
      <!-- Інформаційна секція кінець -->

      <!-- Динамічний компонент початок -->
      <div class="w-full">
        <upload-file />
      </div>
      <!-- Динамічний компонент кінець -->
    </div>
  </div>
</template>

<script setup lang="ts">
import UploadFile from "@/components/UploadFile.vue";
</script>
