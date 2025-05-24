<template>
  <div class="flex items-center justify-center min-h-screen px-4 bg-gray-100">
    <div class="w-full max-w-4xl bg-black text-white rounded-2xl py-10 px-6 shadow-xl space-y-5">
      <!-- Інформаційний текст -->
      <div class="text-lg font-semibold text-center">
        Файл успішно завантажено. Ви можете поділитися цим посиланням або згенерувати QR-код.
      </div>

      <!-- Блок з лінкою та кнопками -->
      <div
        class="w-full bg-white text-black rounded-xl p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-md border border-gray-200"
      >
        <div class="text-md md:text-lg break-all">
          {{ link }}
        </div>

        <div class="flex gap-2.5 self-end md:self-auto">
          <button
            class="px-4 py-2 bg-black text-white rounded-md hover:scale-105 transition-transform duration-150 cursor-pointer"
            title="Скопіювати лінк"
            @click="copyLink"
          >
            <font-awesome-icon icon="fa-solid fa-copy" />
          </button>
          <button
            class="px-4 py-2 bg-black text-white rounded-md hover:scale-105 transition-transform duration-150 cursor-pointer"
            title="Згенерувати QR-код"
            @click="toggleQrCodeVisibility"
          >
            <font-awesome-icon icon="fa-solid fa-qrcode" />
          </button>
        </div>

        <div v-if="qrCodeIsVisible">
          <vue-qr :text="link"></vue-qr>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { showNotification } from "@/plugins/helpers";

import vueQr from "vue-qr/src/packages/vue-qr.vue";

const route = useRoute();

const link = ref("");
const qrCodeIsVisible = ref(false);

const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(link.value);
    showNotification("success", "Successfully copied!");
  } catch (error) {
    showNotification("error", "Cannot copy link");
    console.error(error);
  }
};

const toggleQrCodeVisibility = () => {
  qrCodeIsVisible.value ? (qrCodeIsVisible.value = false) : (qrCodeIsVisible.value = true);
};

onMounted(() => {
  link.value = `http://localhost:5173/load/${route.params.path as string}`;
});
</script>
