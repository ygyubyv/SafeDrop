<template>
  <div class="flex items-center justify-center min-h-screen px-4 bg-gray-100">
    <div
      class="w-full max-w-4xl bg-black text-white rounded-2xl py-7.5 sm:py-10 px-6 shadow-xl space-y-2.5 sm:space-y-5"
    >
      <!-- Інформаційний блок початок -->
      <div class="sm:text-lg font-semibold text-center">
        Файл успішно завантажено. Ви можете поділитися цим посиланням або згенерувати QR-код.
      </div>
      <!-- Інформаційний блок кінець -->

      <!-- Блок з лінкою і кнопками початок -->
      <div
        class="w-full bg-white text-black rounded-xl p-3.5 md:p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-md border border-gray-200"
      >
        <div class="text-md md:text-lg break-all max-h-28 overflow-auto">
          {{ link }}
        </div>

        <div class="flex gap-2 sm:gap-2.5 self-end md:self-auto">
          <button
            class="px-3 py-1.5 sm:px-4 sm:py-2 bg-black text-white rounded-md hover:scale-105 transition-transform duration-150 cursor-pointer"
            title="Скопіювати лінк"
            @click="copyLink"
          >
            <font-awesome-icon icon="fa-solid fa-copy" />
          </button>
          <button
            class="px-3 py-1.5 sm:px-4 sm:py-2 bg-black text-white rounded-md hover:scale-105 transition-transform duration-150 cursor-pointer"
            title="Згенерувати QR-код"
            @click="toggleQrCodeVisibility"
          >
            <font-awesome-icon icon="fa-solid fa-qrcode" />
          </button>
        </div>
      </div>
      <!-- Блок з лінкою і кнопками кінець -->
    </div>

    <!-- Блок QR-коду початок -->
    <transition name="fade">
      <div
        v-if="qrCodeIsVisible"
        class="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
      >
        <div class="bg-white p-2 md:p-4 rounded-xl shadow-xl relative">
          <button
            class="cursor-pointer absolute top-2 right-2 text-gray-600 hover:text-black"
            @click="qrCodeIsVisible = false"
          >
            <font-awesome-icon icon="fa-solid fa-xmark" />
          </button>
          <vue-qr :text="link" size="250" />
        </div>
      </div>
    </transition>
    <!-- Блок QR-коду кінець -->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { showNotification } from "@/helpers/showNotification";
import vueQr from "vue-qr/src/packages/vue-qr.vue";

const route = useRoute();
const link = ref("");
const qrCodeIsVisible = ref(false);

const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(link.value);
    showNotification("success", "Успішно скопійовано!");
  } catch (error) {
    showNotification("error", "Не вдалося скопіювати посилання");
    console.error(error);
  }
};

const toggleQrCodeVisibility = () => {
  qrCodeIsVisible.value = !qrCodeIsVisible.value;
};

onMounted(() => {
  link.value = `https://lively-hill-0ca930403.6.azurestaticapps.net/load/${
    route.params.path as string
  }`;
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
