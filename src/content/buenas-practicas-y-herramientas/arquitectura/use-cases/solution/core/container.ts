import { UseCaseService } from './use-cases/use-case-service.ts'
import { GetTodoQry } from '../application/get-todo.qry.ts'

export const useCaseService = new UseCaseService()
export const getTodoQry = new GetTodoQry()
