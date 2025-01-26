<template>
  <v-layout row wrap>
    <v-flex xs4 v-for="vehicle in vehicles" :key="vehicle._id">
      <v-card>
        <v-card-title primary-title>
          <div>
            <div class="headline">{{ vehicle.model }}</div>
            <span class="grey--text">{{ vehicle.brand }} ‧ {{ vehicle.year }}</span>
          </div>
        </v-card-title>
        <v-card-text>
          Estado: 
          <v-select
            v-model="vehicle.status"
            :items="statuses"
            label="Cambiar Estado"
          ></v-select>
          <v-btn @click="updateStatus(vehicle._id, vehicle.status)">Actualizar</v-btn>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';

const vehicles = ref([]);
const statuses = ['disponible', 'en mantenimiento', 'en servicio'];

const fetchVehicles = async () => {
  try {
    const response = await axios.get('http://localhost:3000/vehicles');
    vehicles.value = response.data;
  } catch (error) {
    console.error('Error fetching vehicles:', error);
  }
};

// Actualiza el estado del vehículo utilizando la nueva ruta del endpoint
const updateStatus = async (vehicleId, newStatus) => {
  try {
    await axios.put(`http://localhost:3000/vehicles/${vehicleId}/status`, {
      status: newStatus,
      updatedBy: '60d5ec49bcf86cd799439020', //TODO  Este valor debería ser dinámico 
    }, {
      headers: { 'Content-Type': 'application/json' },
    });

    // Mensaje de éxito usando SweetAlert2
    Swal.fire({
      icon: 'success',
      title: 'Éxito',
      text: 'Estado del vehículo actualizado exitosamente!',
    });
  } catch (error) {
    console.error('Error actualizando el estado del vehículo:', error);

    // Capturar y mostrar el mensaje de error del backend
    const errorMessage = error.response?.data?.error || 'Hubo un problema actualizando el estado del vehículo. Por favor, inténtalo de nuevo.';
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: errorMessage,
    });
  }
};

onMounted(() => {
  fetchVehicles();
});
</script>
