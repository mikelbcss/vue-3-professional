import { UseCaseService } from './use-case-service.ts'
import { GetTodosQry } from './get-todos.qry.ts'

export const useCaseService = new UseCaseService()
export const getTodoQry = new GetTodosQry()
