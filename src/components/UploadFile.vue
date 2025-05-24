<template>
  <div class="w-full bg-neutral-800 rounded-xl shadow-md p-6 flex flex-col gap-4">
    <div class="flex items-center justify-between">
      <!-- Заголовок початок -->
      <h2 class="text-md font-semibold text-white">
        Додайте файл та виберіть тривалість його життя
      </h2>
      <!-- Заголовок кінець -->

      <!-- Блок вибору файлу та опції початок -->
      <div class="flex items-center gap-3">
        <label
          for="fileInput"
          class="cursor-pointer px-4 py-2 bg-white text-black rounded-lg hover:scale-105 hover:bg-gray-200 transition"
        >
          Вибрати файл
        </label>
        <input id="fileInput" type="file" class="hidden" @change="loadFile" />

        <select
          class="px-3 py-2 rounded-lg bg-neutral-700 text-white focus:outline-none border-0 flex-shrink-0 cursor-pointer"
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
    <div
      class="bg-white text-black text-md rounded-xl p-5 flex justify-between items-center shadow-md border border-gray-200"
      v-if="fileName"
    >
      <h2 class="truncate max-w-full" title="Назва файлу">{{ fileName }}</h2>
      <p v-if="fileSize">Розмір: {{ formatFileSize(fileSize) }}</p>
    </div>
    <!-- Блок з назвою файлу і розміром кінець -->

    <!-- Блок спінера початок -->
    <div class="flex justify-center" v-if="isLoading">
      <base-spinner />
    </div>
    <!-- Блок спінера кінець -->
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useTTL } from "@/composables/useTTL";
import { showNotification } from "..//plugins/helpers";
import { uploadSasToken, uploadBlob, formatFileSize } from "../plugins/filesHelpers";

const router = useRouter();
const { fileTTL, TTL } = useTTL();

const fileName = ref("");
const fileSize = ref<number | null>(null);
const isLoading = ref(false);

const loadFile = (event: Event): void => {
  const input = event.target as HTMLInputElement;

  if (!input.files || !input.files.length) {
    return;
  }

  const file = input.files[0];
  const MAX_FILE_SIZE = 1 * 1024 * 1024 * 1024;

  if (file.size > MAX_FILE_SIZE) {
    return;
  }

  fileName.value = file.name;
  fileSize.value = file.size;
  isLoading.value = true;

  const reader = new FileReader();

  reader.readAsDataURL(file);

  reader.onload = async () => {
    if (!reader.result) {
      showNotification("error", "Неможливо прочитати цей файл");
      return;
    }

    const data = await uploadSasToken(fileName.value, TTL.value, file.size);

    if (!data) {
      return;
    }

    const { url, id } = data;
    await uploadBlob(url, file);

    showNotification("success", "Успішно завантажено!");

    router.replace({ name: "link", params: { path: id } });

    isLoading.value = false;
  };

  reader.onerror = () => {
    showNotification("error", `Помилка читання файлу:, ${reader.error}`);
    isLoading.value = false;
    console.error(reader.error);
  };
};
</script>
