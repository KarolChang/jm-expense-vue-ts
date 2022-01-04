export type RecorderType = '建喵' | '豬涵'

export class Record {
  id!: number
  date!: Date
  item?: string
  merchant?: string
  amount!: number
  recorder?: RecorderType
  isClosed?: boolean
  deletedAt?: Date | null
  createdAt!: Date
  updatedAt!: Date
}

export class RecordInput {
  date!: Date
  item!: string
  merchant!: string
  amount!: string
  recorder?: RecorderType
  editor?: RecorderType
}
