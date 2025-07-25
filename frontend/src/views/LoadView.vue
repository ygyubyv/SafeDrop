<template>
  <div class="flex items-center justify-center min-h-screen px-4 bg-gray-100">
    <div
      class="w-full max-w-6xl bg-black text-white rounded-2xl py-8 px-4 sm:p-10 shadow-xl space-y-3 sm:space-y-6"
    >
      <h1 class="text-lg md:text-[28px] font-bold text-center">Отримання файлу</h1>

      <!-- Блок попередження початок -->
      <div
        class="text-md text-white/80 leading-relaxed space-y-1 px-1"
        v-if="!isLoading && !isError"
      >
        <p class="text-center sm:text-start">
          <span>Файл можна <strong class="text-white">завантажити лише 1 раз</strong>.</span>
        </p>
        <p class="text-center sm:text-start">
          <span>
            Зберігається на сервері протягом
            <strong class="text-white">{{ fileDuration }}</strong> після завантаження.
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

      <!-- Блок попередження кінець -->

      <!-- Блок даних про файл початок -->
      <div
        class="w-full bg-white text-black rounded-xl p-3.5 md:p-5 flex justify-between items-center shadow-md border border-gray-200"
        v-if="!isLoading && !isError"
      >
        <div>
          <p class="text-base md:text-lg font-medium truncate max-w-[150px] md:max-w-[300px]">
            {{ file.fileName }}
          </p>
          <p class="text-xs md:text-sm text-gray-600">{{ formatFileSize(file.size) }}</p>
        </div>

        <button
          class="sm:hidden px-3 py-1.5 bg-black text-white rounded-md"
          :class="downloadingFile ? 'cursor-not-allowed' : 'cursor-pointer'"
          :disabled="downloadingFile"
          @click="downloadFile"
        >
          <font-awesome-icon icon="download" />
        </button>

        <button
          class="hidden sm:block px-3 py-1.5 md:px-6 md:py-2 bg-black text-white rounded-md hover:scale-105 transition-transform"
          :class="downloadingFile ? 'cursor-not-allowed' : 'cursor-pointer'"
          :disabled="downloadingFile"
          @click="downloadFile"
        >
          Завантажити файл
        </button>
      </div>
      <!-- Блок даних про файл кінець -->

      <!-- Спінер під час завантаження файлу -->
      <div class="flex justify-center scale-80 sm:scale-100" v-if="downloadingFile">
        <base-spinner mode="White-spinner" />
      </div>
      <!-- Спінер під час завантаження файлу -->

      <!-- Блок помилки початок -->
      <div
        v-if="isError"
        class="bg-white/10 text-red-300 border border-red-500/40 rounded-xl px-6 py-4 flex items-start gap-3"
      >
        <svg
          class="w-6 h-6 text-red-400 mt-1"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M18.364 5.636l-12.728 12.728M5.636 5.636l12.728 12.728"
          />
        </svg>
        <div class="space-y-1 text-white/80">
          <p class="text-white font-semibold">Помилка завантаження</p>
          <p>Схоже, цього файлу більше не існує або посилання є недійсним.</p>
          <p class="text-sm text-white/60">
            Якщо ти вважаєш, що це помилка — звернись до відправника.
          </p>
        </div>
      </div>

      <!-- Блок помилки кінець -->

      <!-- Спінер під час завантаження метаданих -->
      <div class="flex justify-center scale-80 sm:scale-100" v-if="isLoading">
        <base-spinner mode="White-spinner" />
      </div>
      <!-- Спінер під час завантаження метаданих -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import axiosInstance from "@/plugins/axios";
import { formatFileSize, downloadSasToken, downloadBlob } from "../helpers/filesHelpers";
import { normalizeDate } from "@/helpers/normilizeDate";
import { formatDuration } from "@/helpers/formatDuration";
import { showNotification } from "@/helpers/showNotification";
import { decreaseDownloadAttempts } from "@/helpers/cosmosDBHelpers";
import BaseSpinner from "@/components/ui/BaseSpinner.vue";
import type { FileMetadata } from "@/types/FileMetadata";

const route = useRoute();

const fileId = route.params.id as string;

const isLoading = ref(false);
const downloadingFile = ref(false);
const isError = ref(false);

const file = reactive<FileMetadata>({
  fileName: "",
  size: 0,
  expiresAt: 0,
  uploadedAt: 0,
  id: "",
  url: "",
});

const fileDuration = computed(() => {
  return formatDuration(file.expiresAt - file.uploadedAt);
});

const loadFileMetadata = async (fileId: string) => {
  isLoading.value = true;
  try {
    const { data } = await axiosInstance.get(`/getFileMetadata?id=${fileId}`);

    file.fileName = data.fileName;
    file.size = data.size;
    file.expiresAt = data.expiresAt;
    file.uploadedAt = data.uploadedAt;
    file.id = data.id;
    file.url = data.url;
  } catch (error) {
    isError.value = true;
    showNotification("error", "Не вдалося завантажити метадані, схоже цього файлу уже не існує");
    console.error("Не вдалося завантажити метадані:", error);
  } finally {
    isLoading.value = false;
  }
};

const downloadFile = async () => {
  try {
    downloadingFile.value = true;

    const sasUrl = await downloadSasToken(file.fileName);
    const blob = await downloadBlob(sasUrl);

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = file.fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    await decreaseDownloadAttempts(file.id);
  } catch (error) {
    showNotification(
      "error",
      "Не вдалося завантажити файл, можливо спроби для завантаження уже закінчились!"
    );
    console.error("Download failed:", error);
  } finally {
    downloadingFile.value = false;
  }
};

onMounted(async () => {
  await loadFileMetadata(fileId);
});
</script>
