<template>
  <MainContainer>
    <FormContainer title="Iniciar Sesión">
      <v-form v-model="valid" ref="form" lazy-validation class="w-100">
        <v-text-field label="Email" v-model="email" :rules="emailRules" required></v-text-field>
        <v-text-field label="Password" v-model="password" type="password" required></v-text-field>
        <span class="d-flex flex-column flex-sm-row align-center mb-6">
          ¿Aún no tiene una cuenta?
          <v-list-item :to="REGISTER" class="link-style">Regístrate aquí</v-list-item>
        </span>
        <div class="d-flex ga-2 flex-wrap flex-sm-nowrap">
          <v-btn class="w-100 w-sm-50" color="green" @click="submit" :disabled="!valid">
            Ingresar
          </v-btn>
          <v-btn class="w-100 w-sm-50" @click="clear">Limpiar</v-btn>
        </div>
      </v-form>
    </FormContainer>
  </MainContainer>
</template>

<script setup>
import axios from 'axios'
import Swal from 'sweetalert2'
import { useRouter } from 'vue-router'
import store from '@/store'
import { ref } from 'vue'
import FormContainer from '../components/layouts/FormContainer.vue'
import MainContainer from '../components/layouts/MainContainer.vue'
import { REGISTER } from '@/router/routes'

const valid = ref(false)
const form = ref(null)
const email = ref('')
const password = ref('')
const emailRules = [
  (v) => !!v || 'Email es requerido',
  (v) => /.+@.+/.test(v) || 'Email debe ser válido',
]
const router = useRouter()

const submit = async () => {
  if (valid.value) {
    try {
      const response = await axios.post('http://localhost:3000/users/login', {
        email: email.value,
        password: password.value,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const token = response.data.token;

      // Guarda el token en localStorage
      localStorage.setItem('jwtToken', token);
      store.dispatch('login', token);
      Swal.fire('¡Bienvenido!', 'success');
      console.log("Esta entrando en el EXITO");
      router.push({ name: 'home' });
    } catch (error) {
      console.log("Esta entrando en el ERROR");
      const message = error.response?.data?.message || 'Ocurrió un error';
      Swal.fire('¡Ocurrió un error al iniciar sesión!', message, 'error');
    }
  }
};

const clear = () => {
  form.value.reset();
  email.value = '';
  password.value = '';
};
</script>

<style scoped>
.link-style {
  text-decoration: underline;
  color: #1976d2;
  cursor: pointer;
}
.login-container {
  width: 500px;
  height: 500px;
}
</style>
