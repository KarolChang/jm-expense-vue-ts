import { defineStore } from 'pinia'

export const useStore = defineStore('index', {
  state: () => ({
    currentUser: localStorage.getItem('jm-user')
  }),
  // getter: {}
  actions: {
    switchUser(user: string) {
      localStorage.setItem('jm-user', user)
      this.currentUser = user
    }
  }
})
