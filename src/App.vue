<template>
  <q-layout view="lHh Lpr lFf">
    <!-- HEADER -->
    <AppHeader 
      v-model:busqueda="busqueda"
      :cart-count="obtenerCantidadItems()"
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
      :width="getCartWidth()"
      :breakpoint="0"
      class="cart-drawer-container"
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
import { useQuasar } from 'quasar'
import AppHeader from './components/layout/AppHeader.vue'
import SideMenu from './components/layout/SideMenu.vue'
import CartDrawer from './components/cart/CartDrawer.vue'
import { useCarrito } from './components/composables/useCarrito.js'

const $q = useQuasar()
const busqueda = ref('')
const cartDrawer = ref(false)
const leftDrawerOpen = ref(false)

// Estado global del carrito
const { carrito, updateQuantity, removeItem, clearCart, obtenerCantidadItems } = useCarrito()

function toggleMenu() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

function toggleCart() {
  cartDrawer.value = !cartDrawer.value
}

// Función para calcular el ancho del carrito según el tamaño de pantalla
function getCartWidth() {
  if ($q.screen.xs) {
    return '100vw' // Pantallas muy pequeñas: ancho completo
  } else if ($q.screen.sm) {
    return 300 // Pantallas pequeñas: 300px
  } else {
    return 350 // Pantallas normales: 350px
  }
}
</script>

<style>
/* Responsive para el drawer del carrito */
@media (max-width: 599px) {
  .cart-drawer-container {
    width: 100vw !important;
  }
}

@media (max-width: 480px) {
  .cart-drawer-container {
    width: 100vw !important;
  }
  
  .cart-drawer-container .q-drawer__content {
    overflow-x: hidden !important;
  }
}

@media (max-width: 360px) {
  .cart-drawer-container .q-pa-md {
    padding: 8px !important;
  }
}

@media (max-width: 320px) {
  .cart-drawer-container .q-pa-md {
    padding: 4px !important;
  }
}
</style>