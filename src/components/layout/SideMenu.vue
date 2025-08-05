<template>
  <q-drawer
    :model-value="modelValue"
    side="right"
  @update:model-value="val => $emit('update:modelValue', val)"
  show-if-above
  bordered
  >
    <q-list>
      <q-item-label header class="text-primary text-weight-bold">
        🍔 KOMBITOWN
      </q-item-label>

      <!-- HOME -->
      <q-item to="/" clickable v-ripple>
        <q-item-section avatar>
          <q-icon name="home" />
        </q-item-section>
        <q-item-section>Inicio</q-item-section>
      </q-item>

      <!-- Hamburguesas -->
      <q-item to="/hamburguesas" clickable v-ripple>
        <q-item-section avatar>
          <q-icon name="fastfood" />
        </q-item-section>
        <q-item-section>Hamburguesas</q-item-section>
      </q-item>

      <!-- Bebidas -->
      <q-item to="/bebidas" clickable v-ripple>
        <q-item-section avatar>
          <q-icon name="local_drink" />
        </q-item-section>
        <q-item-section>Bebidas</q-item-section>
      </q-item>

     <!-- Opción Perros & Salchipapas -->
      <q-item clickable tag="router-link" to="/perros-salchipapas">
        <q-item-section avatar>
          <q-icon name="fastfood" />
        </q-item-section>
        <q-item-section>
          Perros & Salchipapas
        </q-item-section>
      </q-item>

      <!--Opcion combos-->
      <q-item clickable tag="router-link" to="/combos">
  <q-item-section avatar>
    <q-icon name="local_offer" />
  </q-item-section>
  <q-item-section>
    Combos
  </q-item-section>
</q-item>

<!--Opcion extras-->
<q-item clickable tag="router-link" to="/extras">
  <q-item-section avatar>
    <q-icon name="restaurant_menu" />
  </q-item-section>
  <q-item-section>
    Extras
  </q-item-section>
</q-item>

    </q-list>
  </q-drawer>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])
</script>
