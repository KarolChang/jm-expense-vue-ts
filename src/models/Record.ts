// export type RecorderType = '建喵' | '豬涵'
import { User } from './User'

export class Record {
  id!: number
  date!: Date
  item!: string
  merchant!: string
  amount!: number
  isClosed!: boolean
  deletedAt!: Date | null
  createdAt!: Date
  updatedAt!: Date
  User!: User
}

export class RecordInput {
  date!: Date
  item!: string
  merchant!: string
  amount!: string
  UserId!: number
}
