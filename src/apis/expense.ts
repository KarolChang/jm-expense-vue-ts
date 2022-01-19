import { apiHelper } from './helper'
import { ExpenseInput } from '../models/Expense'
import { CategoryInput } from '../models/Category'

export default {
  expense: {
    getAll() {
      return apiHelper.get('/expense/all')
    },
    getOne(id: number) {
      return apiHelper.get(`/expense/${id}`)
    },
    create(data: ExpenseInput) {
      return apiHelper.post('/expense/create', data)
    }
  },
  category: {
    getAll() {
      return apiHelper.get('/category/all')
    },
    getOne(id: number) {
      return apiHelper.get(`/category/${id}`)
    },
    create(data: CategoryInput) {
      return apiHelper.post('/category/create', data)
    },
    edit(id: number, data: CategoryInput) {
      return apiHelper.put(`/category/edit/${id}`, data)
    },
    delete(id: number) {
      return apiHelper.delete(`/category/delete/${id}`)
    }
  }
}
