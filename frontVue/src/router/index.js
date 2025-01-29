import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import RegisterUser from '@/views/Register.vue'
import LoginUser from '@/views/Login.vue'
import store from '@/store'
import { HOME, LOGIN, REGISTER } from './routes'

const routes = [
  {
    path: HOME,
    name: 'home',
    component: Home,
    meta: { requiresAuth: true }, //  para proteger la ruta
  },
  {
    path: REGISTER,
    name: 'register',
    component: RegisterUser,
  },
  {
    path: LOGIN,
    name: 'login',
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
      next({ name: 'login' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
