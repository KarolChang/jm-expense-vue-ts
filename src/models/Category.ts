export type CategoryType = '支出' | '收入'

export class Category {
  id!: number
  name!: string
  icon!: string
  photoUrl!: string | null
  type!: CategoryType
  deletedAt!: Date | null
  createdAt!: Date
  updatedAt!: Date
}

export class CategoryInput {
  name!: string
  type!: CategoryType
  icon!: string
}
