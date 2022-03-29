import { apiHelper, LineInput } from './helper'
import { RecordInput } from '@/models'

export default {
  getAll() {
    return apiHelper.get('/record/all')
  },
  getOne(id: number) {
    return apiHelper.get(`/record/${id}`)
  },
  create(data: RecordInput) {
    return apiHelper.post('/record/create', data)
  },
  edit(id: number, data: RecordInput) {
    return apiHelper.put(`/record/edit/${id}`, data)
  },
  delete(id: number) {
    return apiHelper.delete(`/record/delete/${id}`)
  },
  close(data: { records: string; totalAmount: number; UserId: number }) {
    return apiHelper.put('/close', data)
  },
  getLogs() {
    return apiHelper.get('/log/all')
  }
}
