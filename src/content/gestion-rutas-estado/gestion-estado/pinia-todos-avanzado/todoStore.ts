import { defineStore } from "pinia";
import type { Todo } from "./todo";

export const useTodoStore = defineStore("todo", {
    state: () => ({todos: [] as Todo[]}),
    getters: {
        todoList: (state) => state.todos,
        completedTodos: (state) => state.todos.filter(todo => todo.completed),
        getTodosByName: (state) => {
            return (name: string) => {
                const text = name.trim().toLowerCase()
                return state.todos.filter(todo => todo.text.trim().toLowerCase().includes(text));
            };
        },
    },
    actions:{
        addTodo(todo: Todo){
            this.todos.push(todo);
        },
        removeTodo(id: string){
            this.todos = this.todos.filter(todo => todo.id !== id);
        },
        clearTodos(){
            this.todos = [];
        }
    }
});