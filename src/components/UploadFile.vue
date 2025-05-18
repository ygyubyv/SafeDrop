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

      <div class="flex flex-col items-center gap-2" v-if="processing">
        <h2 class="text-white">{{ fileName }}</h2>
        <input type="range" v-model="progressValue" />
      </div>

      <p class="text-sm text-gray-400 text-center">
        Підтримуються PDF, DOCX, TXT, JPEG, PNG (до 5MB)
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const processing = ref(false);
const fileName = ref("");
const progressValue = ref(0);

const loadFile = (event: Event): void => {
  const input = event.target as HTMLInputElement;

  if (!input.files || !input.files.length) {
    // User message
    return;
  }

  processing.value = true;

  const file = input.files[0];
  const MAX_FILE_SIZE = 1 * 1024 * 1024 * 1024;

  fileName.value = file.name;

  if (file.size > MAX_FILE_SIZE) {
    // User message
    return;
  }

  const reader = new FileReader();

  reader.readAsDataURL(file);

  reader.onload = async () => {
    if (!reader.result) {
      return;
    }
    const base64 = (reader.result as string).split("base64")[2];
    const response = await fetch("http://localhost:7071/api/uploadFile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fileName: fileName.value, fileContentBase64: base64 }),
    });

    const data = await response.json();
    console.log(data);

    // User message
  };

  reader.onprogress = (event: ProgressEvent<FileReader>) => {
    if (event.lengthComputable) {
      progressValue.value = (event.loaded / event.total) * 100;
    }
  };

  reader.onerror = () => {
    // User message
    console.error(reader.error);
  };
};
</script>
