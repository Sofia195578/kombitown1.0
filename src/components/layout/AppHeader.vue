<template>
  <q-header elevated class="bg-primary text-white">
    <q-toolbar>

      <!-- Título -->
      <q-toolbar-title>
        Kombitown
      </q-toolbar-title>

      <!-- Barra de búsqueda -->
      <q-input
        dense
        debounce="300"
        v-model="localValue"
        placeholder="Buscar..."
        class="q-mx-md"
        outlined
        rounded
        bg-color="white"
        color="black"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>

      <!-- Botón del carrito -->
      <q-btn
        flat
        dense
        round
        icon="shopping_cart"
        @click="$emit('open-cart')"
      >
        <q-badge
          v-if="cartCount > 0"
          color="red"
          floating
        >
          {{ cartCount }}
        </q-badge>
      </q-btn>

      <!-- Botón menú lateral -->
      <q-btn
        flat
        dense
        round
        icon="menu"
        @click="$emit('toggle-menu')"
      />
    </q-toolbar>
  </q-header>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: String,
  cartCount: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['update:modelValue', 'toggle-menu', 'open-cart'])

// Valor interno sincronizado
const localValue = ref(props.modelValue)

// Si cambia en el padre, actualizamos aquí
watch(() => props.modelValue, (val) => {
  localValue.value = val
})

// Emitimos al padre cuando cambia aquí
watch(localValue, (val) => {
  emit('update:modelValue', val)
})
</script>
