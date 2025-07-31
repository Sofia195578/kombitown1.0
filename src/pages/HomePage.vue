<template>
  <div>
    <!-- Carrusel principal -->
    <VideoCarousel />

    <!-- Sección de categorías -->
    <CategorySection />

    <!-- Sección de promociones -->
    <PromotionSection />
  </div>
</template>

<script setup>
import VideoCarousel from '../components/home/VideoCarousel.vue'
import CategorySection from '../components/home/CategorySection.vue'
import PromotionSection from '../components/home/PromotionSection.vue'
</script>