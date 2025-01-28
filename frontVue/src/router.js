import { createRouter, createWebHistory } from 'vue-router'
import Home from './components/Home.vue'
import AddVehicle from './components/AddVehicle.vue'
import RegisterUser from './components/RegisterUser.vue'
import LoginUser from './components/LoginUser.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/vehicles/add',
    name: 'AddVehicle',
    component: AddVehicle,
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

export default router
