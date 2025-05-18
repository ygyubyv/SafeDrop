<template>
  <div class="w-full bg-neutral-800 rounded-xl shadow-md p-6 flex flex-col items-center gap-4">
    <h2 class="text-lg font-semibold text-white">Введіть текст</h2>

    <textarea
      rows="6"
      placeholder="Введіть ваш текст тут..."
      class="w-full p-3 rounded-lg bg-neutral-700 text-white placeholder-gray-400 resize-none focus:outline-none focus:ring-1 focus:ring-white"
    ></textarea>

    <button
      class="px-4 py-2 bg-white text-black rounded-lg cursor-pointer hover:scale-105 hover:bg-gray-200 transition"
    >
      Завантажити текст
    </button>
  </div>
</template>
