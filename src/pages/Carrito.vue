<template>
  <div class="q-pa-md full-height flex column">
    <div class="text-h5 text-primary text-center q-mb-md">🛒 Carrito</div>

    <q-scroll-area class="col">
      <q-list separator>
        <q-item v-for="(item, index) in carrito" :key="index">
          <q-item-section avatar>
            <q-img :src="item.imagen" ratio="1" class="rounded-borders" />
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-weight-bold">{{ item.nombre }}</q-item-label>
            <q-item-label caption v-if="item.notas">{{ item.notas }}</q-item-label>
            <q-item-label caption v-if="item.extras.length">
              Extras: {{ item.extras.map(e => e.nombre).join(', ') }}
            </q-item-label>
          </q-item-section>

          <q-item-section side>
            <div class="row items-center">
              <q-btn dense flat round icon="remove" @click="updateQuantity(item.id, item.cantidad - 1)" />
              <span class="q-mx-sm">{{ item.cantidad }}</span>
              <q-btn dense flat round icon="add" @click="updateQuantity(item.id, item.cantidad + 1)" />
            </div>
            <div class="text-primary text-weight-bold text-right">
              ${{ (item.precio * item.cantidad).toLocaleString() }}
            </div>
          </q-item-section>

          <q-item-section side>
            <q-btn flat dense round icon="delete" color="negative" @click="removeItem(item.id)" />
          </q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>

    <q-separator class="q-my-md" />

    <div class="text-h6 text-center">
      Total: ${{ total.toLocaleString() }}
    </div>

    <div class="row justify-around q-mt-md">
      <q-btn color="negative" flat label="Vaciar Carrito" @click="clearCart" />
      <q-btn color="primary" label="Pagar" @click="pagar" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useCarrito } from '../components/composables/useCarrito.js'

const { carrito, updateQuantity, removeItem, clearCart } = useCarrito()

const total = computed(() =>
  carrito.value.reduce((sum, item) => sum + item.precio * item.cantidad, 0)
)

function pagar() {
  alert('Procesar pago...')
}
</script>
