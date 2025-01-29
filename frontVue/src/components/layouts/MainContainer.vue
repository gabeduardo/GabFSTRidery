<template>
  <v-app>
    <template v-if="isLogIn">
      <Sidebar />
    </template>
    <v-main>
      <Navbar :isLogIn="isLogIn" />
      <template v-if="isLoading">
        <div class="d-flex flex-column align-center justify-center w-100 fill-height">
          <v-progress-circular indeterminate color="primary"></v-progress-circular>
          <span class="text-h5 mt-4">Cargando vehículos...</span>
        </div>
      </template>
      <template v-else>
        <div class="fill-height max-container">
          <slot></slot>
        </div>
      </template>
    </v-main>
    <Footer />
  </v-app>
</template>

<script setup>
import Sidebar from './Sidebar.vue'
import Navbar from './Navbar.vue'
import Footer from './Footer.vue'
defineProps({ isLogIn: { type: Boolean }, isLoading: { type: Boolean } })
</script>
