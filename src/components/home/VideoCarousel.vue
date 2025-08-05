<template>
  <div class="carousel-wrapper">
    <q-carousel
      v-model="slide"
      animated
      infinite
      swipeable
      arrows
      autoplay
      transition-prev="fade"
      transition-next="fade"
      class="fancy-carousel"
      @mouseenter="pauseCarousel"
      @mouseleave="resumeCarousel"
    >
      <!-- Slides de video -->
      <q-carousel-slide
        v-for="(video, index) in videos"
        :key="index"
        :name="index"
      >
        <div class="video-container">
          <video autoplay muted loop playsinline class="video-slide">
            <source :src="video" type="video/mp4" />
          </video>
          <div class="overlay"></div>
        </div>
      </q-carousel-slide>

      <!-- Indicadores personalizados -->
      <template v-slot:navigation-icon="{ active }">
        <div :class="['indicator', { active }]"></div>
      </template>
    </q-carousel>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const slide = ref(0)
let interval = null

const videos = [
  'public/videos/bebidas.mp4',
  'public/videos/hamburguesa.mp4',
  'public/videos/hotdog.mp4',
  'public/videos/salchipapa.mp4'
]

function pauseCarousel() {
  clearInterval(interval)
}

function resumeCarousel() {
  startAutoplay()
}

function startAutoplay() {
  clearInterval(interval)
  interval = setInterval(() => {
    slide.value = (slide.value + 1) % videos.length
  }, 5000)
}

startAutoplay()
</script>

<style scoped>
.carousel-wrapper {
  width: 100%;
  height: 70vh;
  position: relative;
}

.fancy-carousel {
  height: 100%;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

.video-container {
  width: 100%;
  height: 100%;
  position: relative;
}

.video-slide {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    rgba(0, 0, 0, 0.3),
    rgba(0, 0, 0, 0.3)
  );
}

/* Indicadores personalizados */
.indicator {
  width: 8px;
  height: 8px;
  margin: 0 4px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  transition: all 0.3s;
}
.indicator.active {
  background: #fff;
  transform: scale(1.3);
}
</style>
