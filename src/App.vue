<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <body class="min-h-screen flex flex-col">
    <main class="flex-grow">
      <RouterView />
    </main>

    <footer class="bg-gray-500 h-10"></footer>
  </body>
</template>
