<template>
  <div class="flex flex-col min-h-screen">
    <main class="flex-grow">
      <RouterView />
    </main>
    <footer class="bg-slate-200 shadow-[0_-11px_10px_rgba(0,0,0,0.3)] py-4 text-center flex gap-20 justify-center w-full px-10 text-black">
      <RouterLink class="text-2xl hover:scale-110 hover:text-stone-800 hover:font-bold transition-transform" to="/">Home</RouterLink>
      <RouterLink class="text-2xl hover:scale-110 hover:text-stone-800 hover:font-bold transition-transform" to="/about">About</RouterLink>
    </footer>
  </div>
</template>

<script setup lang="ts">
import './assets/styles/main.scss'
</script>
