<template>
  <v-app-bar fixed app>
    <v-spacer></v-spacer>
    <template v-if="isLogIn">
      <v-menu>
        <template v-slot:activator="{ props: menu }">
          <v-avatar v-bind="menu" color="grey" size="40" class="mr-4 cursor-pointer">
            <v-icon icon="mdi-account-circle"></v-icon>
          </v-avatar>
        </template>
        <v-list>
          <v-list-item @click="logout">Cerrar sesión </v-list-item>
        </v-list>
      </v-menu>
    </template>
    <template v-else>
      <v-list-item :to="LOGIN" class="link-style">Iniciar sesión</v-list-item>
      <v-list-item :to="REGISTER" class="link-style">Registrarse</v-list-item>
    </template>
  </v-app-bar>
</template>

<script setup>
import { LOGIN, REGISTER } from '@/router/routes'
import store from '@/store'
import { useRouter } from 'vue-router'

defineProps({ isLogIn: { type: Boolean } })

const router = useRouter()

const logout = () => {
  store.dispatch('logout')
  router.push({ name: 'login' })
}
</script>

<style scoped>
.link-style {
  cursor: pointer;
}
</style>
