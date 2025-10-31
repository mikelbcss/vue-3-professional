<template>
  <div class="max-w-2xl mx-auto p-6">
    <h1 class="text-2xl font-bold mb-6">Lista de Tareas</h1>

    <!-- Formulario básico -->
    <form @submit.prevent="addTodo" class="mb-6">
      <div class="flex gap-2">
        <input
          v-model="newTodoText"
          placeholder="¿Qué necesitas hacer?"
          class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
        <button
          type="submit"
          class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Añadir
        </button>
      </div>
    </form>

    <!-- Lista básica de todos -->
    <ul class="space-y-2">
      <li
        v-for="todo in todos"
        :key="todo.id"
        class="flex items-center p-3 bg-white border border-gray-200 rounded-md"
      >
        <span class="flex-1">{{ todo.text }}</span>
      </li>
    </ul>

    <!-- Mensaje si no hay todos -->
    <p v-if="todos.length === 0" class="text-gray-500 text-center mt-4">
      No hay tareas aún. ¡Añade tu primera tarea!
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      todos: [],
      newTodoText: '',
    };
  },
  methods: {
    addTodo() {
      if (this.newTodoText.trim()) {
        const newTodo = {
          id: Date.now(),
          text: this.newTodoText.trim(),
          completed: false,
        };
        this.todos.push(newTodo);
        this.newTodoText = '';
      }
    },
  },
};
</script>
