import { Category } from './Category'

export class Expense {
  id!: number
  date!: Date
  item?: string
  amount!: number
  note?: string
  deletedAt?: Date | null
  createdAt!: Date
  updatedAt!: Date
  Category!: Category
}

export class ExpenseInput {
  date!: Date
  item!: string
  amount!: string
  note?: string
  CategoryId!: number
}
