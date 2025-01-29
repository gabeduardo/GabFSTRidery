<template>
  <v-card class="d-flex flex-column pa-4" :elevation="4">
    <v-card-title primary-title class="pa-0">
      <div class="d-flex flex-column">
        <span class="headline text-h5">{{ vehicle.model }}</span>
        <span class="grey--text">{{ vehicle.brand }} ‧ {{ vehicle.year }}</span>
      </div>
    </v-card-title>
    <v-card-text class="pa-0">
      <v-select
        class="pa-0"
        v-model="vehicle.status"
        :items="status"
        label="Cambiar Estado"
      ></v-select>
    </v-card-text>
    <v-btn color="green" class="text-white" @click="updateStatus(vehicle._id, vehicle.status)"
      >Actualizar</v-btn
    >
  </v-card>
</template>

<script setup>
import { updateStatus } from '@/api/vehicleService'
defineProps({
  vehicle: {
    type: Object,
    required: true,
  },
})
const status = ['disponible', 'en mantenimiento', 'en servicio']
</script>

<style scoped>
/* Estilos personalizados para la card */
</style>
