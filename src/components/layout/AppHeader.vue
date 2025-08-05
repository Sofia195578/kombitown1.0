<template>
  <q-header elevated class="bg-primary text-white">
    <q-toolbar>

      <!-- Título centrado o a la izquierda -->
      <q-toolbar-title>
        Kombitown
      </q-toolbar-title>

      <!-- Barra de búsqueda (opcional moverla) -->
      <q-input
        dense
        debounce="300"
        :model-value="modelValue"
        @update:model-value="$emit('update:modelValue', $event)"
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

      <!-- Botón para abrir/cerrar menú lateral (ahora a la derecha) -->
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
defineProps({
  modelValue: String,
  cartCount: {
    type: Number,
    default: 0
  }
})

defineEmits(['update:modelValue', 'toggle-menu', 'open-cart'])
</script>
