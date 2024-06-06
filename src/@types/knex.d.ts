import { CreateUserInput } from '@/modules/user/user.schema'

declare module 'knex/types/tables' {
  export interface Tables {
    users: CreateUserInput & {
      id: string
    }
  }
}
