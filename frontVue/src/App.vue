<template>
  <v-app id="inspire">
    <v-navigation-drawer fixed v-model="drawer" app>
      <v-list dense>
        <router-link :to="{ name: 'Home' }" class="side_bar_link">
          <v-list-item>
            <v-list-item-action>
              <v-icon>home</v-icon>
            </v-list-item-action>
            <v-list-item-content>Listado</v-list-item-content>
          </v-list-item>
        </router-link>
        <router-link class="side_bar_link">
          <v-list-item>
            <v-list-item-action>
              <v-icon>contact_mail</v-icon>
            </v-list-item-action>
            <v-list-item-content>Añadir Vehículo</v-list-item-content>
          </v-list-item>
        </router-link>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="indigo" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Rider Gab</v-toolbar-title>
    </v-toolbar>
    <v-main>
      <v-container fluid>
        <div id="app">
          <router-view />
        </div>
      </v-container>
    </v-main>
    <v-footer color="indigo" app>
      <span class="white--text">&copy; Gabriel 2025</span>
    </v-footer>
  </v-app>
</template>

<script setup>
import { ref } from 'vue';
import './assets/stylesheets/main.css';

const drawer = ref(null);
</script>
