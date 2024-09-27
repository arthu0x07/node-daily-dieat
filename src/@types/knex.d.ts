import { CreateUserInput } from '@/modules/user/user.schema'

declare module 'knex/types/tables' {
  export interface Tables {
    users: CreateUserInput & {
      id: string
    }

    meals: {
      id: string
      userId: string
      name: string
      time: string
      calories: number
      description: string
      isOnDiet: number
      createdAt: string
      updatedAt: string
    }
  }
}
