import type { Todo } from './todo.ts'
import type { FindableAll } from './findable-all.ts'

export interface TodoRepository extends FindableAll<Todo> {}
