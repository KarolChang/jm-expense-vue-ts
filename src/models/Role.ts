import { Permission } from '@/models/index'

export class Role {
  id!: number
  name!: string
  name_en!: string
  deletedAt!: Date | null
  createdAt!: Date
  updatedAt!: Date
  Permissions!: Permission[]
}

export class RoleInput {
  name!: string
  name_en!: string
}
