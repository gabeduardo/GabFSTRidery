<template>
  <v-form v-model="valid" ref="form" lazy-validation>
    <v-text-field label="Marca" v-model="brand" :rules="brandRules" required></v-text-field>
    <v-text-field label="Modelo" v-model="model" :rules="modelRules" required></v-text-field>
    <v-select
      label="Año de Fabricación"
      v-model="year"
      :items="years"
      :rules="yearRules"
      required
    ></v-select>
    <v-select
      label="Estado Inicial"
      v-model="status"
      :items="statuses"
      :rules="statusRules"
      required
    ></v-select>
    <div class="d-flex ga-2 flex-wrap flex-sm-nowrap">
      <v-btn class="w-100 w-sm-50" color="green" @click="submit" :disabled="!valid">Enviar</v-btn>
      <v-btn class="w-100 w-sm-50" @click="clear">Limpiar</v-btn>
    </div>
  </v-form>
</template>

<script setup>
import { ref } from 'vue'
import { createVehicle } from '@/api/vehicleService'

const props = defineProps({
  closeAction: {
    type: Function,
  },
})
const valid = ref(false)
const brand = ref('')
const model = ref('')
const year = ref(null)
const status = ref('')
const form = ref(null)

const brandRules = [
  (v) => !!v || 'Marca es requerida',
  (v) => (v && v.length <= 20) || 'La marca debe tener menos de 20 caracteres',
]

const modelRules = [(v) => !!v || 'Modelo es requerido']
const yearRules = [(v) => !!v || 'El año es requerido']
const statusRules = [(v) => !!v || 'El estado es requerido']

const years = Array.from({ length: 2025 - 1980 }, (v, k) => k + 1980)
const statuses = ['disponible', 'en mantenimiento', 'en servicio']

const submit = async () => {
  if (!valid.value) return

  const response = await createVehicle({
    brand: brand.value,
    model: model.value,
    year: year.value,
    status: status.value.toLowerCase(),
  })
  if (response) {
    form.value.reset()
    form.value.resetValidation()
  }
  props.closeAction()
}

const clear = () => {
  form.value.reset()
  form.value.resetValidation()
}
</script>
