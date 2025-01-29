<template>
  <MainContainer>
    <FormContainer title="Registro">
      <v-form v-model="valid" ref="form" lazy-validation class="w-100">
        <v-text-field
          label="Nombre"
          v-model="name"
          :rules="[(v) => !!v || 'El nombre es requerido']"
          required
        ></v-text-field>

        <v-text-field
          label="Correo electrónico"
          v-model="email"
          :rules="emailRules"
          required
        ></v-text-field>

        <v-text-field
          label="Contraseña"
          v-model="password"
          :rules="[(v) => !!v || 'La contraseña es requerida']"
          type="password"
          required
        ></v-text-field>

        <v-text-field
          name="input-7-1"
          label="Confirmar contraseña"
          v-model="confirm_password"
          :rules="[
            (v) => !!v || 'La confirmación de la contraseña es requerida',
            (v) => v === password || 'Las contraseñas no coinciden',
          ]"
          type="password"
          required
        ></v-text-field>
        <div class="d-flex align-center mb-6">
          ¿Ya tienes una cuenta?
          <v-list-item :to="LOGIN" class="link-style">Iniciar sesión</v-list-item>
        </div>

        <div class="d-flex ga-2 flex-wrap flex-sm-nowrap">
          <v-btn class="w-100 w-sm-50" color="green" @click="submit" :disabled="!valid"
            >Enviar</v-btn
          >
          <v-btn class="w-100 w-sm-50" @click="clear">Limpiar</v-btn>
        </div>
      </v-form>
    </FormContainer>
  </MainContainer>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { LOGIN } from '@/router/routes'
import { register } from '@/api/autentication'
import FormContainer from '@/components/layouts/FormContainer.vue'
import MainContainer from '@/components/layouts/MainContainer.vue'

const valid = ref(false)
const name = ref('')
const email = ref('')
const password = ref('')
const confirm_password = ref('')
const router = useRouter()

// Reglas de validación para el correo electrónico
const emailRules = [
  (v) => !!v || 'El correo electrónico es requerido',
  (v) => /.+@.+\..+/.test(v) || 'Introduzca un correo electrónico válido',
]

// Función para enviar el formulario
const submit = async () => {
  if (!valid.value) return
  const response = register({
    name: name.value,
    email: email.value,
    password: password.value,
  })
  if (response) router.push({ name: 'login' })
}

// Función para limpiar el formulario
const clear = () => {
  name.value = ''
  email.value = ''
  password.value = ''
  confirm_password.value = ''
  valid.value = false
}
</script>

<style scoped>
.link-style {
  text-decoration: underline;
  color: #1976d2;
  cursor: pointer;
}
</style>
