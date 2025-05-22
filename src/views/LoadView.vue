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
          v-if="!isLoading"
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

        <base-spinner v-if="isLoading" />
      </div>

      <!-- Блок із даними про файл -->
      <div
        class="w-full bg-white text-black rounded-xl p-5 flex justify-between items-center shadow-md border border-gray-200"
        v-if="!isLoading"
      >
        <div>
          <p class="text-lg font-medium truncate max-w-[300px]">
            {{ file.fileName }}
          </p>
          <p class="text-sm text-gray-600">{{ formatFileSize(file.size) }}</p>
        </div>

        <button
          class="px-6 py-2 bg-black text-white rounded-md hover:scale-105 transition-transform cursor-pointer"
          @click="downloadFile"
        >
          Завантажити файл
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import { formatFileSize, downloadSasToken } from "../plugins/helpers";
import { normalizeDate } from "@/plugins/normalizeDate";
import type { FileMetadata } from "@/types/FileMetadata";

const route = useRoute();

const fileId = route.params.id as string;

const file = reactive<FileMetadata>({
  fileName: "",
  size: 0,
  expiresAt: 0,
  id: "",
  url: "",
});

const isLoading = ref(false);

const loadFileMetadata = async (fileId: string) => {
  isLoading.value = true;
  try {
    const response = await fetch(`http://localhost:7071/api/getFileMetadata?id=${fileId}`);

    if (!response.ok) {
      throw new Error("Error: Cant fetch file metadata");
    }

    const data: FileMetadata = await response.json();

    file.fileName = data.fileName;
    file.size = data.size;
    file.expiresAt = data.expiresAt;
  } catch (error) {
    console.error(error);
  }
  isLoading.value = false;
};

const downloadBlob = async (url: string) => {
  try {
    const response = await fetch(url);
    return response.blob();
  } catch (error) {
    console.error(error);
  }
};

const downloadFile = async () => {
  try {
    const sasUrl = await downloadSasToken(file.fileName);
    const blob = await downloadBlob(sasUrl);
    const usersFile = new Blob([blob!]);
    const url = URL.createObjectURL(usersFile);
    const link = document.createElement("a");
    link.href = url;
    link.download = file.fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error(error);
  }
};

onMounted(async () => {
  await loadFileMetadata(fileId);
});
</script>
