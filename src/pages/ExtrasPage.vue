<template>
  <div class="q-pa-md">
    <div class="text-h4 text-center text-primary q-mb-lg">
      🍽️ Comidas Extras & Adicionales
    </div>

    <!-- Pestañas para diferentes tipos de extras -->
    <q-tabs
      v-model="tabActiva"
      dense
      class="text-grey"
      active-color="primary"
      indicator-color="primary"
      align="justify"
      narrow-indicator
    >
      <q-tab name="acompañamientos" label="Acompañamientos" />
      <q-tab name="salsas" label="Salsas" />
      <q-tab name="postres" label="Postres" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="tabActiva" animated>
      <!-- Panel de Acompañamientos -->
      <q-tab-panel name="acompañamientos">
        <div class="row q-col-gutter-md q-mt-md">
          <div 
            v-for="acompañamiento in acompañamientos" 
            :key="acompañamiento.id"
            class="col-12 col-sm-6 col-md-3"
          >
            <q-card class="hamburguesa-card cursor-pointer" @click="seleccionarExtra(acompañamiento)">
              <q-img 
                :src="acompañamiento.imagen" 
                :alt="acompañamiento.nombre"
                ratio="1"
                class="hamburguesa-imagen"
              />
              
              <q-card-section>
                <div class="text-h6 text-weight-bold">{{ acompañamiento.nombre }}</div>
                <div class="text-caption text-grey-7 q-mt-xs">
                  {{ acompañamiento.descripcion }}
                </div>
              </q-card-section>

              <q-card-section class="q-pt-none">
                <div class="row items-center justify-between">
                  <div class="text-h6 text-primary text-weight-bold">
                    ${{ acompañamiento.precio.toLocaleString() }}
                  </div>
                  <q-btn 
                    round 
                    color="primary" 
                    icon="add_shopping_cart"
                    size="sm"
                    @click.stop="agregarAlCarrito(acompañamiento)"
                  />
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-tab-panel>

      <!-- Panel de Salsas -->
      <q-tab-panel name="salsas">
        <div class="row q-col-gutter-md q-mt-md">
          <div 
            v-for="salsa in salsas" 
            :key="salsa.id"
            class="col-12 col-sm-6 col-md-3"
          >
            <q-card class="hamburguesa-card cursor-pointer" @click="seleccionarExtra(salsa)">
              <q-img 
                :src="salsa.imagen" 
                :alt="salsa.nombre"
                ratio="1"
                class="hamburguesa-imagen"
              />
              
              <q-card-section>
                <div class="text-h6 text-weight-bold">{{ salsa.nombre }}</div>
                <div class="text-caption text-grey-7 q-mt-xs">
                  {{ salsa.descripcion }}
                </div>
                <div v-if="salsa.picante" class="text-red q-mt-sm">
                  🌶️ Nivel de picante: {{ salsa.nivelPicante }}/5
                </div>
              </q-card-section>

              <q-card-section class="q-pt-none">
                <div class="row items-center justify-between">
                  <div class="text-h6 text-primary text-weight-bold">
                    ${{ salsa.precio.toLocaleString() }}
                  </div>
                  <q-btn 
                    round 
                    color="primary" 
                    icon="add_shopping_cart"
                    size="sm"
                    @click.stop="agregarAlCarrito(salsa)"
                  />
                </div>
              </q-card-section>

              <q-badge 
                v-if="salsa.picante"
                color="red" floating class="text-white">
                🌶️ Picante
              </q-badge>
            </q-card>
          </div>
        </div>
      </q-tab-panel>

      <!-- Panel de Postres -->
      <q-tab-panel name="postres">
        <div class="row q-col-gutter-md q-mt-md">
          <div 
            v-for="postre in postres" 
            :key="postre.id"
            class="col-12 col-sm-6 col-md-3"
          >
            <q-card class="hamburguesa-card cursor-pointer" @click="seleccionarExtra(postre)">
              <q-img 
                :src="postre.imagen" 
                :alt="postre.nombre"
                ratio="1"
                class="hamburguesa-imagen"
              />
              
              <q-card-section>
                <div class="text-h6 text-weight-bold">{{ postre.nombre }}</div>
                <div class="text-caption text-grey-7 q-mt-xs">
                  {{ postre.descripcion }}
                </div>
                <div v-if="postre.sabores" class="q-mt-sm">
                  <q-chip 
                    v-for="sabor in postre.sabores" 
                    :key="sabor"
                    size="sm" 
                    color="purple-2"
                    text-color="purple-8"
                  >
                    {{ sabor }}
                  </q-chip>
                </div>
              </q-card-section>

              <q-card-section class="q-pt-none">
                <div class="row items-center justify-between">
                  <div class="text-h6 text-primary text-weight-bold">
                    ${{ postre.precio.toLocaleString() }}
                  </div>
                  <q-btn 
                    round 
                    color="primary" 
                    icon="add_shopping_cart"
                    size="sm"
                    @click.stop="agregarAlCarrito(postre)"
                  />
                </div>
              </q-card-section>

              <q-badge 
                v-if="postre.frio"
                color="light-blue"
                floating
                class="text-white"
              >
                ❄️ Frío
              </q-badge>
            </q-card>
          </div>
        </div>
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Swal from 'sweetalert2'
import { useCarrito } from '../components/composables/useCarrito.js'

const { agregarItem } = useCarrito()

const tabActiva = ref('acompañamientos')

