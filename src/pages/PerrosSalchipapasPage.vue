<template>
  <div class="q-pa-md">
    <div class="text-h4 text-center text-primary q-mb-lg">
      🌭 Perros Calientes & 🍟 Salchipapas
    </div>

    <!-- Tabs -->
    <q-tabs v-model="tabActiva" dense class="text-grey" active-color="primary" indicator-color="primary" align="justify"
      narrow-indicator>
      <q-tab name="perros" label="Perros Calientes" />
      <q-tab name="salchipapas" label="Salchipapas" />
    </q-tabs>

    <q-separator />

    <!-- Panels -->
    <q-tab-panels v-model="tabActiva" animated>

      <!-- Panel Perros -->
      <q-tab-panel name="perros">
        <div class="row q-col-gutter-md q-mt-md">
          <div v-for="perro in perros" :key="perro.id" class="col-12 col-sm-6 col-md-3">
            <q-card class="hamburguesa-card cursor-pointer">
              <q-img :src="perro.imagen" :alt="perro.nombre" ratio="1" class="hamburguesa-imagen" />

              <q-card-section>
                <div class="text-h6 text-weight-bold">{{ perro.nombre }}</div>
                <div class="text-caption text-grey-7 q-mt-xs">
                  {{ perro.descripcion }}
                </div>
              </q-card-section>

              <q-card-section class="q-pt-none">
                <div class="row items-center justify-between">
                  <div class="text-h6 text-primary text-weight-bold">
                    ${{ perro.precio.toLocaleString() }}
                  </div>
                  <q-btn round color="primary" icon="add_shopping_cart" size="sm"
                    @click.stop="abrirPersonalizacion(perro)" />
                </div>
              </q-card-section>

              <q-badge v-if="perro.tipo" :color="perro.tipo === 'popular' ? 'orange' : 'red'" floating
                class="text-white">
                {{ perro.tipo === 'popular' ? '🌟 Popular' : '🌶️ Picante' }}
              </q-badge>

            </q-card>
          </div>
        </div>
      </q-tab-panel>

      <!-- Panel Salchipapas -->
      <q-tab-panel name="salchipapas">
        <div class="row q-col-gutter-md q-mt-md">
          <div v-for="salchipapa in salchipapas" :key="salchipapa.id" class="col-12 col-sm-6 col-md-3">
            <q-card class="hamburguesa-card cursor-pointer">
              <q-img :src="salchipapa.imagen" :alt="salchipapa.nombre" ratio="1" class="hamburguesa-imagen" />

              <q-card-section>
                <div class="text-h6 text-weight-bold">{{ salchipapa.nombre }}</div>
                <div class="text-caption text-grey-7 q-mt-xs">
                  {{ salchipapa.descripcion }}
                </div>
              </q-card-section>

              <q-card-section class="q-pt-none">
                <div class="row items-center justify-between">
                  <div class="text-h6 text-primary text-weight-bold">
                    ${{ salchipapa.precio.toLocaleString() }}
                  </div>
                  <q-btn round color="primary" icon="add_shopping_cart" size="sm"
                    @click.stop="abrirPersonalizacion(salchipapa)" />
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-tab-panel>
    </q-tab-panels>

    <!-- Dialog Personalización -->
    <q-dialog v-model="mostrarDialogPersonalizar" persistent>
      <q-card style="min-width: 400px; max-width: 500px;">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">🍽️ Personalizar</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section v-if="productoSeleccionado">
          <!-- Info producto -->
          <div class="row q-gutter-md q-mb-md">
            <q-img :src="productoSeleccionado.imagen" :alt="productoSeleccionado.nombre"
              style="width: 100px; height: 100px;" class="rounded-borders" />
            <div class="col">
              <div class="text-h6">{{ productoSeleccionado.nombre }}</div>
              <div class="text-body2 text-grey-7">
                {{ productoSeleccionado.descripcion }}
              </div>
              <div class="text-h6 text-primary q-mt-sm">
                ${{ productoSeleccionado.precio.toLocaleString() }}
              </div>
            </div>
          </div>

          <!-- Cantidad -->
          <div class="q-mb-md">
            <div class="text-subtitle2 q-mb-sm">Cantidad:</div>
            <div class="row items-center q-gutter-md">
              <q-btn round color="red" icon="remove" size="sm" :disable="cantidad <= 1"
                @click="cantidad = Math.max(1, cantidad - 1)" />
              <div class="text-h6 text-weight-bold">{{ cantidad }}</div>
              <q-btn round color="green" icon="add" size="sm" @click="cantidad++" />
            </div>
          </div>

          <!-- Extras -->
          <div class="q-mb-md">
            <div class="text-subtitle2 q-mb-sm">Extras:</div>
            <q-option-group v-model="extrasSeleccionados" :options="extrasDisponibles.map(extra => ({
              label: `${extra.nombre} (+${extra.precio.toLocaleString()})`,
              value: extra
            }))" type="checkbox" dense />
          </div>

          <!-- Notas -->
          <div class="q-mb-md">
            <q-input v-model="notasEspeciales" label="Notas especiales" type="textarea" rows="2" outlined dense
              placeholder="Ej: Sin cebolla, punto de carne, etc." />
          </div>

          <!-- Precio total -->
          <q-separator class="q-my-md" />
          <div class="row justify-between items-center">
            <div class="text-h6">Total:</div>
            <div class="text-h5 text-primary text-weight-bold">
              ${{ calcularPrecioConExtras().toLocaleString() }}
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right" class="q-pt-none">
          <q-btn flat label="Cancelar" color="grey" v-close-popup />
          <q-btn round color="primary" icon="add_shopping_cart" size="sm" @click="confirmarAgregarAlCarrito" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Swal from 'sweetalert2'
