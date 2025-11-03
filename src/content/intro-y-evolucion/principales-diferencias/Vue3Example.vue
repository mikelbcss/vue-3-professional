<template>
  <div class="counter">
    <h2>{{ title }}</h2>
    <p>Contador: {{ count }}</p>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
    <p v-if="isEven">El número es par</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const title = ref('Mi Contador')
const count = ref(0)

const isEven = computed(() => count.value % 2 === 0)

const increment = () => {
  count.value++
}

const decrement = () => {
  count.value--
}
</script>
