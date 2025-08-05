<template>
  <div class="q-pa-md">
    <div class="text-h6 q-mb-md">Carrito</div>
    
    <div v-if="items.length === 0" class="text-grey text-center">
      Tu carrito está vacío
    </div>

    <q-list v-else>
      <q-item v-for="item in items" :key="item.id" class="q-mb-sm">
        <q-item-section>
          <!-- Nombre del producto -->
          <q-item-label class="text-weight-bold">{{ item.nombre }}</q-item-label>

          <!-- Mostrar extras si existen -->
          <q-item-label caption v-if="item.extras && item.extras.length > 0" class="text-blue-7">
            <q-icon name="restaurant_menu" size="xs" />
            Extras: {{ item.extras.map(extra => extra.nombre).join(', ') }}
          </q-item-label>

          <!-- Mostrar notas especiales si existen -->
          <q-item-label caption v-if="item.notas && item.notas.trim() !== ''" class="text-green-7">
            <q-icon name="note" size="xs" />
            {{ item.notas }}
          </q-item-label>

          <!-- Precio con extras -->
          <q-item-label caption class="text-primary">
            ${{ (item.precio * item.cantidad).toLocaleString() }}
            <span class="text-grey-6">
              ({{ item.cantidad }} x ${{ item.precio.toLocaleString() }})
            </span>
          </q-item-label>
        </q-item-section>

        <q-item-section side class="text-right">
          <!-- Controles de cantidad -->
          <div class="row items-center no-wrap q-gutter-xs q-mb-xs">
            <q-btn 
              dense 
              round 
              icon="remove" 
              size="sm"
              color="red"
              @click="$emit('update-quantity', item.id, item.cantidad - 1)" 
            />
            <span class="text-weight-bold q-mx-sm">{{ item.cantidad }}</span>
            <q-btn 
              dense 
              round 
              icon="add" 
              size="sm"
              color="green"
              @click="$emit('update-quantity', item.id, item.cantidad + 1)" 
            />
          </div>
          
          <!-- Botón eliminar -->
          <q-btn 
            dense 
            round 
            icon="delete" 
            size="sm"
            color="red" 
            @click="$emit('remove-item', item.id)" 
          />
        </q-item-section>
      </q-item>
    </q-list>

    <!-- Total del carrito -->
    <q-separator class="q-my-md" />
    <div class="text-right text-h6 q-mt-md" v-if="items.length > 0">
      <div class="text-weight-bold text-primary">
        Total: ${{ calcularTotalCarrito().toLocaleString() }}
      </div>
    </div>

    <!-- Botones de acción -->
    <div class="q-mt-md" v-if="items.length > 0">      
      <q-btn 
        color="positive" 
        label="Finalizar Pedido" 
        icon="restaurant"
        class="full-width btn-pedido q-mb-sm" 
        @click="procesarPedido" 
      />
      
      <q-btn 
        color="red" 
        label="Vaciar carrito" 
        icon="delete_sweep"
        outline
        class="full-width btn-vaciar" 
        @click="confirmarVaciarCarrito" 
      />
    </div>
  </div>
</template>

<script setup>
import Swal from 'sweetalert2'

const props = defineProps({
  items: Array
})

const emit = defineEmits(['update-quantity', 'remove-item', 'clear-cart', 'checkout'])

// Calculamos el total del carrito
function calcularTotalCarrito() {
  return props.items.reduce((sum, item) => sum + (item.precio * item.cantidad), 0)
}

// FUNCIÓN SIMPLE PARA EL PEDIDO
async function procesarPedido() {
  await Swal.fire({
    title: '🎉 ¡Pedido Realizado!',
    html: `
      <div style="text-align: center; margin: 20px 0; font-family: Arial, sans-serif;">
        <div style="margin-bottom: 25px;">
          <i class="material-icons" style="font-size: 80px; color: #4CAF50;">delivery_dining</i>
        </div>
        <h3 style="color: #28a745; margin-bottom: 15px; font-size: 20px;">
          Tu pedido ha sido confirmado
        </h3>
        <p style="font-size: 16px; color: #666; margin-bottom: 20px;">
          Gracias por elegir <strong style="color: #ff6f00;">KombiTown</strong>
        </p>
        <p style="font-size: 18px; color: #ff6f00; font-weight: bold;">
          ¡Que lo disfrutes! 😋
        </p>
      </div>
    `,
    confirmButtonText: '👍 ¡Perfecto!',
    confirmButtonColor: '#28a745',
    width: '400px'
  })

  // Limpiar carrito
  emit('clear-cart')
}

// Confirmar vaciar carrito
async function confirmarVaciarCarrito() {
  const result = await Swal.fire({
    title: '🗑️ Vaciar Carrito',
    text: '¿Estás seguro de que quieres eliminar todos los productos?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: '✅ Sí, vaciar',
    cancelButtonText: '❌ Cancelar',
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6'
  })

  if (result.isConfirmed) {
    emit('clear-cart')
    
    Swal.fire({
      title: '🗑️ Carrito Vaciado',
      text: 'Todos los productos han sido eliminados',
      icon: 'success',
      timer: 1500,
      showConfirmButton: false,
      position: 'top-end',
      toast: true
    })
  }
}
</script>

<style scoped>
.btn-vaciar {
  border-radius: 6px !important;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.btn-pedido {
  border-radius: 8px !important;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  box-shadow: 0 4px 12px rgba(76, 175, 80, 0.4);
  transition: all 0.3s ease;
}

.btn-pedido:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(76, 175, 80, 0.6);
}

.q-item {
  border-left: 3px solid #e0e0e0;
  margin-bottom: 8px;
  padding-left: 12px;
  background: #fafafa;
  border-radius: 4px;
}

.q-item:hover {
  background: #f5f5f5;
  border-left-color: #1976d2;
}
</style> 
