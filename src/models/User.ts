import { Record, Log, Expense, Role } from '@/models/index'

export class User {
  id!: number
  email!: string
  displayName!: string
  photoURL!: string
  firebaseUid!: string
  active!: boolean
  createdAt!: Date
  updatedAt!: Date
  Records!: Record[]
  Logs!: Log[]
  Expenses!: Expense[]
  Role!: Role
}

export class FirebaseUserInput {
  email!: string
  password!: string
  displayName!: string
  photoURL!: string
}

export class UserCreateInput {
  email!: string
  displayName!: string
  photoURL!: string | null
  firebaseUid!: string
}

export class UserEditInput {
  displayName?: string
  photoURL?: string
}
