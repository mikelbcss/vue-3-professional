<template>
  <div class="space-y-3 p-4 rounded border">
    <h3 class="text-base font-semibold">Contador A</h3>

    <div class="flex items-center justify-between">
      <p>Valor: <strong>{{ count }}</strong></p>
      <span class="text-xs text-muted-foreground" v-if="isEven">Es par</span>
    </div>

    <div class="flex gap-2">
      <button class="px-3 py-1 rounded bg-primary text-primary-foreground" @click="increment">+{{ step }}</button>
      <button class="px-3 py-1 rounded bg-secondary text-secondary-foreground" @click="decrement">-{{ step }}</button>
      <button class="px-3 py-1 rounded border" @click="reset">Reset</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const step = 1
const count = ref<number>(0)

function increment() {
  count.value += step
}

function decrement() {
  count.value -= step
}

function reset() {
  count.value = 0
}

const isEven = computed(() => count.value % 2 === 0)
</script>
