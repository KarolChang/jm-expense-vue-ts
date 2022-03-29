import { apiHelper } from './helper'
import { FirebaseUserInput, UserCreateInput, UserEditInput, RoleInput, PermissionInput } from '@/models'

export default {
  user: {
    firebase_email_register(data: FirebaseUserInput) {
      return apiHelper.post('/user/register', data)
    },
    create(data: UserCreateInput) {
      return apiHelper.post('/user/create', data)
    },
    edit(id: number, data: UserEditInput) {
      return apiHelper.put(`/user/edit/${id}`, data)
    },
    getAll() {
      return apiHelper.get('/user/all')
    },
    getUserByEmail(email: string) {
      return apiHelper.get(`/user/${email}`)
    }
  },
  role: {
    getAll() {
      return apiHelper.get('/role/all')
    },
    getOne(id: number) {
      return apiHelper.get(`/role/${id}`)
    },
    create(data: RoleInput) {
      return apiHelper.post('/role/create', data)
    },
    edit(id: number, data: RoleInput) {
      return apiHelper.put(`/role/edit/${id}`, data)
    },
    delete(id: number) {
      return apiHelper.delete(`/role/delete/${id}`)
    }
  },
  permission: {
    getAll() {
      return apiHelper.get('/permission/all')
    },
    create(data: PermissionInput) {
      return apiHelper.post('/permission/create', data)
    },
    edit(id: number, data: PermissionInput) {
      return apiHelper.put(`/permission/edit/${id}`, data)
    },
    delete(id: number) {
      return apiHelper.delete(`/permission/delete/${id}`)
    }
  }
}
