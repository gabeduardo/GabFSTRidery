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
        :items="statuses"
        label="Cambiar Estado"
      ></v-select>
    </v-card-text>
    <v-btn color="green" class="text-white" @click="updateStatus(vehicle._id, vehicle.status)"
      >Actualizar</v-btn
    >
  </v-card>
</template>

<script setup>
import axios from 'axios'
import Swal from 'sweetalert2'
defineProps({
  vehicle: {
    type: Object,
    required: true,
  },
})

const getToken = () => localStorage.getItem('jwtToken')

// Actualiza el estado del vehículo utilizando la nueva ruta del endpoint
const updateStatus = async (vehicleId, newStatus) => {
  console.log('vehicleId:', vehicleId, newStatus)
  const token = getToken()
  try {
    await axios.put(
      `http://localhost:3000/vehicles/${vehicleId}/status`,
      {
        status: newStatus,
        updatedBy: '60d5ec49bcf86cd799439020', // TODO: Este valor debería ser dinámico
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    )

    // Mensaje de éxito usando SweetAlert2
    Swal.fire({
      icon: 'success',
      title: 'Éxito',
      text: 'Estado del vehículo actualizado exitosamente!',
    })
  } catch (error) {
    console.error('Error actualizando el estado del vehículo:', error)

    // Capturar y mostrar el mensaje de error del backend
    const errorMessage =
      error.response?.data?.error ||
      'Hubo un problema actualizando el estado del vehículo. Por favor, inténtalo de nuevo.'
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: errorMessage,
    })
  }
}

const statuses = ['disponible', 'en mantenimiento', 'en servicio']
</script>

<style scoped>
/* Estilos personalizados para la card */
</style>
