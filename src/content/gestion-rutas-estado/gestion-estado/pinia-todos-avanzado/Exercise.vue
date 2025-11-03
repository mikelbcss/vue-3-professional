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
      <button class="px-3 py-2 rounded border hover:bg-muted" @click="todoStore.clearTodos()">Reset</button>
      <span class="text-sm text-muted-foreground">Completadas: {{ todoStore.completedTodos.length }}</span>
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
        v-for="todo in todoStore.getTodosByName(searchText)"
        :key="todo.id"
        class="flex items-center p-3 bg-white border border-gray-200 rounded-md gap-3"
      >
        <input v-model="todo.completed" type="checkbox" class="size-4" />
        <span :class="['flex-1', todo.completed ? 'line-through text-muted-foreground' : '']">{{ todo.text }}</span>
        <button class="text-xs px-2 py-1 rounded border" @click="toggle(todo.id)">Toggle</button>
      </li>
    </ul>

    <!-- Mensaje si no hay todos -->
    <p v-if="todoStore.todoList.length === 0" class="text-gray-500 text-center mt-4">No hay tareas aún. ¡Añade tu primera tarea!</p>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  import type { Todo } from './todo'
  import { useTodoStore } from './todoStore'

  const todoStore = useTodoStore()

  const newTodoText = ref('')
  const searchText = ref('')

  function add(text: string) {
    const newTodo: Todo = { id: Date.now().toString(), text, completed: false, name: 'todo-item' }
    todoStore.addTodo(newTodo)
  }

  function toggle(id: string) {
    const t = todoStore.todoList.find(t => t.id === id)
    if (t) t.completed = !t.completed
  }


  function handleAdd() {
    const text = newTodoText.value.trim()
    if (!text) return
    add(text)
    newTodoText.value = ''
}
</script>
