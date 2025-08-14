<template>
  <div class="home-page">
    <!-- Carrusel principal -->
    <VideoCarousel />

    <!-- Sección de bienvenida -->
    <section class="welcome-section q-pa-xl text-center">
      <h1 class="text-h3 text-primary text-weight-bold">
        Bienvenido a <span class="brand">Kombitown</span>
      </h1>
      <p class="text-subtitle1 text-grey-7 q-mt-md">
        Sabores irresistibles, ingredientes frescos y combos perfectos para cada antojo.
        ¡Haz tu pedido ahora y vive la experiencia única de nuestra cocina!
      </p>
    </section>

    <!-- Sección ¿Por qué elegirnos? -->
    <section class="why-us-section q-pa-xl">
      <h2 class="text-h4 text-center text-primary q-mb-lg">¿Por qué elegirnos?</h2>

      <div class="row q-col-gutter-lg justify-center">
        <div
          v-for="(item, i) in whyUs"
          :key="i"
          class="col-12 col-sm-6 col-md-3"
        >
          <q-card class="why-card q-pa-md text-center">
            <q-icon :name="item.icon" size="40px" class="text-primary q-mb-md" />
            <div class="text-h6 text-weight-bold q-mb-xs">{{ item.title }}</div>
            <p class="text-caption text-grey-7">{{ item.desc }}</p>
          </q-card>
        </div>
      </div>
    </section>

    <!-- Redes sociales -->
    <section class="social-section q-pa-lg text-center">
      <h2 class="text-h5 text-primary q-mb-md">¡Síguenos en nuestras redes!</h2>
      <div class="row justify-center q-gutter-md">
        <q-btn round color="blue-9" icon="mdi-facebook" @click="goTo('facebook')" />
        <q-btn round color="pink-6" icon="mdi-instagram" @click="goTo('instagram')" />
        <q-btn round color="green-6" icon="mdi-whatsapp" @click="goTo('whatsapp')" />
      </div>
      <p class="text-caption text-grey-6 q-mt-md">
        Entérate de nuestras promos y nuevos lanzamientos al instante.
      </p>
    </section>
  </div>
</template>

<script setup>
import VideoCarousel from '../components/home/VideoCarousel.vue'

const whyUs = [
  { icon: 'mdi-food', title: 'Ingredientes frescos', desc: 'Usamos los mejores ingredientes para garantizar sabor y calidad en cada bocado.' },
  { icon: 'mdi-truck-fast', title: 'Entrega rápida', desc: 'Tu pedido llega caliente, fresco y justo a tiempo, siempre.' },
  { icon: 'mdi-emoticon-happy-outline', title: 'Sabor garantizado', desc: 'Combinamos recetas únicas para sorprender tu paladar.' },
  { icon: 'mdi-cash-multiple', title: 'Precios accesibles', desc: 'Delicioso y económico, porque disfrutar no debe costar de más.' }
]

function goTo(platform) {
  const urls = {
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
    whatsapp: 'https://wa.me/573001234567'
  }
  window.open(urls[platform], '_blank')
}
</script>

<style scoped>
.home-page {
  background-color: #faf9f7;
}

/* Bienvenida */
.welcome-section {
  max-width: 800px;
  margin: auto;
}


.brand {
  color: #e53935;
}

/* Why Us Cards */
.why-card {
  transition: transform 0.2s, box-shadow 0.2s;
  border-radius: 16px;
}
.why-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
}

/* Redes sociales */
.social-section .q-btn {
  transition: transform 0.2s;
}
.social-section .q-btn:hover {
  transform: scale(1.1);
}

@media (max-width: 395px){

  .text-h3{
    margin-left: -20px;
  }
}

@media (max-width: 350px){

  .text-h3{
    margin-left: -40px;
  }
}

@media (max-width: 330px){

  .text-h3{
    margin-left: -30px;
  }
}

</style>
