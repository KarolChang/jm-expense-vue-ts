import { defineStore } from 'pinia'
import { User as FirebaseUser } from 'firebase/auth'
import { User } from '@/models'
import userAPI from '@/apis/user'

export const useStore = defineStore('index', {
  state: () => ({
    // currentUser: localStorage.getItem('jm-user')
    firebaseUser: null as null | FirebaseUser,
    currentUser: null as null | User
  }),
  getters: {
    nickName: (state) => {
      if (state.currentUser?.email === 'super000999888@gmail.com') {
        return '豬涵'
      } else if (state.currentUser?.email === 'bir840124@gmail.com') {
        return '建喵'
      } else {
        return ''
      }
    },
    icon: (state) => {
      if (state.currentUser?.email === 'super000999888@gmail.com') {
        return '🐷'
      } else if (state.currentUser?.email === 'bir840124@gmail.com') {
        return '🐣'
      } else {
        return ''
      }
    }
  },
  actions: {
    // switchUser(user: string) {
    //   localStorage.setItem('jm-user', user)
    //   this.currentUser = user
    // }
    async getCurrentUser(email: string) {
      try {
        const { data } = await userAPI.user.getUserByEmail(email)
        this.currentUser = data.data
        console.log('[getCurrentUser] this.currentUser', this.currentUser)
      } catch (error) {
        console.error('error')
      }
    },
    login(user: FirebaseUser) {
      this.firebaseUser = user
      this.getCurrentUser(user.email!)
    },
    logout() {
      this.firebaseUser = null
      this.currentUser = null
    }
  }
})
