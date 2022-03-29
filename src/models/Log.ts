import { User } from './User'
import { Record } from './Record'
type ActionType = '新增' | '編輯' | '結算'

export class Log {
  action!: ActionType
  item?: string
  merchant?: string
  amount?: number
  date?: Date
  itemBefore?: string
  merchantBefore?: string
  amountBefore?: number
  dateBefore?: Date
  closeAmount?: number
  RecordId?: number
  RecordIds?: string
  createdAt!: Date
  updatedAt!: Date
  User!: User
  Records!: Record[]
}
