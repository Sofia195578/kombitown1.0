<template>
  <div class="q-pa-md">
    <h3 class="text-center text-primary">Promociones</h3>
    <div class="row q-col-gutter-md justify-center">
      <PromotionCard
        v-for="promo in promociones"
        :key="promo.titulo"
        :promocion="promo"
      />
    </div>
  </div>
</template>

<script setup>
import PromotionCard from './PromotionCard.vue'

const promociones = [
  {
    titulo: 'Combo Familiar',
    descripcion: '4 hamburguesas + papas + gaseosas',
    imagen: '/combo1.jpg',
    precio: '$45.000',
    descuento: '20%'
  },
  {
    titulo: '2x1 Perros Calientes',
    descripcion: 'Solo este fin de semana',
    imagen: '/combo2.jpg',
    precio: '$18.000',
    descuento: '50%'
  }
]
</script>