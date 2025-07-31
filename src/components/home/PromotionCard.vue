<template>
  <q-card class="col-10 col-sm-5 promotion-card">
    <q-img 
      :src="promocion.imagen" 
      :alt="promocion.titulo"
      ratio="16/9"
    >
      <div v-if="promocion.descuento" class="absolute-top-right q-ma-sm">
        <q-chip color="red" text-color="white" icon="local_offer">
          {{ promocion.descuento }} OFF
        </q-chip>
      </div>
    </q-img>
    
    <div class="q-pa-md">
      <div class="text-h6">{{ promocion.titulo }}</div>
      <div class="text-subtitle2 text-grey q-mb-sm">
        {{ promocion.descripcion }}
      </div>
      
      <div class="row items-center justify-between">
        <div v-if="promocion.precio" class="text-h6 text-primary">
          {{ promocion.precio }}
        </div>
        <q-btn 
          color="primary" 
          label="Pedir ahora" 
          size="sm"
          @click="$emit('order', promocion)"
        />
      </div>
    </div>
  </q-card>
</template>

<script setup>
defineProps({
  promocion: {
    type: Object,
    required: true
  }
})

defineEmits(['order'])
</script>

<style scoped>
.promotion-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.promotion-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}
</style>