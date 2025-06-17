import { onBeforeUnmount, onMounted, ref } from "vue";

import overviewImage from "../assets/images/overview-image.png";
import loginImage from "../assets/images/login-image.png";
import uploadImage from "../assets/images/upload-image.jpg";
import shareImage from "../assets/images/share-image.png";

export const useSlider = () => {
  let interval: ReturnType<typeof setInterval>;

  onMounted(() => {
    interval = setInterval(() => {
      nextSlide();
    }, 10000);
  });

  onBeforeUnmount(() => {
    clearInterval(interval);
  });

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

  function nextSlide() {
    currentSlide.value = currentSlide.value < slides.length - 1 ? currentSlide.value + 1 : 0;
  }

  function prevSlide() {
    currentSlide.value = currentSlide.value > 0 ? currentSlide.value - 1 : slides.length - 1;
  }

  return { currentSlide, slides, nextSlide, prevSlide };
};
