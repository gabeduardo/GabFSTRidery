<template>
  <v-app>
    <template v-if="isLogIn">
      <Sidebar />
    </template>
    <v-main>
      <Navbar :isLogIn="isLogIn" />
      <div class="fill-height max-container">
        <slot></slot>
      </div>
    </v-main>
    <Footer />
  </v-app>
</template>

<script setup>
import Sidebar from './Sidebar.vue'
import Navbar from './Navbar.vue'
import Footer from './Footer.vue'
defineProps({ isLogIn: { type: Boolean } })
</script>
