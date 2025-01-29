<template>
  <v-navigation-drawer app>
    <div class="d-flex pa-8 jw-100 justify-center align-center pa-4">
    <img :src="logo" :width="100" class="h-auto" />
</div>
    <v-list>
      <v-list-item v-for="item in items" :key="item.title" :to="item.route">
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { ADD_VEHICLE, HOME } from '@/router/routes';
import { ref } from 'vue'
import logo from '@/assets/logo.svg'

const items = ref([
  { title: 'Listado', route: HOME },
  { title: 'Añadir Vehículo', route: ADD_VEHICLE },
])

</script>
