<template>
  <q-layout view="lHh Lpr lFf">
    <!-- Header -->
    <AppHeader
      :cart-count="carrito.length"
      @toggle-menu="toggleMenu"
      @open-cart="mostrarCarrito = true"
    />

    <!-- Menú lateral -->
    <SideMenu
      v-model="menuAbierto"
      @close="menuAbierto = false"
    />

    <!-- Contenido de las páginas -->
    <q-page-container>
      <router-view />
    </q-page-container>

    <!-- Carrito -->
    <Carrito
      v-if="mostrarCarrito"
      @cerrar="mostrarCarrito = false"
    />
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import AppHeader from '../layout/AppHeader.vue'
import SideMenu from '../layout/SideMenu.vue'
import Carrito from '../pages/Carrito.vue'
import { useCarrito } from '../components/composables/useCarrito.js'

const { carrito } = useCarrito()

const mostrarCarrito = ref(false)
const menuAbierto = ref(false)

function toggleMenu() {
  menuAbierto.value = !menuAbierto.value
}
</script>
