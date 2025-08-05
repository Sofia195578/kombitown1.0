import { computed } from 'vue'

export function useSearch(productos, searchQuery) {
  const filteredProducts = computed(() => {
    if (!searchQuery.value) return productos.value

    return productos.value.filter(producto =>
      producto.nombre.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      producto.descripcion.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  })

  return { filteredProducts }
}
