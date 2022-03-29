import { apiHelper } from './helper'
import { ExpenseInput, CategoryInput } from '@/models'

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
    },
    edit(id: number, data: ExpenseInput) {
      return apiHelper.put(`/expense/edit/${id}`, data)
    },
    delete(id: number) {
      return apiHelper.delete(`/expense/delete/${id}`)
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
