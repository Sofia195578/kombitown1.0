<template>
  <div class="q-pa-md">
    <div class="text-h4 text-center text-primary q-mb-lg">
      🥤 Bebidas
    </div>

    <!-- Tabs de categorías -->
    <q-tabs
      v-model="categoriaSeleccionada"
      dense
      class="text-grey"
      active-color="primary"
      indicator-color="primary"
      align="justify"
      narrow-indicator
    >
      <q-tab name="todas" label="Todas" />
      <q-tab name="gaseosas" label="Gaseosas" />
      <q-tab name="jugos" label="Jugos" />
      <q-tab name="calientes" label="Calientes" />
      <q-tab name="agua" label="Agua" />
    </q-tabs>

    <q-separator />

    <!-- Cards -->
    <div class="row q-col-gutter-md q-mt-md">
      <div
        v-for="bebida in bebidasFiltradas"
        :key="bebida.id"
        class="col-12 col-sm-6 col-md-3"
      >
        <q-card class="hamburguesa-card cursor-pointer">
          <!-- Imagen -->
          <q-img
            :src="bebida.imagen"
            :alt="bebida.nombre"
            ratio="1"
            class="hamburguesa-imagen"
          />

          <!-- Info principal -->
          <q-card-section>
            <div class="text-h6 text-weight-bold">{{ bebida.nombre }}</div>
            <div class="text-caption text-grey-7 q-mt-xs">
              {{ bebida.descripcion }}
            </div>
            <div v-if="bebida.tamaños" class="q-mt-sm">
              <q-chip
                v-for="tamaño in bebida.tamaños"
                :key="tamaño.nombre"
                size="sm"
                color="grey-3"
                text-color="dark"
              >
                {{ tamaño.nombre }} - ${{ tamaño.precio.toLocaleString() }}
              </q-chip>
            </div>
          </q-card-section>

          <!-- Precio + botón -->
          <q-card-section class="q-pt-none">
            <div class="row items-center justify-between">
              <div class="text-h6 text-primary text-weight-bold">
                ${{ bebida.precio.toLocaleString() }}
              </div>
              <q-btn
                round
                color="primary"
                icon="add_shopping_cart"
                size="sm"
                @click.stop="seleccionarBebida(bebida)"
              />
            </div>
          </q-card-section>

          <!-- Badge frío/caliente -->
          <q-badge
            :color="bebida.tipo === 'fria' ? 'blue' : 'orange'"
            floating
            class="text-white"
          >
            {{ bebida.tipo === 'fria' ? '❄️ Fría' : '☕ Caliente' }}
          </q-badge>
        </q-card>
      </div>
    </div>

    <!-- Modal Personalización -->
    <q-dialog v-model="mostrarDialogPersonalizar" persistent>
      <q-card style="min-width: 350px; max-width: 400px;">
        <q-card-section>
          <div class="text-h6">🥤 Personalizar Bebida</div>
        </q-card-section>

        <q-card-section v-if="bebidaSeleccionada">
          <div class="row q-gutter-md q-mb-md">
            <q-img
              :src="bebidaSeleccionada.imagen"
              :alt="bebidaSeleccionada.nombre"
              style="width: 100px; height: 100px;"
              class="rounded-borders"
            />
            <div class="col">
              <div class="text-h6">{{ bebidaSeleccionada.nombre }}</div>
              <div class="text-caption text-grey-7">
                {{ bebidaSeleccionada.descripcion }}
              </div>
            </div>
          </div>

          <!-- Selector tamaño -->
          <div v-if="bebidaSeleccionada.tamaños" class="q-mb-md">
            <q-option-group
              v-model="tamañoSeleccionado"
              :options="bebidaSeleccionada.tamaños.map(t => ({
                label: `${t.nombre} - $${t.precio.toLocaleString()}`,
                value: t
              }))"
              type="radio"
            />
          </div>

          <!-- Cantidad -->
          <div class="row items-center q-gutter-md q-mt-md">
            <q-btn
              round
              color="red"
              icon="remove"
              @click="cantidad = Math.max(1, cantidad - 1)"
            />
            <div class="text-h6">{{ cantidad }}</div>
            <q-btn round color="green" icon="add" @click="cantidad++" />
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" v-close-popup />
          <q-btn color="primary" label="Agregar" @click="confirmarAgregarBebida" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Swal from 'sweetalert2'
import { useCarrito } from '../components/composables/useCarrito.js'

const { agregarItem } = useCarrito()

const categoriaSeleccionada = ref('todas')

