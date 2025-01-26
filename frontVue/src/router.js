import { createRouter, createWebHistory } from 'vue-router'
import Home from './components/Home.vue'
import AddVehicle from './components/AddVehicle.vue'
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
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