const acompañamientos = ref([
  { id: 201, nombre: 'Papas Fritas', descripcion: 'Papas fritas crujientes', precio: 5000, imagen: '/public/extras/1.jpg' },
  { id: 202, nombre: 'Aros de Cebolla', descripcion: 'Aros de cebolla empanizados', precio: 6000, imagen: '/public/extras/2.jpg' },
  { id: 203, nombre: 'Yuca Frita', descripcion: 'Yuca frita tradicional', precio: 4500, imagen: '/public/extras/3.jpg' },
  { id: 204, nombre: 'Plátano Maduro', descripcion: 'Plátano maduro asado', precio: 3500, imagen: '/public/extras/4.jpg' }
])

const salsas = ref([
  { id: 301, nombre: 'Salsa Rosada', descripcion: 'Salsa tradicional de la casa', precio: 1000, imagen: '/public/extras/5.jpg', picante: false, nivelPicante: 0 },
  { id: 302, nombre: 'Salsa BBQ', descripcion: 'Salsa barbacoa ahumada', precio: 1500, imagen: '/public/extras/6.jpg', picante: false, nivelPicante: 0 },
  { id: 303, nombre: 'Salsa Picante', descripcion: 'Salsa con ají y especias', precio: 1200, imagen: '/public/extras/7.jpg', picante: true, nivelPicante: 3 },
  { id: 304, nombre: 'Salsa de Ajo', descripcion: 'Salsa cremosa con ajo', precio: 1300, imagen: '/public/extras/8.jpg', picante: false, nivelPicante: 0 },
  { id: 305, nombre: 'Salsa Diabla', descripcion: 'La más picante de la casa', precio: 2000, imagen: '/public/extras/9.jpg', picante: true, nivelPicante: 5 }
])

const postres = ref([
  {
    id: 401,
    nombre: 'Helado',
    descripcion: 'Helado cremoso en diferentes sabores',
    precio: 4000,
    imagen: '/public/extras/10.jpg',
    frio: true,
    sabores: ['Vainilla', 'Chocolate', 'Fresa']
  },
  {
    id: 402,
    nombre: 'Brownie',
    descripcion: 'Brownie de chocolate con nueces',
    precio: 5500,
    imagen: '/public/extras/11.jpg',
    frio: false
  },
  {
    id: 403,
    nombre: 'Milkshake',
    descripcion: 'Batido cremoso con helado',
    precio: 6000,
    imagen: '/public/extras/12.jpg',
    frio: true,
    sabores: ['Vainilla', 'Chocolate', 'Fresa', 'Oreo']
  },
  {
    id: 404,
    nombre: 'Pie de Limón',
    descripcion: 'Torta de limón con merengue',
    precio: 4500,
    imagen: '/public/extras/13.jpg',
    frio: true
  },
  {
    id: 405,
    nombre: 'Frappe Sencillo',
    descripcion: 'Frappe con crema batida',
    precio: 9000,
    imagen: '/public/extras/14.jpg',
    frio: true
  },
  {
    id: 406,
    nombre: 'Frappe Arequipeño',
    descripcion: 'Frappe con arequipe, oblea y crema batida',
    precio: 14500,
    imagen: '/public/extras/15.jpg',
    frio: true
  },
  {
    id: 407,
    nombre: 'Frappe Cocosete',
    descripcion: 'Frappe con arequipe, cocosete, helado y crema batida',
    precio: 15500,
    imagen: '/public/extras/16.jpg',
    frio: true,
    sabores: ['Oreo', 'Chicle', 'Vainilla']
  },
  {
    id: 408,
    nombre: 'Frappe Brownie',
    descripcion: 'Frappe con brownie, helado y crema batida',
    precio: 16000,
    imagen: '/public/extras/17.jpg',
    frio: true,
    sabores: ['Maracuya', 'Ron con pasas', 'Fresa']
  }
])

const emit = defineEmits(['extra-seleccionado'])

function seleccionarExtra(extra) {
  emit('extra-seleccionado', extra)
}

// AGREGAR AL CARRITO CON SELECCIÓN DE SABOR
async function agregarAlCarrito(extra) {
  let notas = ''

  // Si el extra tiene sabores disponibles, mostramos un select
  if (extra.sabores) {
    const { value: saborElegido } = await Swal.fire({
      title: `Elige sabor para ${extra.nombre}`,
      input: 'select',
      inputOptions: extra.sabores.reduce((acc, sabor) => {
        acc[sabor] = sabor
        return acc
      }, {}),
      inputPlaceholder: 'Selecciona un sabor',
      showCancelButton: true,
      confirmButtonText: 'Agregar',
      cancelButtonText: 'Cancelar'
    })

    if (!saborElegido) return // si canceló, no agrega

    notas = `Sabor: ${saborElegido}`
  }

  agregarItem(extra, 1, [], notas)

  Swal.fire({
    title: '¡Agregado al carrito!',
    text: `${extra.nombre}${notas ? ' - ' + notas : ''} se agregó correctamente`,
    icon: 'success',
    timer: 1500,
    showConfirmButton: false,
    position: 'top-end',
    toast: true
  })
}
</script>



<style scoped>
.hamburguesa-card {
  position: relative; /* Para permitir badges superpuestos */
  transition: transform 0.2s, box-shadow 0.2s;
  height: 100%;
}

.hamburguesa-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.hamburguesa-imagen {
  transition: transform 0.3s;
}

.hamburguesa-card:hover .hamburguesa-imagen {
  transform: scale(1.05);
}

.q-badge {
  position: absolute;
  z-index: 10;
}


</style>