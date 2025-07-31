<template>
  <div class="carousel-fullscreen">
    <q-carousel
      v-model="slide"
      navigation
      arrows
      infinite
      animated
      transition-prev="slide-right"
      transition-next="slide-left"
      class="video-carousel"
      style="height: 70vh; max-height: 600px;"
    >
      <q-carousel-slide
        v-for="(video, index) in videos"
        :key="index"
        :name="index"
      >
        <video
          :src="video.src"
          autoplay
          muted
          loop
          playsinline
        ></video>
      </q-carousel-slide>
    </q-carousel>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const slide = ref(0)

const videos = [
  { src: '/videos/hotdog.mp4' },
  { src: '/videos/hamburguesa.mp4' },
  { src: '/videos/salchipapa.mp4' },
  { src: '/videos/bebidas.mp4' }
]
</script>

<style scoped>
.carousel-fullscreen {
  width: 100%;
  height: 60vh;
  background: #000;
}

.video-carousel video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>