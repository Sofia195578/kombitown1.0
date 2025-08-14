<template>
  <q-layout view="lHh Lpr lFf">
    <!-- Header -->
    <q-header ref="header" elevated>
      <AppHeader
        :cart-count="carrito.length"
        :model-value="searchQuery"
        @update:model-value="searchQuery = $event"
        @toggle-menu="toggleMenu"
        @open-cart="mostrarCarrito = true"
      />
    </q-header>

    <!-- Drawer menú lateral -->
    <q-drawer
      v-model="menuAbierto"
      side="left"
      bordered
      show-if-above
      :width="260"
      behavior="desktop"
    >
      <SideMenu @close="menuAbierto = false" />
    </q-drawer>

    <!-- Drawer carrito (lado derecho) -->
    <q-drawer
      v-model="carritoAbierto"
      side="right"
      bordered
      show-if-above
      :width="260"
      behavior="desktop"
      class="carrito-drawer"
    >
      <Carrito />
    </q-drawer>

    <!-- Contenido -->
    <q-page-container ref="pageContainer">
      <router-view :search-query="searchQuery" />
    </q-page-container>

    <!-- Carrito -->
    <Carrito
      v-if="mostrarCarrito"
      @cerrar="mostrarCarrito = false"
    />
  </q-layout>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import AppHeader from '../layout/AppHeader.vue'
import SideMenu from '../layout/SideMenu.vue'
import Carrito from '../pages/Carrito.vue'
import { useCarrito } from '../components/composables/useCarrito.js'

const { carrito } = useCarrito()

const menuAbierto = ref(false)
const carritoAbierto = ref(false)
const mostrarCarrito = ref(false)
const searchQuery = ref('')

const header = ref(null)
const pageContainer = ref(null)

function toggleMenu() {
  menuAbierto.value = !menuAbierto.value
}

function ajustarPadding() {
  if (header.value && pageContainer.value) {
    pageContainer.value.$el.style.paddingTop =
      header.value.$el.offsetHeight + 'px'
  }
}

onMounted(() => {
  ajustarPadding()
  window.addEventListener('resize', ajustarPadding)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', ajustarPadding)
})
</script>
