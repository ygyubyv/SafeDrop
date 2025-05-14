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
      <div>
        <router-link v-if="!isAuthenticated" :to="{ name: 'login' }">
          <button
            class="w-auto h-auto bg-white text-black p-1.75 md:p-2 rounded-lg cursor-pointer hover:scale-105"
          >
            <span class="mr-1 md:mr-2">Login</span>
            <font-awesome-icon icon="fa-solid fa-right-to-bracket" />
          </button>
        </router-link>

        <button
          v-else
          @click="logout"
          class="w-auto h-auto bg-white text-black p-1.75 md:p-2 rounded-lg cursor-pointer hover:scale-105"
        >
          <span class="mr-1 md:mr-2">Logout</span>
          <font-awesome-icon icon="fa-solid fa-right-to-bracket" />
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useAuth } from "@/composables/useAuth";

const { isAuthenticated, logout } = useAuth();
</script>
