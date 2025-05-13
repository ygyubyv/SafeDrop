<template>
  <div class="login-page flex items-center justify-center min-h-screen bg-white px-4">
    <div class="login-container bg-neutral-900 rounded-xl shadow-2xl w-full max-w-md p-6 sm:p-8">
      <h2 class="text-2xl sm:text-3xl font-bold text-center text-white mb-4 sm:mb-6">
        Вхід в акаунт
      </h2>

      <p class="text-center mb-4 text-sm sm:text-base text-neutral-300">
        В цілях безпеки щоб продовжити треба ввійти в обліковий запис
      </p>

      <div class="flex flex-col space-y-3 sm:space-y-4">
        <button
          class="login-button bg-white hover:bg-neutral-200 text-neutral-900 font-medium py-2 rounded-lg flex items-center justify-center"
          @click="handleLogin('email')"
        >
          <font-awesome-icon icon="fa-solid fa-envelope" class="mr-2 text-black" />
          Вхід через пошту та пароль
        </button>

        <button
          class="login-button bg-white hover:bg-neutral-200 text-neutral-900 font-medium py-2 rounded-lg flex items-center justify-center"
          @click="handleLogin('google')"
        >
          <font-awesome-icon icon="fa-brands fa-google" class="mr-2 text-black" />
          Вхід через Google
        </button>

        <button
          class="login-button bg-white hover:bg-neutral-200 text-neutral-900 font-medium py-2 rounded-lg flex items-center justify-center"
          @click="handleLogin('github')"
        >
          <font-awesome-icon icon="fa-brands fa-github" class="mr-2 text-black" />
          Вхід через GitHub
        </button>

        <button
          class="login-button bg-white hover:bg-neutral-200 text-neutral-900 font-medium py-2 rounded-lg flex items-center justify-center"
          @click="handleLogin('microsoft')"
        >
          <font-awesome-icon icon="fa-brands fa-microsoft" class="mr-2 text-black" />
          Вхід через Microsoft
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const handleLogin = (method: string) => {
  console.log(`Авторизація через ${method}`);
};
</script>

<style scoped>
@media (max-width: 400px) {
  .login-container {
    padding: 1.5rem;
  }

  .login-button {
    font-size: 0.9rem;
  }
}
</style>
