<template>
  <q-card 
    class="col-5 col-sm-3 cursor-pointer category-card"
    @click="$emit('click')"
  >
    <q-img 
      :src="categoria.imagen" 
      :alt="categoria.titulo"
      ratio="1" 
    />
    <div class="text-center q-pa-sm">
      {{ categoria.titulo }}
    </div>
  </q-card>
</template>

<script setup>
defineProps({
  categoria: {
    type: Object,
    required: true
  }
})

defineEmits(['click'])
</script>

<style scoped>
.category-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.category-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
</style>