<template>
    <v-form v-model="valid" ref="form" lazy-validation>
      <v-text-field
        label="Email"
        v-model="email"
        :rules="emailRules"
        required
      ></v-text-field>
      <v-text-field
        label="Password"
        v-model="password"
        type="password"
        required
      ></v-text-field>
      <v-btn color="green"  @click="submit" :disabled="!valid">
        Submit
      </v-btn>
      <v-btn @click="clear">Clear</v-btn>
    </v-form>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import axios from 'axios';
  import Swal from 'sweetalert2';
  import { useRouter } from 'vue-router';
  
  const valid = ref(false);
  const form = ref(null);
  const email = ref('');
  const password = ref('');
  const emailRules = [
    v => !!v || 'Email es requerido',
    v => /.+@.+/.test(v) || 'Email debe ser válido'
  ];
  const router = useRouter();
  
  const submit = async () => {
    if (valid.value) {
      try {
        await axios.post('http://localhost:3000/users/login', {
          email: email.value,
          password: password.value,
        }, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        Swal.fire('¡Bienvenido!', 'success');
        console.log("Esta entrando en el EXITO");
        router.push({ name: 'Home' });
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

  </style>
  