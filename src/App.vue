<template>
  <q-layout view="lHh Lpr lFf">
    <!-- HEADER -->
    <AppHeader 
      v-model:busqueda="busqueda"
      :cart-count="carrito.length"
      @toggle-menu="toggleMenu"
      @open-cart="toggleCart"
    />

    <!-- MENÚ LATERAL -->
    <SideMenu v-model="leftDrawerOpen" />

    <!-- CONTENIDO PRINCIPAL -->
    <q-page-container>
      <router-view />
    </q-page-container>

    <!-- DRAWER CARRITO -->
    <q-drawer
      v-model="cartDrawer"
      side="right"
      overlay
      bordered
      :width="300"
    >
      <CartDrawer 
        :items="carrito"
        @update-quantity="updateQuantity"
        @remove-item="removeItem"
        @clear-cart="clearCart"
      />
    </q-drawer>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import AppHeader from './components/layout/AppHeader.vue'
import SideMenu from './components/layout/SideMenu.vue'
import CartDrawer from './components/cart/CartDrawer.vue'
import { useCarrito } from './components/composables/useCarrito.js'

const busqueda = ref('')
const cartDrawer = ref(false)
const leftDrawerOpen = ref(false)

// Estado global del carrito
const { carrito, updateQuantity, removeItem, clearCart } = useCarrito()

function toggleMenu() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

function toggleCart() {
  cartDrawer.value = !cartDrawer.value
}
</script>
