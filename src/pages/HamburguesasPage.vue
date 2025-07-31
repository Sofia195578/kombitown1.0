<template>
  <div class="q-pa-md">
    <div class="text-h4 text-center text-primary q-mb-lg">
      🍔 Hamburguesas
    </div>

    <div class="row q-col-gutter-md">
      <div v-for="hamburguesa in hamburguesas" :key="hamburguesa.id" class="col-12 col-sm-6 col-md-3">
        <q-card class="hamburguesa-card cursor-pointer">
          <q-img :src="hamburguesa.imagen" :alt="hamburguesa.nombre" ratio="1" class="hamburguesa-imagen" />


          <q-card-section>
            <div class="text-h6 text-weight-bold">{{ hamburguesa.nombre }}</div>
            <div class="text-caption text-grey-7 q-mt-xs">
              {{ hamburguesa.descripcion }}
            </div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <div class="row items-center justify-between">
              <div class="text-h6 text-primary text-weight-bold">
                ${{ hamburguesa.precio.toLocaleString() }}
              </div>
              <q-btn round color="primary" icon="add_shopping_cart" size="sm"
                @click.stop="abrirPersonalizacion(hamburguesa)" />
            </div>
          </q-card-section>

          <q-badge v-if="hamburguesa.tipo" :color="hamburguesa.tipo === 'popular' ? 'orange' : 'red'" floating
            class="text-white">
            {{ hamburguesa.tipo === 'popular' ? '🌟 Popular' : '🌶️ Picante' }}
          </q-badge>
        </q-card>

      </div>
    </div>

    <!-- Dialog Personalización -->
    <q-dialog v-model="mostrarDialogPersonalizar" persistent>
      <q-card style="min-width: 400px; max-width: 500px;">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">🍔 Personalizar Hamburguesa</div>
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

const { agregarItem, buscarProductoEnCarrito } = useCarrito()

// Lista hamburguesas
const hamburguesas = ref([
  {
    id: 1,
    nombre: 'KombiClásica',
    descripcion: 'Carne 100% res, queso, lechuga fresca, tomate y salsa especial de la casa',
    precio: 12000,
    imagen: '/kombi-clasica.jpg',
    tipo: 'popular', // Tiene badge Popular
    categoria: 'hamburguesas'
  },
  {
    id: 2,
    nombre: 'KombiBBQ',
    descripcion: 'Carne jugosa, tocineta crocante, cebolla caramelizada y salsa BBQ ahumada',
    precio: 15000,
    imagen: '/kombi-bbq.jpg',
    tipo: 'popular', // Tiene badge Popular
    categoria: 'hamburguesas'
  },
  {
    id: 3,
    nombre: 'KombiFull',
    descripcion: 'Doble carne, doble queso, tocineta, huevo y papas chip',
    precio: 18000,
    imagen: '/kombi-full.jpg',
    tipo: null, // No tiene badge
    categoria: 'hamburguesas'
  },
  {
    id: 4,
    nombre: 'KombiVeggie',
    descripcion: 'Hamburguesa de quinoa y garbanzos con vegetales frescos y salsa de yogur',
    precio: 14000,
    imagen: '/kombi-veggie.jpg',
    tipo: null, // No tiene badge
    categoria: 'hamburguesas'
  },
  {
    id: 5,
    nombre: 'MegaKombi',
    descripcion: 'Triple carne, queso cheddar, cebolla crispy y salsa especial MegaTown',
    precio: 22000,
    imagen: '/mega-kombi.jpg',
    tipo: 'popular', // Tiene badge Popular
    categoria: 'hamburguesas'
  },
  {
    id: 6,
    nombre: 'KombiTropical',
    descripcion: 'Carne jugosa con piña caramelizada, jamón y salsa hawaiana',
    precio: 16000,
    imagen: '/kombi-tropical.jpg',
    tipo: null, // No tiene badge
    categoria: 'hamburguesas'
  },
  {
    id: 7,
    nombre: 'KombiPicante',
    descripcion: 'Carne, queso, jalapeños, salsa picante y tocineta crocante',
    precio: 17000,
    imagen: '/kombi-picante.jpg',
    tipo: 'picante', // Tiene badge Picante
    categoria: 'hamburguesas'
  },
  {
    id: 8,
    nombre: 'KombiRanch',
    descripcion: 'Carne, queso americano, cebolla crispy y salsa ranch',
    precio: 15500,
    imagen: '/kombi-ranch.jpg',
    tipo: null, // No tiene badge
    categoria: 'hamburguesas'
  },
  {
    id: 9,
    nombre: 'KombiSuprema',
    descripcion: 'Doble carne Angus, queso suizo, champiñones y salsa de trufa',
    precio: 25000,
    imagen: '/kombi-suprema.jpg',
    tipo: 'popular', // Tiene badge Popular
    categoria: 'hamburguesas'
  },
  {
    id: 10,
    nombre: 'KombiDobleQueso',
    descripcion: 'Carne doble con mezcla de quesos cheddar y mozzarella derretidos',
    precio: 19000,
    imagen: '/kombi-doble-queso.jpg',
    tipo: null, // Tiene badge Picante
    categoria: 'hamburguesas'
  }
])



// Estado para el modal
const mostrarDialogPersonalizar = ref(false)
const productoSeleccionado = ref(null)
const cantidad = ref(1)
const extrasSeleccionados = ref([])
const notasEspeciales = ref('')

// Extras disponibles
const extrasDisponibles = ref([
  { id: 1, nombre: 'Queso extra', precio: 2000 },
  { id: 2, nombre: 'Tocineta', precio: 3000 },
  { id: 3, nombre: 'Cebolla caramelizada', precio: 1500 },
  { id: 4, nombre: 'Aguacate', precio: 2500 },
  { id: 5, nombre: 'Champiñones', precio: 2000 }
])

function abrirPersonalizacion(hamburguesa) {
  productoSeleccionado.value = hamburguesa
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

function productoEnCarrito(hamburguesa) {
  return buscarProductoEnCarrito(hamburguesa.id, [])
}


</script>

<style scoped>
.hamburguesa-card {
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

.producto-en-carrito {
  border: 2px solid #1976d2;
}
</style>
