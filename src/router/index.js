import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import HamburguesasPage from '../pages/HamburguesasPage.vue'
import PerrosSalchipapasPage from '../pages/PerrosSalchipapasPage.vue'
import BebidasPage from '../pages/BebidasPage.vue'
import CombosPage from '../pages/CombosPage.vue'
import ExtrasPage from '../pages/ExtrasPage.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/hamburguesas',
    name: 'hamburguesas',
    component: HamburguesasPage
  },
  {
    path: '/bebidas',
    name: 'bebidas',
    component: BebidasPage
  },
  { path: '/perros-salchipapas', 
    component: PerrosSalchipapasPage 
  },
  { path: '/combos', 
    component: CombosPage 
  },
  { path: '/extras', 
    component: ExtrasPage 
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router