import { getAuth, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth'
import { useStore } from '../store/index'

// export const getFirebaseUser = () => {
//   onAuthStateChanged(getAuth(), (user: FirebaseUser | null) => {
//     const store = useStore()
//     if (user) {
//       console.log('[auth] Get Firebase User', user)
//       store.login(user)
//     } else {
//       store.logout()
//     }
//   })
// }

export const getFirebaseUser = () => {
  const store = useStore()
  return new Promise<void>((resolve) => {
    onAuthStateChanged(getAuth(), async (user: FirebaseUser | null) => {
      console.log(`[firebase] onAuthStateChanged`)
      if (user) {
        console.log('[auth] Get Firebase User', user)
        store.login(user)
      } else {
        store.logout()
      }
      resolve()
    })
  })
}
