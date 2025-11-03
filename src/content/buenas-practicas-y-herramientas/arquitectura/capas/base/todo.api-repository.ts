import type { TodoRepository } from './todo.repository.ts'
import type { HttpClient } from './http-client.ts'
import type { Todo } from './todo.ts'
import type { TodoDto } from './todo.dto.ts'

export class TodoApiRepository implements TodoRepository {
  constructor(private readonly httpClient: HttpClient) {}

  async findAll(): Promise<Todo[]> {
    const dtos = await this.httpClient.get<TodoDto[]>('todos?_limit=5')
    // Aquí podrías transformar si hiciera falta. En este caso, el DTO ya es válido.
    return dtos.map(dto => ({ ...dto }))
  }
}
