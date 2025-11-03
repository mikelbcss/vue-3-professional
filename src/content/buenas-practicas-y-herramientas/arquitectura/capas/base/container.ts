import { GetTodosQry } from './get-todos.qry.ts'
import { FetchHttpClient } from './fetch-http-client.ts'
import { TodoApiRepository } from './todo.api-repository.ts'
import { UseCaseService } from './use-case-service.ts'

export const httpClient = new FetchHttpClient('https://jsonplaceholder.typicode.com')
export const todoRepository = new TodoApiRepository(httpClient)
export const getTodosQry = new GetTodosQry(todoRepository)
export const useCaseService = new UseCaseService()
