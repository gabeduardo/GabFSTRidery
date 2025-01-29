<template>
  <div class="d-flex justify-center align-center fill-height">
    <v-sheet
      :elevation="4"
      class="form-container pa-4 py-12 d-flex flex-column justify-center align-center ga-6"
    >
      <img :src="logo" :width="100" class="h-auto" />
      <div class="text-h4" v-if="title">{{ title }}</div>

      <slot></slot>
    </v-sheet>
  </div>
</template>

<script setup>
import logo from '@/assets/images/logo.svg'
defineProps({ title: { type: String } })
</script>

<style scoped>
.form-container {
  width: min(500px, 90%);
  min-height: 500px;
}
</style>
