import { defineStore } from 'pinia'

export const useStore = defineStore('index', {
  state: () => ({
    currentUser: localStorage.getItem('jm-user')
  }),
  getters: {
    icon: (state) => (state.currentUser === '豬涵' ? '🐷' : '🐣')
  },
  actions: {
    switchUser(user: string) {
      localStorage.setItem('jm-user', user)
      this.currentUser = user
    }
  }
})
