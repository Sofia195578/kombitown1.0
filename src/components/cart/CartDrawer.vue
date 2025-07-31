<template>
  <div class="q-pa-md">
    <div class="text-h6 q-mb-md">Carrito</div>
    
    <div v-if="items.length === 0" class="text-grey text-center">
      Tu carrito está vacío
    </div>

    <q-list v-else>
      <q-item v-for="item in items" :key="item.id">
        <q-item-section>
          <!-- Nombre del producto -->
          <q-item-label>{{ item.nombre }}</q-item-label>

          <!-- Mostrar extras si existen -->
          <q-item-label caption v-if="item.extras.length > 0">
            Extras: {{ item.extras.map(extra => extra.nombre).join(', ') }}
          </q-item-label>

          <!-- Precio con extras -->
          <q-item-label caption>
            ${{ (item.precio * item.cantidad).toLocaleString() }}
            ({{ item.cantidad }} x ${{ item.precio.toLocaleString() }})
          </q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-btn dense icon="remove" @click="$emit('update-quantity', item.id, item.cantidad - 1)" />
          <q-btn dense icon="add" @click="$emit('update-quantity', item.id, item.cantidad + 1)" />
          <q-btn dense icon="delete" color="red" @click="$emit('remove-item', item.id)" />
        </q-item-section>
      </q-item>
    </q-list>

    <!-- Total del carrito -->
    <div class="text-right text-h6 q-mt-md" v-if="items.length > 0">
      Total: ${{ calcularTotalCarrito().toLocaleString() }}
    </div>

    <q-btn 
      color="red" 
      label="Vaciar carrito" 
      class="q-mt-md full-width btn-vaciar" 
      @click="$emit('clear-cart')" 
    />
  </div>
</template>

<script setup>
const props = defineProps({
  items: Array
})

defineEmits(['update-quantity', 'remove-item', 'clear-cart'])

// Calculamos el total del carrito
function calcularTotalCarrito() {
  return props.items.reduce((sum, item) => sum + (item.precio * item.cantidad), 0)
}
</script>
