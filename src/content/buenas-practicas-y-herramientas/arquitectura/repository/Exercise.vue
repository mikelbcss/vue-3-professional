<template>
  <div class="max-w-2xl mx-auto p-6 space-y-4">
    <h1 class="text-2xl font-bold">Repository: del componente al repositorio</h1>

    <p class="text-muted-foreground">
      Punto de partida: este componente obtiene la lista de TODOS directamente con <code>fetch</code> y mapea el
      resultado aquí mismo. Tu objetivo será mover esta lógica a una capa de <strong>Repositorio</strong> y consumirla
      desde un <strong>Use Case</strong> que a su vez usará el repositorio.
    </p>

    <div class="border rounded-md p-4 bg-white">
      <div class="flex items-center justify-between">
        <h2 class="font-semibold">Resultado</h2>
        <button class="px-3 py-1.5 text-sm rounded bg-blue-600 text-white hover:bg-blue-700" @click="loadTodos">
          Volver a cargar
        </button>
      </div>

      <div class="mt-3">
        <pre class="text-sm whitespace-pre-wrap">{{ pretty }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

interface Todo {
  userId: number
  id: number
  title: string
  completed: boolean
}

const todos = ref<Todo[]>([])

const pretty = computed(() => JSON.stringify(todos.value, null, 2))

async function loadTodos() {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const data = (await res.json()) as Todo[]
  todos.value = data
}

onMounted(loadTodos)
</script>
