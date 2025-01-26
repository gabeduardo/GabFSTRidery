<template>
  <v-app id="inspire">

    <v-toolbar color="indigo" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Rider Gab</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <div id="app">
          <router-view />
        </div>
      </v-container>
    </v-content>
    <v-footer color="indigo" app>
      <span class="white--text">&copy; Gabriel 2025</span>
    </v-footer>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
import './assets/stylesheets/main.css'

const drawer = ref(null)
</script>
