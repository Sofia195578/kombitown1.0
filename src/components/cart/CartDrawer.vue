<template>
  <div class="q-pa-md cart-drawer">
    <div class="text-h6 q-mb-md">Carrito</div>
    
    <div v-if="items.length === 0" class="text-grey text-center">
      Tu carrito está vacío
    </div>

    <q-list v-else>
      <q-item v-for="item in items" :key="item.id" class="q-mb-sm">
        <q-item-section>
          <!-- Nombre del producto -->
          <q-item-label class="text-weight-bold item-name">{{ item.nombre }}</q-item-label>

          <!-- Mostrar extras si existen -->
          <q-item-label caption v-if="item.extras && item.extras.length > 0" class="text-blue-7 item-extras">
            <q-icon name="restaurant_menu" size="xs" />
            Extras: {{ item.extras.map(extra => extra.nombre).join(', ') }}
          </q-item-label>

          <!-- Mostrar notas especiales si existen -->
          <q-item-label caption v-if="item.notas && item.notas.trim() !== ''" class="text-green-7 item-notes">
            <q-icon name="note" size="xs" />
            {{ item.notas }}
          </q-item-label>

          <!-- Precio con extras -->
          <q-item-label caption class="text-primary item-price">
            ${{ (item.precio * item.cantidad).toLocaleString() }}
            <span class="text-grey-6">
              ({{ item.cantidad }} x ${{ item.precio.toLocaleString() }})
            </span>
          </q-item-label>
        </q-item-section>

        <q-item-section side class="text-right">
          <!-- Controles de cantidad -->
          <div class="row items-center no-wrap q-gutter-xs q-mb-xs quantity-controls">
            <q-btn 
              dense 
              round 
              icon="remove" 
              size="sm"
              color="red"
              class="control-btn"
              @click="$emit('update-quantity', item.id, item.cantidad - 1)" 
            />
            <span class="text-weight-bold q-mx-sm quantity-number">{{ item.cantidad }}</span>
            <q-btn 
              dense 
              round 
              icon="add" 
              size="sm"
              color="green"
              class="control-btn"
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
            class="delete-btn"
            @click="$emit('remove-item', item.id)" 
          />
        </q-item-section>
      </q-item>
    </q-list>

    <!-- Total del carrito -->
    <q-separator class="q-my-md" />
    <div class="text-right text-h6 q-mt-md cart-total" v-if="items.length > 0">
      <div class="text-weight-bold text-primary">
        Total: ${{ calcularTotalCarrito().toLocaleString() }}
      </div>
    </div>

    <!-- Botones de acción -->
    <div class="q-mt-md action-buttons" v-if="items.length > 0">      
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
    width: window.innerWidth <= 480 ? '90%' : '400px',
    customClass: {
      popup: 'responsive-swal'
    }
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
    cancelButtonColor: '#3085d6',
    width: window.innerWidth <= 480 ? '90%' : 'auto',
    customClass: {
      popup: 'responsive-swal'
    }
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
      toast: true,
      width: window.innerWidth <= 480 ? '90%' : 'auto',
      customClass: {
        popup: 'responsive-swal'
      }
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

/* Responsive styles específicos para el carrito */
@media (max-width: 480px) {
  .cart-drawer {
    padding: 8px !important;
  }
  
  .item-name {
    font-size: 12px !important;
    line-height: 1.3 !important;
  }
  
  .item-extras,
  .item-notes,
  .item-price {
    font-size: 10px !important;
    line-height: 1.2 !important;
  }
  
  .quantity-controls {
    gap: 2px !important;
  }
  
  .control-btn,
  .delete-btn {
    min-width: 24px !important;
    min-height: 24px !important;
  }
  
  .quantity-number {
    font-size: 12px !important;
    margin: 0 4px !important;
  }
  
  .cart-total {
    font-size: 14px !important;
  }
  
  .action-buttons .q-btn {
    font-size: 11px !important;
    padding: 8px !important;
  }
}

@media (max-width: 360px) {
  .cart-drawer {
    padding: 6px !important;
  }
  
  .item-name {
    font-size: 11px !important;
  }
  
  .item-extras,
  .item-notes,
  .item-price {
    font-size: 9px !important;
  }
  
  .control-btn,
  .delete-btn {
    min-width: 22px !important;
    min-height: 22px !important;
  }
  
  .quantity-number {
    font-size: 11px !important;
  }
}

@media (max-width: 320px) {
  .cart-drawer {
    padding: 4px !important;
  }
  
  .q-item {
    padding: 4px 8px !important;
    margin-bottom: 4px !important;
  }
  
  .item-name {
    font-size: 10px !important;
  }
  
  .item-extras,
  .item-notes,
  .item-price {
    font-size: 8px !important;
  }
  
  .control-btn,
  .delete-btn {
    min-width: 20px !important;
    min-height: 20px !important;
  }
  
  .control-btn .q-icon,
  .delete-btn .q-icon {
    font-size: 12px !important;
  }
  
  .quantity-number {
    font-size: 10px !important;
    margin: 0 2px !important;
  }
  
  .cart-total {
    font-size: 12px !important;
  }
  
  .action-buttons .q-btn {
    font-size: 10px !important;
    padding: 6px !important;
    letter-spacing: 0.2px !important;
  }
  
  .text-h6 {
    font-size: 12px !important;
  }
  
  .q-mb-md,
  .q-mt-md {
    margin: 4px 0 !important;
  }
  
  .q-mb-sm {
    margin-bottom: 4px !important;
  }
}

/* Clase para SweetAlert responsive */
:global(.responsive-swal) {
  font-size: 12px !important;
}

@media (max-width: 320px) {
  :global(.responsive-swal) {
    font-size: 10px !important;
  }
  
  :global(.responsive-swal .swal2-title) {
    font-size: 14px !important;
  }
  
  :global(.responsive-swal .swal2-html-container) {
    font-size: 10px !important;
  }
  
  :global(.responsive-swal .swal2-confirm),
  :global(.responsive-swal .swal2-cancel) {
    font-size: 10px !important;
    padding: 6px 12px !important;
  }
}
</style>