<template>
  <q-layout view="lHh Lpr lFf">
    <!-- Header -->
    <AppHeader
      :cart-count="carrito.length"
      @toggle-menu="menuAbierto = !menuAbierto"
      @open-cart="carritoAbierto = !carritoAbierto"
    />

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
      :width="300"
      behavior="desktop"
    >
      <Carrito />
    </q-drawer>

    <!-- Contenido -->
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import AppHeader from '../layout/AppHeader.vue'
import SideMenu from '../layout/SideMenu.vue'
import Carrito from '../pages/Carrito.vue'
import { useCarrito } from '../components/composables/useCarrito.js'

const { carrito } = useCarrito()

const menuAbierto = ref(false)
const carritoAbierto = ref(false)
</script>
