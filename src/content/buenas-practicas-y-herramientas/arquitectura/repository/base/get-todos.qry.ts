import type { Query } from './use-case.ts'

export interface Todo {
  userId: number
  id: number
  title: string
  completed: boolean
}

export class GetTodosQry implements Query<Todo> {
  async handle(): Promise<Todo> {
    const res = await fetch(`https://jsonplaceholder.typicode.com/todos/`)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return (await res.json()) as Todo
  }
}
