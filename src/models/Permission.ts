import { Role } from '@/models/index'

export type ActionTypePermission = '查看' | '新增' | '編輯' | '刪除' | '停用' | '操作'

export class Permission {
  id!: number
  action!: ActionTypePermission
  item!: string
  description!: string
  deletedAt!: Date | null
  createdAt!: Date
  updatedAt!: Date
  Roles!: Role[]
}

export class PermissionInput {
  action!: ActionTypePermission
  item!: string
  description!: string
}
