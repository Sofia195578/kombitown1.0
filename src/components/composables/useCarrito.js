import { ref } from 'vue'

const carrito = ref([])

export function useCarrito() {
  const agregarItem = (producto, cantidad = 1, extras = [], notas = '') => {
    // Calculamos precio final sumando extras
    const precioExtras = extras.reduce((sum, extra) => sum + extra.precio, 0)
    const precioFinal = producto.precio + precioExtras

    // Creamos un identificador único basado en producto, extras y notas
    const extrasIds = extras.map(e => e.id).sort().join(',')
    const notasLimpias = notas.trim()
    const identificadorUnico = `${producto.id}-${extrasIds}-${notasLimpias}`

    // Buscamos si ya existe un ítem con la misma configuración exacta
    const existente = carrito.value.find(i => {
      const existenteExtrasIds = i.extras.map(e => e.id).sort().join(',')
      const existenteNotasLimpias = i.notas ? i.notas.trim() : ''
      const existenteIdentificador = `${i.productoId || i.id}-${existenteExtrasIds}-${existenteNotasLimpias}`
      return existenteIdentificador === identificadorUnico
    })

    if (existente) {
      existente.cantidad += cantidad
    } else {
      // Creamos un nuevo item con un ID único
      const nuevoItem = {
        ...producto,
        id: Date.now() + Math.random(), // ID único para el carrito
        productoId: producto.id, // ID original del producto
        precio: precioFinal, // Precio con extras incluidos
        cantidad,
        extras: extras || [],
        notas: notasLimpias || ''
      }
      
      carrito.value.push(nuevoItem)
    }
  }

  const updateQuantity = (carritoItemId, cantidad) => {
    const item = carrito.value.find(i => i.id === carritoItemId)
    if (item) {
      if (cantidad <= 0) {
        removeItem(carritoItemId)
      } else {
        item.cantidad = cantidad
      }
    }
  }

  const removeItem = (carritoItemId) => {
    carrito.value = carrito.value.filter(i => i.id !== carritoItemId)
  }

  const clearCart = () => {
    carrito.value = []
  }

  const buscarProductoEnCarrito = (productoId) => {
    return carrito.value.some(i => (i.productoId || i.id) === productoId)
  }

  const obtenerTotalCarrito = () => {
    return carrito.value.reduce((sum, item) => sum + (item.precio * item.cantidad), 0)
  }

  const obtenerCantidadItems = () => {
    return carrito.value.reduce((sum, item) => sum + item.cantidad, 0)
  }

  return { 
    carrito, 
    agregarItem, 
    updateQuantity, 
    removeItem, 
    clearCart, 
    buscarProductoEnCarrito,
    obtenerTotalCarrito,
    obtenerCantidadItems
  }
}
