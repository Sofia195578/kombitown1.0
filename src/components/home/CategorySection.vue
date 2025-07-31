<template>
  <div class="q-pa-md">
    <h3 class="text-center text-primary">Categorías</h3>
    <div class="row q-col-gutter-md justify-center">
      <CategoryCard
        v-for="categoria in categorias"
        :key="categoria.titulo"
        :categoria="categoria"
        @click="handleCategoryClick(categoria)"
      />
    </div>
  </div>
</template>

<script setup>
import CategoryCard from './CategoryCard.vue'

const categorias = [
  { titulo: 'Hamburguesas', imagen: '/hamburguesa.jpg', route: '/hamburguesas' },
  { titulo: 'Perros Calientes', imagen: '/perros.jpg', route: '/perros' },
  { titulo: 'Salchipapa', imagen: '/salchipapa.jpg', route: '/salchipapa' },
  { titulo: 'Bebidas', imagen: '/bebidas.jpg', route: '/bebidas' }
]

const emit = defineEmits(['category-selected'])

function handleCategoryClick(categoria) {
  emit('category-selected', categoria)
}
</script>