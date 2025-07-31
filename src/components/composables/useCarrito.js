import { ref } from 'vue'

const carrito = ref([])

export function useCarrito() {
  const agregarItem = (producto, cantidad = 1, extras = [], notas = '') => {
    // Calculamos precio final sumando extras
    const precioExtras = extras.reduce((sum, extra) => sum + extra.precio, 0)
    const precioFinal = producto.precio + precioExtras

    // Buscamos si ya existe en carrito un ítem con el mismo producto y mismos extras
    const existente = carrito.value.find(i => 
      i.id === producto.id &&
      JSON.stringify(i.extras.map(e => e.id).sort()) === JSON.stringify(extras.map(e => e.id).sort())
    )

    if (existente) {
      existente.cantidad += cantidad
    } else {
      carrito.value.push({
        ...producto,
        precio: precioFinal, // Guardamos precio con extras
        cantidad,
        extras,
        notas
      })
    }
  }

  const updateQuantity = (id, cantidad) => {
    const item = carrito.value.find(i => i.id === id)
    if (item) item.cantidad = Math.max(1, cantidad)
  }

  const removeItem = (id) => {
    carrito.value = carrito.value.filter(i => i.id !== id)
  }

  const clearCart = () => {
    carrito.value = []
  }

  const buscarProductoEnCarrito = (id) => {
    return carrito.value.some(i => i.id === id)
  }

  return { carrito, agregarItem, updateQuantity, removeItem, clearCart, buscarProductoEnCarrito }
}
