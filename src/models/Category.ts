export class Category {
  id!: number
  name!: string
  icon?: string
  photoUrl?: string
  deletedAt?: Date | null
  createdAt!: Date
  updatedAt!: Date
}

export class CategoryInput {
  name!: string
  icon?: string
  photoUrl?: string
}
