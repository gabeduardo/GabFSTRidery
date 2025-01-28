import { createRouter, createWebHistory } from 'vue-router'
import Home from './components/Home.vue'
import AddVehicle from './components/AddVehicle.vue'
import RegisterUser from './components/RegisterUser.vue'
import LoginUser from './components/LoginUser.vue'
import store from './store'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true }, //  para proteger la ruta
  },
  {
    path: '/vehicles/add',
    name: 'AddVehicle',
    component: AddVehicle,
    meta: { requiresAuth: true }, //  para proteger la ruta
  },
  {
    path: '/users/register',
    name: 'Register',
    component: RegisterUser,
  },
  {
    path: '/users/login',
    name: 'Login',
    component: LoginUser,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Comprueba si la ruta requiere autenticación y si el usuario no está autenticado
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.getters.isAuthenticated) {
      // Redirige a la página de inicio de sesión si no está autenticado
      next({ name: 'Login' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
