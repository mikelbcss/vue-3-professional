<template>
  <div class="max-w-2xl mx-auto p-6 space-y-4">
    <h1 class="text-2xl font-bold">Capas: partimos de un componente monolítico</h1>

    <div class="flex items-center justify-between">
      <p class="text-muted-foreground">Carga una lista de TODOS desde jsonplaceholder</p>
      <button class="px-3 py-1.5 text-sm rounded bg-blue-600 text-white hover:bg-blue-700" @click="loadTodos">
        Volver a cargar
      </button>
    </div>

    <div class="border rounded-md p-4 bg-white">
      <h2 class="font-semibold mb-2">Resultado</h2>
      <ul class="list-disc pl-5 space-y-1">
        <li v-for="todo in todos" :key="todo.id" class="text-sm">
          <span :class="{ 'line-through text-muted-foreground': todo.completed }">{{ todo.title }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { Todo } from './todo.ts'
import { useCaseService, getTodosQry } from './container.ts'

const todos = ref<Todo[]>([])

async function loadTodos() {
  todos.value = await useCaseService.execute(getTodosQry)
}

onMounted(loadTodos)
</script>
