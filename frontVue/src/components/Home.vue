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
          Estado: {{ vehicle.status }}
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const vehicles = ref([]);

const fetchVehicles = async () => {
  try {
    const response = await axios.get('http://localhost:3000/vehicles');
    vehicles.value = response.data;
  } catch (error) {
    console.error('Error fetching vehicles:', error);
  }
};

onMounted(() => {
  fetchVehicles();
});
</script>
