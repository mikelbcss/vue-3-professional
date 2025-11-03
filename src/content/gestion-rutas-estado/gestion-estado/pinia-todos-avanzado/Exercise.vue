<template>
  <div class="max-w-2xl mx-auto p-6 space-y-6">
    <h1 class="text-2xl font-bold">Lista de Tareas</h1>

    <!-- Formulario -->
    <form class="mb-2" @submit.prevent="handleAdd">
      <div class="flex gap-2">
        <input
          v-model="newTodoText"
          placeholder="¿Qué necesitas hacer?"
          class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Añadir</button>
      </div>
    </form>

    <!-- Acciones extra -->
    <div class="flex items-center gap-3">
      <button class="px-3 py-2 rounded border hover:bg-muted" @click="reset()">Reset</button>
      <span class="text-sm text-muted-foreground">Completadas: {{ completedCount }}</span>
    </div>

    <!-- Buscador por nombre -->
    <div class="mt-2 flex items-center gap-2">
      <input
        v-model="searchText"
        type="text"
        placeholder="Buscar por nombre"
        class="w-56 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <!-- Lista de todos -->
    <ul class="space-y-2">
      <li
        v-for="todo in filteredTodos"
        :key="todo.id"
        class="flex items-center p-3 bg-white border border-gray-200 rounded-md gap-3"
      >
        <input v-model="todo.completed" type="checkbox" class="size-4" />
        <span :class="['flex-1', todo.completed ? 'line-through text-muted-foreground' : '']">{{ todo.text }}</span>
        <button class="text-xs px-2 py-1 rounded border" @click="toggle(todo.id)">Toggle</button>
      </li>
    </ul>

    <!-- Mensaje si no hay todos -->
    <p v-if="todos.length === 0" class="text-gray-500 text-center mt-4">No hay tareas aún. ¡Añade tu primera tarea!</p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

interface Todo {
  id: number
  text: string
  completed: boolean
}

const todos = ref<Todo[]>([])
const newTodoText = ref('')
const searchText = ref('')

function add(text: string) {
  const newTodo: Todo = { id: Date.now(), text, completed: false }
  todos.value.push(newTodo)
}

function toggle(id: number) {
  const t = todos.value.find(t => t.id === id)
  if (t) t.completed = !t.completed
}

function reset() {
  todos.value = []
}

const completedCount = computed(() => todos.value.filter(t => t.completed).length)

const filteredTodos = computed(() => {
  const q = searchText.value.trim().toLowerCase()
  if (!q) return todos.value
  return todos.value.filter(t => t.text.toLowerCase().includes(q))
})

function handleAdd() {
  const text = newTodoText.value.trim()
  if (!text) return
  add(text)
  newTodoText.value = ''
}
</script>
