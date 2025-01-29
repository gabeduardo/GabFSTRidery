<template>
  <MainContainer :isLogIn="true">
    <div class="pa-8 d-flex flex-column align-start fill-height">
      <!-- <v-btn class="w-100 w-sm-auto mb-8" @click="router.push({ name: 'add-vehicle' })">
        <v-icon icon="mdi-plus"></v-icon>Añadir vehículo</v-btn
      > -->
      <template v-if="vehicles.length === 0">
        <div class="d-flex flex-column align-center justify-center w-100">
          <img :src="emptyList" alt="No hay vehículos" />
          <span class="text-h5">No hay vehículos para mostrar</span>
        </div>
      </template>
      <template v-else>
        <div class="d-flex flex-column align-start justify-space-between w-100 fill-height">
          <div class="w-100">
            <v-row class="w-100">
              <v-col v-for="vehicle in paginatedVehicles" :key="vehicle.id" cols="12" md="4">
                <VehicleCard :vehicle="vehicle" />
              </v-col>
            </v-row>
          </div>
          <v-pagination
            v-model="currentPage"
            :length="totalPages"
            :total-visible="5"
          ></v-pagination>
        </div>
      </template>
    </div>
  </MainContainer>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import axios from 'axios'
import Swal from 'sweetalert2'
import emptyList from '@/assets/empty-list.svg'
import VehicleCard from '@/components/VehicleCard.vue'
import MainContainer from '@/components/layouts/MainContainer.vue'

const vehicles = ref([])
const itemsPerPage = 6
const currentPage = ref(1)

const paginatedVehicles = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  console.log('currentPage:', vehicles.value, start, end)

  return vehicles.value.slice(start, end)
})

console.log('vehicles:', vehicles.value, paginatedVehicles)

const totalPages = computed(() => {
  return Math.ceil(vehicles.value.length / itemsPerPage)
})

watch(currentPage, (newValue) => {
  console.log('Página actual:', newValue)
})

// Función para obtener el token JWT de localStorage
const getToken = () => localStorage.getItem('jwtToken')

const fetchVehicles = async () => {
  const token = getToken()
  try {
    const response = await axios.get('http://localhost:3000/vehicles', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    console.log('Vehículos:', response.data)
    vehicles.value = response.data.sort(function (a, b) {
      return new Date(b.createdAt) - new Date(a.createdAt)
    })
  } catch (error) {
    console.error('Error fetching vehicles:', error)
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Error al traer los vehículos.',
    })
  }
}

onMounted(() => {
  fetchVehicles()
})
</script>

<style scoped></style>
