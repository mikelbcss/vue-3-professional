import { defineStore } from "pinia";
import type { Todo } from "./todo";

export const useTodoStore = defineStore("todo", {
    state: () => ({todos: [] as Todo[]}),
    getters: {
        todoList: (state) => state.todos,
    },
    actions:{
        addTodo(todo: Todo){
            this.todos.push(todo);
        },
        removeTodo(id: string){
            this.todos = this.todos.filter(todo => todo.id !== id);
        }
    }
});