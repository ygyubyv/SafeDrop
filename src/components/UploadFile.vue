<template>
  <div class="w-full bg-neutral-800 rounded-xl shadow-md p-6 flex flex-col items-center gap-4">
    <h2 class="text-lg font-semibold text-white">Додайте файл</h2>

    <div class="w-full flex flex-col items-center gap-2">
      <label
        for="fileInput"
        class="cursor-pointer px-4 py-2 bg-white text-black rounded-lg hover:scale-105 hover:bg-gray-200 transition"
      >
        Вибрати файл
      </label>
      <input id="fileInput" type="file" class="hidden" @change="loadFile" />

      <div class="flex flex-col items-center gap-2">
        <h2 class="text-white">{{ fileName }}</h2>
        <base-spinner v-if="isLoading" />
      </div>

      <p class="text-sm text-gray-400 text-center">
        Підтримуються PDF, DOCX, TXT, JPEG, PNG (до 5MB)
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { uploadSasToken, uploadBlob } from "../plugins/filesHelpers";
import { showNotification } from "..//plugins/helpers";

const router = useRouter();

const fileName = ref("");
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

  isLoading.value = true;

  const reader = new FileReader();

  reader.readAsDataURL(file);

  reader.onload = async () => {
    if (!reader.result) {
      showNotification("error", "Cannot read your file");
      return;
    }

    const url = await uploadSasToken(fileName.value, file.size);
    await uploadBlob(url, file);

    showNotification("success", "Loaded successfully");

    isLoading.value = false;

    router.replace({ name: "link", params: { path: "ajsdhvasdjasd" } });
  };

  reader.onerror = () => {
    showNotification("error", `Error reading file, ${reader.error}`);
    console.error(reader.error);
  };
};
</script>
