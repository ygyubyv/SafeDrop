<template>
  <div class="flex items-center justify-center min-h-screen px-4 py-4">
    <div class="flex flex-col items-center justify-center w-full max-w-3xl gap-4">
      <!-- Інформаційна секція початок -->
      <section class="w-full bg-neutral-800 rounded-xl p-6 text-white shadow-md">
        <h2 class="text-lg md:text-xl mb-1.5 md:mb-3 text-center font-bold">
          SafeDrop — швидкий і безпечний обмін файлами
        </h2>
        <p class="text-sm lg:text-base mb-1.5 md:mb-3 text-justify text-gray-300">
          Завантажуйте будь-які типи файлів та передавайте їх іншим за кілька секунд. Ми не
          обмежуємо вас розширенням файлу — лише розміром.
        </p>
        <ul class="list-disc list-inside mb-2 md:mb-4 text-sm space-y-2 text-gray-300">
          <li>
            Сумарний розмір усіх файлів не має перевищувати
            <span class="font-semibold text-white">1GB</span>
          </li>
          <li>Передача даних зашифрована (HTTPS)</li>
          <li>Файли тимчасово зберігаються у хмарі Microsoft Azure</li>
          <li>
            Файл можна <span class="font-semibold text-white">завантажити лише один раз</span>
          </li>
          <li>
            Максимальний час зберігання — <span class="font-semibold text-white">168 годин</span>
          </li>
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
