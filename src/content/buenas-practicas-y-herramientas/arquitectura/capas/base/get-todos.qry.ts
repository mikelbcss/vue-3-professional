import type { Query } from './use-case.ts'
import type { Todo } from './todo.ts'
import type { TodoRepository } from './todo.repository.ts'

export class GetTodosQry implements Query<Todo[]> {
  constructor(private readonly todoRepository: TodoRepository) {}

  async handle(): Promise<Todo[]> {
    return this.todoRepository.findAll()
  }
}
