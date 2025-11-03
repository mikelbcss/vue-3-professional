<template>
  <div class="p-6 max-w-md mx-auto bg-white rounded-xl shadow-lg">
    <h2 class="text-2xl font-bold mb-6">{{ title }}</h2>

    <!-- Cart Items -->
    <div class="mb-6">
      <h3 class="text-lg font-semibold mb-3">Productos en el carrito:</h3>
      <div v-for="item in items" :key="item.id" class="flex justify-between items-center p-3 bg-gray-50 rounded mb-2">
        <div>
          <span class="font-medium">{{ item.name }}</span>
          <span class="text-gray-500"> - €{{ item.price }}</span>
        </div>
        <div class="flex items-center space-x-2">
          <button class="px-2 py-1 bg-red-500 text-white rounded text-sm" @click="decrementQuantity(item.id)">-</button>
          <span class="mx-2">{{ item.quantity }}</span>
          <button class="px-2 py-1 bg-green-500 text-white rounded text-sm" @click="incrementQuantity(item.id)">
            +
          </button>
          <button class="px-2 py-1 bg-gray-500 text-white rounded text-sm ml-2" @click="removeItem(item.id)">
            Eliminar
          </button>
        </div>
      </div>
    </div>

    <!-- Add New Item -->
    <div class="mb-6 p-4 bg-blue-50 rounded">
      <h3 class="font-semibold mb-2">Agregar producto:</h3>
      <div class="flex space-x-2">
        <input v-model="newItemName" placeholder="Nombre" class="flex-1 px-2 py-1 border rounded" />
        <input v-model="newItemPrice" type="number" placeholder="Precio" class="w-20 px-2 py-1 border rounded" />
        <button class="px-3 py-1 bg-blue-500 text-white rounded" @click="addItem">+</button>
      </div>
    </div>

    <!-- Cart Statistics (Manually Synchronized) -->
    <div class="bg-gray-100 p-4 rounded">
      <h3 class="font-semibold mb-2">Resumen del carrito:</h3>
      <p><strong>Total de productos:</strong> {{ totalItems }}</p>
      <p><strong>Total de artículos únicos:</strong> {{ uniqueItemsCount }}</p>
      <p><strong>Precio total:</strong> €{{ totalPrice.toFixed(2) }}</p>
      <p><strong>Precio promedio:</strong> €{{ averagePrice.toFixed(2) }}</p>
      <p v-if="hasExpensiveItems" class="text-orange-600"><strong>⚠️ Tienes productos caros (+€50)</strong></p>
      <p><strong>Estado del carrito:</strong> {{ cartStatus }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Reactive data
const title = ref('Carrito de Compras - Sincronización Manual')
const items = ref([
  { id: 1, name: 'Laptop', price: 999, quantity: 1 },
  { id: 2, name: 'Mouse', price: 25, quantity: 2 },
  { id: 3, name: 'Teclado', price: 75, quantity: 1 },
])

const newItemName = ref('')
const newItemPrice = ref(0)

// PROBLEMA: Estado sincronizado manualmente (anti-patrón)
// Estas variables se actualizan manualmente en cada operación
const totalItems = ref(4) // 1 + 2 + 1
const uniqueItemsCount = ref(3)
const totalPrice = ref(1124) // 999 + (25*2) + 75
const averagePrice = ref(374.67) // 1124 / 3
const hasExpensiveItems = ref(true) // Laptop > 50
const cartStatus = ref('Carrito con productos')

// Helper function to recalculate all statistics (called after each operation)
const updateCartStatistics = () => {
  // Recalcular total de productos
  totalItems.value = items.value.reduce((sum, item) => sum + item.quantity, 0)

  // Recalcular productos únicos
  uniqueItemsCount.value = items.value.length

  // Recalcular precio total
  totalPrice.value = items.value.reduce((sum, item) => sum + item.price * item.quantity, 0)

  // Recalcular precio promedio
  averagePrice.value = uniqueItemsCount.value > 0 ? totalPrice.value / uniqueItemsCount.value : 0

  // Verificar productos caros
  hasExpensiveItems.value = items.value.some(item => item.price > 50)

  // Estado del carrito
  if (items.value.length === 0) {
    cartStatus.value = 'Carrito vacío'
  } else if (totalPrice.value > 500) {
    cartStatus.value = 'Carrito premium'
  } else {
    cartStatus.value = 'Carrito con productos'
  }
}

const incrementQuantity = (id: number) => {
  const item = items.value.find(item => item.id === id)
  if (item) {
    item.quantity++
    updateCartStatistics() // ¡Sincronización manual requerida!
  }
}

const decrementQuantity = (id: number) => {
  const item = items.value.find(item => item.id === id)
  if (item && item.quantity > 1) {
    item.quantity--
    updateCartStatistics() // ¡Sincronización manual requerida!
  }
}

const removeItem = (id: number) => {
  items.value = items.value.filter(item => item.id !== id)
  updateCartStatistics() // ¡Sincronización manual requerida!
}

const addItem = () => {
  if (newItemName.value && newItemPrice.value > 0) {
    const newId = Math.max(...items.value.map(item => item.id)) + 1
    items.value.push({
      id: newId,
      name: newItemName.value,
      price: newItemPrice.value,
      quantity: 1,
    })
    newItemName.value = ''
    newItemPrice.value = 0
    updateCartStatistics() // ¡Sincronización manual requerida!
  }
}
</script>
