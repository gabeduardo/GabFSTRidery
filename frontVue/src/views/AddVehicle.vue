<template>
  <MainContainer :isLogIn="true">
    <v-form v-model="valid" ref="form" lazy-validation>
      <v-text-field label="Marca" v-model="brand" :rules="brandRules" required></v-text-field>
      <v-text-field name="model" label="Modelo" v-model="model" required></v-text-field>
      <v-select label="Año de Fabricación" v-model="year" :items="years" required></v-select>
      <v-select label="Estado Inicial" v-model="status" :items="statuses" required></v-select>
      <v-btn color="green" @click="submit" :disabled="!valid"> Enviar </v-btn>
      <v-btn @click="clear">Limpiar</v-btn>
    </v-form>
  </MainContainer>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import Swal from 'sweetalert2'
import { jwtDecode } from 'jwt-decode'
import MainContainer from '@/components/layouts/MainContainer.vue'

const valid = ref(false)
const brand = ref('')
const model = ref('')
const year = ref(null)
const status = ref('')
const form = ref(null)

const brandRules = [
  (v) => !!v || 'marca es requerida',
  (v) => (v && v.length <= 20) || 'La marca debe tener menos de 20 caracteres',
]

const years = Array.from({ length: 2025 - 1980 }, (v, k) => k + 1980)
const statuses = ['disponible', 'en mantenimiento', 'en servicio']

const getToken = () => localStorage.getItem('jwtToken')
const getUserIdFromToken = (token) => {
  try {
    const decoded = jwtDecode(token)
    return decoded.id || decoded.userId || decoded.sub
  } catch (error) {
    console.error('Error decodificando el token:', error)
    return null
  }
}

const submit = async () => {
  if (form.value.validate()) {
    try {
      const token = getToken()
      const userId = getUserIdFromToken(token)

      if (!userId) {
        throw new Error('No se pudo obtener el ID del usuario del token.')
      }

      await axios({
        method: 'post',
        data: {
          brand: brand.value,
          model: model.value,
          year: year.value,
          status: status.value.toLowerCase(),
          createdBy: userId,
          updatedBy: userId,
        },
        url: 'http://localhost:3000/vehicles',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      // Success message using SweetAlert2
      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Vehículo creado exitosamente!',
      })

      form.value.reset()
      form.value.resetValidation()
    } catch (error) {
      console.error('Error creando el vehículo:', error)

      // Error message using SweetAlert2
      const errorMessage =
        error.response?.data?.error ||
        'Hubo un problema creando el vehículo. Por favor, inténtalo de nuevo.'
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: errorMessage,
      })
    }
  }
}

const clear = () => {
  form.value.reset()
  form.value.resetValidation()
}
</script>
