а взагалі можна якось на помилки покращити, раніше я мав файл рідер і там було зрозуміліше:
<template>
  <div class="w-full bg-neutral-800 rounded-xl shadow-md p-6 flex flex-col gap-4">
    <div class="flex flex-col sm:flex-row items-center justify-between">
      <!-- Заголовок початок -->
      <h2 class="text-sm md:text-base mb-4 sm:mb-0 text-center font-semibold text-white">
        Додайте файл та виберіть тривалість його життя
      </h2>
      <!-- Заголовок кінець -->

      <!-- Блок вибору файлу та опції початок -->
      <div class="flex items-center gap-3">
        <label
          for="fileInput"
          class="cursor-pointer text-sm md:text-base px-2.5 py-1.75 md:px-4 md:py-2 bg-white text-black rounded-lg hover:scale-105 hover:bg-gray-200 transition"
        >
          Вибрати файл
        </label>
        <input id="fileInput" type="file" class="hidden" multiple @change="loadFile" />

        <select
          class="px-2.5 py-1.5 md:px-3 md:py-2 rounded-lg bg-neutral-700 text-white focus:outline-none border-0 flex-shrink-0 cursor-pointer"
          v-model="fileTTL"
        >
          <option value="1h">1 година</option>
          <option value="12h">12 годин</option>
          <option value="1d">1 день</option>
          <option value="7d">7 днів</option>
        </select>
      </div>
      <!-- Блок вибору файлу та опції кінець -->
    </div>

    <!-- Блок з назвою файлу і розміром початок -->
    <div class="flex flex-col gap-3 max-h-64 md:max-h-128 overflow-y-auto" v-if="files.length">
      <div
        class="bg-white text-black text-md rounded-xl p-3.75 md:p-5 flex justify-between items-center shadow-md border border-gray-200"
        v-for="file in files"
      >
        <h2 class="truncate w-1/2 sm:max-w-full text-sm sm:text-base" title="Назва файлу">
          {{ file.fileName }}
        </h2>
        <p v-if="file.fileSize" class="text-sm sm:text-base">
          Розмір: {{ formatFileSize(file.fileSize) }}
        </p>
      </div>
    </div>
    <!-- Блок з назвою файлу і розміром кінець -->

    <!-- Блок спінера початок -->
    <div class="flex justify-center scale-80 sm:scale-100" v-if="isLoading">
      <base-spinner mode="White-spinner" />
    </div>
    <!-- Блок спінера кінець -->
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useTTL } from "@/composables/useTTL";
import { showNotification } from "../helpers/showNotification";
import { uploadSasToken, uploadBlob, formatFileSize } from "../helpers/filesHelpers";
import type { UserFile } from "@/types/UserFile";
import BaseSpinner from "./ui/BaseSpinner.vue";
import JSZip from "jszip";

const router = useRouter();
const { fileTTL, TTL } = useTTL();

const files = ref<UserFile[]>([]);
const isLoading = ref(false);

const loadFile = async (event: Event): Promise<void> => {
  const input = event.target as HTMLInputElement;

  if (!input.files || !input.files.length) {
    return;
  }

  const MAX_FILES_SIZE = 1 * 1024 * 1024 * 1024;
  const currentFilesSize = Array.from(input.files).reduce(
    (accumulator, currentFile) => accumulator + currentFile.size,
    0
  );

  if (currentFilesSize > MAX_FILES_SIZE) {
    showNotification("error", "Розмір файлів перевищує ліміт");
    return;
  }

  const zip = new JSZip();

  isLoading.value = true;

  for (const file of input.files) {
    try {
      const buffer = await file.arrayBuffer();

      zip.file(file.name, buffer);

      files.value.push({
        fileName: file.name,
        fileSize: file.size,
      });
    } catch (error) {
      showNotification("error", `Помилка читання: ${file.name}`);
      console.error("Read error", file.name, error);
    }
  }

  let blob: Blob;

  try {
    blob = await zip.generateAsync({ type: "blob" });
  } catch (zipError) {
    showNotification("error", "Помилка створення архіву");
    console.error("ZIP error", zipError);
    return;
  }

  const data = await uploadSasToken("Files", TTL.value, currentFilesSize);
  if (!data) {
    return;
  }

  const { url, id } = data;
  await uploadBlob(url, blob);

  showNotification("success", "Успішно завантажено!");

  router.replace({ name: "link", params: { path: id } });

  isLoading.value = false;
};
</script>