// Lista bebidas (la tuya, no la repito completa)
const bebidas = ref([
  {
    id: 1,
    nombre: 'Coca Cola',
    descripcion: 'Bebida gaseosa clásica',
    precio: 3000,
    imagen: 'bebidas/1.jpg',
    categoria: 'gaseosas',
    tipo: 'fria',
    tamaños: [
      { nombre: 'Personal', precio: 3000 },
      { nombre: 'Familiar', precio: 5000 }
    ]
  },
  {
    id: 2,
    nombre: 'Jugo de Naranja',
    descripcion: 'Jugo natural de naranja',
    precio: 4000,
    imagen: 'bebidas/2.jpg',
    categoria: 'jugos',
    tipo: 'fria'
  },
  {
    id: 3,
    nombre: 'Café Americano',
    descripcion: 'Café negro tradicional',
    precio: 3500,
    imagen: 'bebidas/3.jpg',
    categoria: 'calientes',
    tipo: 'caliente'
  },
  {
    id: 4,
    nombre: 'Agua Mineral',
    descripcion: 'Agua mineral sin gas',
    precio: 2000,
    imagen: 'bebidas/4.jpg',
    categoria: 'agua',
    tipo: 'fria'
  },
  {
    id: 5,
    nombre: 'Jugo de Mango',
    descripcion: 'Jugo natural de mango',
    precio: 4500,
    imagen: 'bebidas/5.jpg',
    categoria: 'jugos',
    tipo: 'fria'
  },
  {
    id: 6,
    nombre: 'Chocolate Caliente',
    descripcion: 'Chocolate caliente tradicional',
    precio: 4000,
    imagen: 'bebidas/6.jpg',
    categoria: 'calientes',
    tipo: 'caliente'
  },
  {
  id: 7,
  nombre: 'Pepsi',
  descripcion: 'Refresco clásico sabor cola',
  precio: 2800,
  imagen: 'bebidas/7.jpg',
  categoria: 'gaseosas',
  tipo: 'fria',
  tamaños: [
      { nombre: 'Personal', precio: 2500 },
      { nombre: 'Familiar', precio: 4000 }
    ]
},
{
  id: 8,
  nombre: 'Sprite',
  descripcion: 'Refresco de lima-limón',
  precio: 2800,
  imagen: 'bebidas/8.jpg',
  categoria: 'gaseosas',
  tipo: 'fria',
  tamaños: [
      { nombre: 'Personal', precio: 2500 },
      { nombre: 'Familiar', precio: 4000 }
    ]
},
{
  id: 9,
  nombre: 'Manzana Postobón',
  descripcion: 'Refresco sabor manzana roja',
  precio: 3000,
  imagen: 'bebidas/9.jpg',
  categoria: 'gaseosas',
  tipo: 'fria',
  tamaños: [
      { nombre: 'Personal', precio: 3000 },
      { nombre: 'Familiar', precio: 5000 }
    ]
},
{
  id: 10,
  nombre: 'Jugo de Fresa',
  descripcion: 'Jugo natural de fresa fresco',
  precio: 4500,
  imagen: 'bebidas/10.jpg',
  categoria: 'jugos',
  tipo: 'fria'
},
{
  id: 11,
  nombre: 'Jugo de Maracuyá',
  descripcion: 'Jugo tropical refrescante',
  precio: 4500,
  imagen: 'bebidas/11.jpg',
  categoria: 'jugos',
  tipo: 'fria'
},
{
  id: 12,
  nombre: 'Limonada Natural',
  descripcion: 'Limonada casera con hielo',
  precio: 4000,
  imagen: 'bebidas/12.jpg',
  categoria: 'jugos',
  tipo: 'fria'
},
{
  id: 13,
  nombre: 'Té Verde',
  descripcion: 'Infusión de té verde relajante',
  precio: 3500,
  imagen: 'bebidas/13.jpg',
  categoria: 'calientes',
  tipo: 'caliente'
},
{
  id: 14,
  nombre: 'Café Latte',
  descripcion: 'Café con leche espumosa',
  precio: 4500,
  imagen: 'bebidas/14.jpg',
  categoria: 'calientes',
  tipo: 'caliente'
},
{
  id: 15,
  nombre: 'Aromática de Frutas',
  descripcion: 'Infusión natural de frutas',
  precio: 3000,
  imagen: 'bebidas/15.jpg',
  categoria: 'calientes',
  tipo: 'caliente'
},
{
  id: 16,
  nombre: 'Agua con Gas',
  descripcion: 'Agua mineral con gas',
  precio: 2500,
  imagen: 'bebidas/16.jpg',
  categoria: 'agua',
  tipo: 'fria'
},
{
  id: 17,
  nombre: 'Agua Saborizada',
  descripcion: 'Agua con sabor a frutas tropicales',
  precio: 3000,
  imagen: 'bebidas/17.jpg',
  categoria: 'agua',
  tipo: 'fria'
},
{
  id: 18,
  nombre: 'Soda Italiana',
  descripcion: 'Refresco gasificado con frutas',
  precio: 5000,
  imagen: 'bebidas/18.jpg',
  categoria: 'agua',
  tipo: 'fria'
}
])

const bebidasFiltradas = computed(() => {
  if (categoriaSeleccionada.value === 'todas') {
    return bebidas.value
  }
  return bebidas.value.filter(b => b.categoria === categoriaSeleccionada.value)
})

// Estado modal
const mostrarDialogPersonalizar = ref(false)
const bebidaSeleccionada = ref(null)
const tamañoSeleccionado = ref(null)
const cantidad = ref(1)

function seleccionarBebida(bebida) {
  if (bebida.tamaños) {
    bebidaSeleccionada.value = bebida
    tamañoSeleccionado.value = bebida.tamaños[0] // por defecto el primero
    cantidad.value = 1
    mostrarDialogPersonalizar.value = true
  } else {
    // Si no tiene tamaños, agregar directo
    agregarItem(bebida, 1)
    Swal.fire({
      title: '¡Agregado al carrito!',
      text: `${bebida.nombre} agregado correctamente`,
      icon: 'success',
      timer: 1500,
      showConfirmButton: false,
      position: 'top-end',
      toast: true
    })
  }
}

function confirmarAgregarBebida() {
  if (!bebidaSeleccionada.value) return

  const precioFinal = tamañoSeleccionado.value
    ? tamañoSeleccionado.value.precio
    : bebidaSeleccionada.value.precio

  agregarItem(
    {
      ...bebidaSeleccionada.value,
      precio: precioFinal,
      nombre: `${bebidaSeleccionada.value.nombre} (${tamañoSeleccionado.value.nombre})`
    },
    cantidad.value
  )

  Swal.fire({
    title: '¡Agregado al carrito!',
    text: `${bebidaSeleccionada.value.nombre} - ${tamañoSeleccionado.value.nombre}`,
    icon: 'success',
    timer: 1500,
    showConfirmButton: false,
    position: 'top-end',
    toast: true
  })

  mostrarDialogPersonalizar.value = false
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
