<script setup>
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <header>
          <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />
          <div class="wrapper">
            <HelloWorld msg="You did it!" />
          </div>
        </header>
        <main>
          <TheWelcome />
        </main>
        <!-- Verifica que Vuetify esté funcionando -->
        <v-btn color="primary">Hola Vuetify</v-btn>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

/* Estilos responsivos */
@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
