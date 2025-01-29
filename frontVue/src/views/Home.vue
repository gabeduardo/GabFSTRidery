<template>
  <MainContainer :isLogIn="true" :isLoading="isLoading">
    <div class="pa-8 d-flex flex-column align-start fill-height">
      <v-dialog v-model="isActive" max-width="700">
        <template v-slot:activator="{ props: activatorProps }">
          <v-btn v-bind="activatorProps" @click="openDialog" class="mb-10">
            <v-icon icon="mdi-plus"></v-icon>Añadir vehículo</v-btn
          >
        </template>
        <v-card class="pa-6">
          <v-card-title class="d-flex justify-space-between">
            Añadir Vehículo
            <v-btn icon content-class="elevation-0" @click="closeAction">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text> <AddVehicleForm :closeAction="saveAction" /> </v-card-text>
        </v-card>
      </v-dialog>
      <template v-if="vehicles.length === 0">
        <div class="d-flex flex-column align-center justify-center w-100">
          <img :src="emptyList" alt="No hay vehículos" />
          <span class="text-h5">No hay vehículos para mostrar</span>
        </div>
      </template>
      <template v-else>
        <div class="d-flex flex-column align-start justify-space-between w-100 fill-height ga-4">
          <div class="w-100">
            <v-row class="w-100">
              <v-col v-for="vehicle in paginatedVehicles" :key="vehicle.id" cols="12" md="4">
                <VehicleCard :vehicle="vehicle" />
              </v-col>
            </v-row>
          </div>
          <div>
            <v-pagination
              v-model="currentPage"
              :length="totalPages"
              :total-visible="5"
            ></v-pagination>
            <v-select
              :width="150"
              class="mt-2"
              v-model="itemsPerPage"
              :items="[6, 9, 15, 50, 100]"
              label="Items por página"
              outlined
            ></v-select>
          </div>
        </div>
      </template>
    </div>
  </MainContainer>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { fetchVehicles } from '@/api/vehicleService'
import emptyList from '@/assets/images/empty-list.svg'
import VehicleCard from '@/components/VehicleCard.vue'
import AddVehicleForm from '@/components/AddVehicleForm.vue'
import MainContainer from '@/components/layouts/MainContainer.vue'

const isActive = ref(false)
const vehicles = ref([])
const currentPage = ref(1)
const itemsPerPage = ref(6)
const isLoading = ref(true)

const openDialog = () => {
  isActive.value = true
}
const closeAction = () => {
  isActive.value = false
}
const saveAction = () => {
  isActive.value = false
  getVehicles()
}

const paginatedVehicles = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value

  return vehicles.value.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(vehicles.value.length / itemsPerPage.value)
})

const getVehicles = async () => {
  vehicles.value = await fetchVehicles()
  isLoading.value = false
}

onMounted(() => {
  getVehicles()
})
</script>

<style scoped></style>