import { useCarrito } from '../components/composables/useCarrito.js'

const { agregarItem } = useCarrito()

// Tabs
const tabActiva = ref('perros')

// Data
const perros = ref([
  {
    id: 1,
    nombre: 'Perro Sencillo',
    descripcion: 'Salchicha con pan y salsas básicas',
    precio: 8000,
    imagen: 'perros_salchipapas/1.jpg',
    tipo:null
  },
  {
    id: 2,
    nombre: 'Perro Especial',
    descripcion: 'Con queso, tocineta y papas chip',
    precio: 12000,
    imagen: 'perros_salchipapas/2.jpg',
    tipo:null
  },
  {
    id: 3,
    nombre: 'Perro Ranchero',
    descripcion: 'Con frijoles, chicharrón y salsa picante',
    precio: 15000,
    imagen: 'perros_salchipapas/3.jpg',
    tipo:null
  },
  {
    id: 4,
    nombre: 'KombiDog Clásico',
    descripcion: 'Salchicha americana, queso rallado y papas trituradas',
    precio: 10000,
    imagen: 'perros_salchipapas/4.jpg',
    tipo:'popular'
  },
  {
    id: 5,
    nombre: 'KombiDog BBQ',
    descripcion: 'Salchicha de res, cebolla caramelizada y salsa BBQ',
    precio: 13000,
    imagen: 'perros_salchipapas/5.jpg',
    tipo:'picante'
  },
  {
    id: 6,
    nombre: 'KombiDog Picante',
    descripcion: 'Salchicha parrillera, jalapeños y salsa chipotle',
    precio: 14000,
    imagen: 'perros_salchipapas/6.jpg',
    tipo:'picante'
  },
  {
    id: 7,
    nombre: 'Mega KombiDog',
    descripcion: 'Doble salchicha, tocineta, queso cheddar y papas chip',
    precio: 18000,
    imagen: 'perros_salchipapas/7.jpg',
    tipo:'popular'
  },
  {
    id: 8,
    nombre: 'KombiDog Hawaiano',
    descripcion: 'Salchicha de cerdo, piña asada y salsa de miel mostaza',
    precio: 13500,
    imagen: 'perros_salchipapas/8.jpg',
    tipo:'popular'
  }
])


const salchipapas = ref([
  {
    id: 9,
    nombre: 'Salchipapa Personal',
    descripcion: 'Papas fritas con salchicha picada',
    precio: 10000,
    imagen: 'perros_salchipapas/9.jpg'
  },
  {
    id: 10,
    nombre: 'Salchipapa Familiar',
    descripcion: 'Grande para compartir, con todos los ingredientes',
    precio: 25000,
    imagen: 'perros_salchipapas/10.jpg'
  },
  {
    id: 11,
    nombre: 'KombiPapas BBQ',
    descripcion: 'Papas rústicas, salchicha y salsa BBQ ahumada',
    precio: 15000,
    imagen: 'perros_salchipapas/11.jpg'
  },
  {
    id: 12,
    nombre: 'KombiPapas Mixtas',
    descripcion: 'Con salchicha, chorizo y papas en corte casero',
    precio: 17000,
    imagen: 'perros_salchipapas/12.jpg'
  },
  {
    id: 13,
    nombre: 'KombiPapas Full Cheese',
    descripcion: 'Papas bañadas en queso cheddar y mozzarella',
    precio: 16000,
    imagen: 'perros_salchipapas/13.jpg'
  },
  {
    id: 14,
    nombre: 'KombiPapas Rancheras',
    descripcion: 'Papas con salsa ranch, tocineta y cebolla crispy',
    precio: 18000,
    imagen: 'perros_salchipapas/14.jpg'
  },
  {
    id: 15,
    nombre: 'Mega KombiPapas',
    descripcion: 'Porción gigante con todas las carnes y salsas',
    precio: 28000,
    imagen: 'perros_salchipapas/15.jpg'
  }
])


// Modal personalization
const mostrarDialogPersonalizar = ref(false)
const productoSeleccionado = ref(null)
const cantidad = ref(1)
const extrasSeleccionados = ref([])
const notasEspeciales = ref('')

// Extras disponibles (puedes personalizar)
const extrasDisponibles = ref([
  { id: 1, nombre: 'Queso extra', precio: 2000 },
  { id: 2, nombre: 'Tocineta', precio: 3000 },
  { id: 3, nombre: 'Maíz', precio: 1500 },
  { id: 4, nombre: 'Papas chip', precio: 2000 }
])

// Funciones
function abrirPersonalizacion(producto) {
  productoSeleccionado.value = producto
  cantidad.value = 1
  extrasSeleccionados.value = []
  notasEspeciales.value = ''
  mostrarDialogPersonalizar.value = true
}

function confirmarAgregarAlCarrito() {
  if (!productoSeleccionado.value) return

  agregarItem(
    productoSeleccionado.value,
    cantidad.value,
    extrasSeleccionados.value,
    notasEspeciales.value
  )

  Swal.fire({
    title: '¡Agregado al carrito!',
    text: `${productoSeleccionado.value.nombre} se agregó correctamente`,
    icon: 'success',
    timer: 1500,
    showConfirmButton: false,
    position: 'top-end',
    toast: true
  })

  mostrarDialogPersonalizar.value = false
}

function calcularPrecioConExtras() {
  if (!productoSeleccionado.value) return 0
  const precioBase = productoSeleccionado.value.precio
  const precioExtras = extrasSeleccionados.value.reduce((sum, extra) => sum + extra.precio, 0)
  return (precioBase + precioExtras) * cantidad.value
}
</script>

<style scoped>
.hamburguesa-card {
  position: relative;
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
