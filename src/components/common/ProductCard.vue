<template>
  <q-card class="col-12 col-sm-6 col-md-4 product-card">
    <q-img 
      :src="producto.imagen" 
      :alt="producto.nombre"
      height="200px"
    />
    
    <q-card-section>
      <div class="text-h6">{{ producto.nombre }}</div>
      <div class="text-subtitle2 text-grey-7">
        {{ producto.descripcion }}
      </div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      <div class="row items-center justify-between">
        <div class="text-h6 text-primary">
          ${{ formatPrice(producto.precio) }}
        </div>
        <q-btn 
          color="primary" 
          icon="add_shopping_cart"
          label="Agregar" 
          @click="$emit('add-to-cart', producto)"
        />
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
defineProps({
  producto: {
    type: Object,
    required: true
  }
})

defineEmits(['add-to-cart'])

function formatPrice(price) {
  return new Intl.NumberFormat('es-CO').format(price)
}
</script>

<style scoped>
.product-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}
</style>