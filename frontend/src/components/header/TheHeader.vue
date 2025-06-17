<template>
  <header>
    <div class="flex justify-between items-center h-[5rem] p-5 bg-black text-white">
      <div>
        <router-link :to="{ name: 'main' }">
          <img
            src="../../assets/images/logoImage-white.jpg"
            alt="Logo-image"
            class="w-14 h-14 rounded-full hover:scale-110 cursor-pointer"
          />
        </router-link>
      </div>

      <div class="flex items-center justify-center gap-2">
        <div>
          <router-link :to="{ name: 'create' }" v-if="isAuthenticated">
            <span class="block mr-1 md:mr-3 text-md md:text-lg hover:scale-110 glow-white-animated"
              >Create</span
            >
          </router-link>
        </div>

        <div>
          <button
            class="w-auto h-auto bg-white text-black p-1.75 md:p-2 rounded-lg cursor-pointer hover:scale-105"
            v-if="!isAuthenticated"
            @click="handleLogin"
          >
            <span class="mr-1 md:mr-2">Login</span>
            <font-awesome-icon icon="fa-solid fa-right-to-bracket" />
          </button>

          <button
            v-else
            @click="handleLogout"
            class="w-auto h-auto bg-white text-black p-1.75 md:p-2 rounded-lg cursor-pointer hover:scale-105"
          >
            <span class="mr-1 md:mr-2">Logout</span>
            <font-awesome-icon icon="fa-solid fa-right-to-bracket" />
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useAuth } from "@/composables/useAuth";

const { isAuthenticated, login, logout } = useAuth();

const handleLogin = async () => {
  await login();
};

const handleLogout = async () => {
  await logout();
};
</script>

<style scoped>
.glow-white-animated {
  color: #fff;
  transition: text-shadow 0.3s ease;
}
.glow-white-animated:hover {
  text-shadow: 0 0 20px #fff, 0 0 30px #fff;
}
</style>
