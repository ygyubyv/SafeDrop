<template>
  <div class="slider relative overflow-hidden h-screen w-full">
    <div
      class="flex transition-transform duration-500 ease-in-out"
      :style="{ transform: 'translateX(' + -currentSlide * 100 + '%)' }"
    >
      <div
        v-for="(slide, index) in slides"
        :key="index"
        class="flex items-center justify-center h-screen min-w-[100%] px-6"
      >
        <div
          class="bg-white rounded-2xl shadow-2xl px-12 py-10 max-w-6xl w-full border border-gray-200 flex flex-col md:flex-row gap-10 items-center"
        >
          <div class="flex-1 space-y-6">
            <h2 class="text-4xl font-bold text-gray-800">{{ slide.title }}</h2>
            <h3 class="text-xl text-gray-500">{{ slide.subtitle }}</h3>
            <p class="text-gray-600 text-lg leading-relaxed">
              {{ slide.description }}
            </p>
            <ul class="list-disc list-inside text-gray-600 text-base space-y-1">
              <li v-for="(item, idx) in slide.features" :key="idx">{{ item }}</li>
            </ul>
          </div>
          <div class="flex-1">
            <img :src="slide.image" alt="Ілюстрація" class="w-full max-h-72 object-contain" />
          </div>
        </div>
      </div>
    </div>

    <button
      @click="prevSlide"
      class="absolute top-1/2 left-10 flex items-center justify-center w-10 h-10 rounded-full text-white bg-black cursor-pointer hover:scale-110"
    >
      <font-awesome-icon icon="fa-solid fa-arrow-left" />
    </button>
    <button
      @click="nextSlide"
      class="absolute top-1/2 right-10 flex items-center justify-center w-10 h-10 rounded-full text-white bg-black cursor-pointer hover:scale-110"
    >
      <font-awesome-icon icon="fa-solid fa-arrow-right" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import overviewImage from "../assets/images/overview-image.png";
import loginImage from "../assets/images/login-image.png";
import uploadImage from "../assets/images/upload-image.jpg";
import shareImage from "../assets/images/share-image.png";

const currentSlide = ref(0);
const slides = [
  {
    title: "Ласкаво просимо!",
    subtitle: "Просте хмарне сховище з авторизацією та обміном файлами",
    description:
      "Цей сайт дозволяє вам швидко зберігати, переглядати та ділитися файлами онлайн. Усе працює через безпечну авторизацію, тому лише ви матимете доступ до свого сховища.",
    features: [
      "Проста авторизація через Azure AD B2C",
      "Завантаження та зберігання файлів у хмарі",
      "Миттєвий обмін через посилання",
    ],
    image: overviewImage,
  },
  {
    title: "1) Увійдіть у свій акаунт",
    subtitle: "Швидко та безпечно за кілька кліків",
    description:
      "Натисніть кнопку «Увійти» та авторизуйтеся через свою електронну пошту або обліковий запис. Це потрібно, щоб система знала, які файли належать саме вам.",
    features: [
      "Безпечна авторизація через Azure AD B2C",
      "Підключення з будь-якого пристрою",
      "Почніть користуватись одразу",
    ],
    image: loginImage,
  },
  {
    title: "2) Завантажте ваші файли",
    subtitle: "Додайте файли в особисте хмарне сховище",
    description:
      "Після входу натисніть «Додати файл» і виберіть будь-який документ чи зображення з вашого комп’ютера. Система швидко збереже його у вашому особистому сховищі.",
    features: [
      "Підтримка різних типів файлів",
      "Миттєве збереження в хмарі",
      "Зручний перегляд і управління",
    ],
    image: uploadImage,
  },
  {
    title: "3) Поділіться або збережіть посилання",
    subtitle: "Доступ до файлів — коли завгодно і де завгодно",
    description:
      "Після завантаження ви отримаєте унікальне посилання на файл. Його можна скопіювати та надіслати іншим або залишити для себе.",
    features: [
      "Швидке отримання посилання на файл",
      "Можливість поділитися з іншими",
      "Захищений доступ до вмісту",
    ],
    image: shareImage,
  },
];

const nextSlide = () => {
  currentSlide.value = currentSlide.value < slides.length - 1 ? currentSlide.value + 1 : 0;
};

const prevSlide = () => {
  currentSlide.value = currentSlide.value > 0 ? currentSlide.value - 1 : slides.length - 1;
};
</script>
