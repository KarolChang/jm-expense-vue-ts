import { apiHelper, LineInput } from './helper'
import { RecordInput } from '../models/Record'

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
  close(data: { records: string; totalAmount: number; recorder: string }) {
    return apiHelper.put('/close', data)
  },
  getLogs() {
    return apiHelper.get('/log/all')
  },
  pushLineMsg(data: LineInput) {
    return apiHelper.post('/lineBot/push', data)
  }
}
