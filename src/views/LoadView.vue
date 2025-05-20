<template>
  <div class="flex items-center justify-center min-h-screen px-4 bg-gray-100">
    <div class="w-full max-w-6xl bg-black text-white rounded-2xl p-10 shadow-xl space-y-6">
      <!-- Заголовок -->
      <h1 class="text-[28px] font-bold text-center">Отримання файлу</h1>

      <!-- Попередження -->
      <div class="text-md text-white/80 leading-relaxed space-y-1 px-1">
        <p class="flex items-start gap-2">
          <span>Файл можна <strong class="text-white">завантажити лише 1 раз</strong>.</span>
        </p>
        <p class="flex items-start gap-2">
          <span>
            Зберігається на сервері <strong class="text-white">протягом 24 годин</strong> після
            завантаження.
          </span>
        </p>

        <div
          class="mt-3 text-sm bg-white/10 text-white px-4 py-3 rounded-lg border border-white/20 flex items-center gap-2"
        >
          <svg
            class="w-5 h-5 text-yellow-400"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 8v4l3 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>
            Файл буде видалено
            <strong class="text-white">{{ normalizeDate(file.expiresAt) }}</strong>
          </span>
        </div>
      </div>

      <!-- Блок із даними про файл -->
      <div
        class="w-full bg-white text-black rounded-xl p-5 flex justify-between items-center shadow-md border border-gray-200"
      >
        <div>
          <p class="text-lg font-medium truncate max-w-[300px]">
            {{ file.fileName }}
          </p>
          <p class="text-sm text-gray-600">{{ formatFileSize(file.size) }}</p>
        </div>

        <button
          class="px-6 py-2 bg-black text-white rounded-md hover:scale-105 transition-transform"
        >
          Завантажити файл
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatFileSize } from "../plugins/helpers";
import { normalizeDate } from "@/plugins/normalizeDate";

const file = {
  id: "f05bf2a3-2663-412b-9f4b-cf4e3c292a60",
  fileName: "Знімок екрана (26)_1747770009636.png",
  size: 21277,
  expiresAt: 1747861116781,
  url: "https://safedropfunctions.blob.core.windows.net/safe-drop/...",
};
</script>
