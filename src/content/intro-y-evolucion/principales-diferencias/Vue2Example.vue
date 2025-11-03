<template>
  <div class="counter">
    <h2>{{ title }}</h2>
    <p>Contador: {{ count }}</p>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
    <p v-if="isEven">El número es par</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'Mi Contador',
      count: 0,
    }
  },
  computed: {
    isEven() {
      return this.count % 2 === 0
    },
  },
  methods: {
    increment() {
      this.count++
    },
    decrement() {
      this.count--
    },
  },
}
</script>
