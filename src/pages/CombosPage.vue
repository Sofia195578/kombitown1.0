<template>
  <div class="q-pa-md">
    <div class="text-h4 text-center text-primary q-mb-lg">
      🎉 Promociones
    </div>

    <div class="row q-col-gutter-md q-mt-md">
      <div 
        v-for="promo in promociones" 
        :key="promo.id" 
        class="col-12 col-sm-6 col-md-3"
      >
        <q-card 
          class="hamburguesas-card cursor-pointer"
          @click="verPromocion(promo)"
        >
          <!-- Imagen -->
          <q-img 
            :src="promo.imagen" 
            :alt="promo.titulo"
            ratio="1"
            class="hamburguesas-imagen"
          />

          <!-- Info -->
          <q-card-section>
            <div class="text-h6 text-weight-bold">{{ promo.titulo }}</div>
            <div class="text-caption text-grey-7 q-mt-xs">
              {{ promo.descripcion }}
            </div>
          </q-card-section>

          <!-- Precio + botón -->
          <q-card-section class="q-pt-none">
            <div class="row items-center justify-between">
              <div class="text-h6 text-primary text-weight-bold">
                {{ promo.precio > 0 ? '$' + promo.precio.toLocaleString() : 'Gratis' }}
              </div>
              <q-btn 
                round 
                color="primary" 
                icon="add_shopping_cart"
                size="sm"
                @click.stop="agregarAlCarrito(promo)"
              />
            </div>
            <div v-if="promo.descuento" class="text-caption text-red q-mt-xs">
              ¡{{ promo.descuento }}% de descuento!
            </div>
          </q-card-section>

          <!-- Badge descuento -->
          <q-badge 
            v-if="promo.descuento"
            color="red" floating class="text-white">
            {{ promo.descuento }}% OFF
          </q-badge>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Swal from 'sweetalert2'
import { useCarrito } from '../components/composables/useCarrito.js'

const { agregarItem } = useCarrito()

const promociones = ref([
  {
    id: 101,
    titulo: 'Combo Familiar',
    descripcion: '4 hamburguesas + papas + gaseosas',
    imagen: '/public/combos/1.jpg',
    precio: 45000,
    descuento: 20
  },
  {
    id: 102,
    titulo: '2x1 Perros Calientes',
    descripcion: 'Solo este fin de semana',
    imagen: '/public/combos/2.jpg',
    precio: 18000,
    descuento: 50
  },
  {
    id: 103,
    titulo: 'Mega Combo Pizza + Bebida',
    descripcion: 'Pizza grande + gaseosa 1.5L',
    imagen: '/public/combos/3.jpg',
    precio: 30000,
    descuento: 15
  },
  {
    id: 104,
    titulo: 'Postre Gratis',
    descripcion: 'Por la compra de 2 hamburguesas',
    imagen: '/public/combos/4.jpg',
    precio: 0,
    descuento: 100
  }
])

// Emitir evento si quieres manejar la vista de detalle
const emit = defineEmits(['promocion-seleccionada'])

function verPromocion(promo) {
  emit('promocion-seleccionada', promo)
}

function agregarAlCarrito(promo) {
  agregarItem(promo, 1, [], '') // No hay extras para combos
  Swal.fire({
    title: '¡Agregado al carrito!',
    text: `${promo.titulo} se agregó correctamente`,
    icon: 'success',
    timer: 1500,
    showConfirmButton: false,
    position: 'top-end',
    toast: true
  })
}
</script>

<style scoped>
.promo-card {
  position: relative;
  transition: transform 0.2s, box-shadow 0.2s;
  height: 100%;
}

.promo-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.promo-imagen {
  transition: transform 0.3s;
}

.promo-card:hover .promo-imagen {
  transform: scale(1.05);
}

.q-badge {
  position: absolute;
  z-index: 10;
}
</style>
