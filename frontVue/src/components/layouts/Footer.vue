<template>
  <v-footer color="indigo" class="py-4" app>
    <span class="white--text">&copy; Gabriel {{ year }}</span>
  </v-footer>
</template>

<script setup>
import { ref } from 'vue'
const year = ref(new Date().getFullYear())
</script>