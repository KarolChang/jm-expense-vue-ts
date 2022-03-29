<script setup lang="ts">
import { ref } from 'vue'
// import userAPI from '../apis/user'
// import { User } from '../models/User'
import { Toast } from '@/utils/swal'
import { useRouter } from 'vue-router'
const router = useRouter()
// import { useStore } from '../store/index'
// const store = useStore()

// import {
//   getAuth,
//   GoogleAuthProvider,
//   signInWithEmailAndPassword,
//   signInWithPopup,
//   User as FirebaseUser
// } from 'firebase/auth'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
// import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword } from 'firebase/auth'
const auth = getAuth()
// const provider = new GoogleAuthProvider()

// data
const email = ref('')
const password = ref('')

// methods
const signInEmail = () => {
  if (!email.value || !password.value) {
    return Toast.fire({
      icon: 'warning',
      title: '信箱、密碼為必填選項！'
    })
  }
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user
      Toast.fire({
        icon: 'success',
        title: `歡迎[${user.displayName}]進入豬豬世界🐷`
      })
      router.push({ name: 'Home' })
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      console.log('error', errorCode, errorMessage)
      Toast.fire({
        icon: 'error',
        title: '豬豬世界不歡迎你 ☠️'
      })
    })
}

// const signInGoogle = () => {
//   signInWithPopup(auth, provider)
//     .then(async (result) => {
//       // const credential = GoogleAuthProvider.credentialFromResult(result)
//       // const token = credential?.accessToken
//       const firebaseUser: FirebaseUser = result.user
//       console.log('firebaseUser', firebaseUser)
//       // 檢查是否有相同帳號
//       const { data } = await userAPI.getAll()
//       const user = data.data.find((user: User) => user.email === firebaseUser.email)
//       if (!user) {
//         await userAPI.create({
//           email: user.email!,
//           displayName: user.displayName!,
//           photoURL: user.photoURL ? user.photoURL : null,
//           firebaseUid: user.uid
//         })
//         Toast.fire({
//           icon: 'success',
//           title: `@GOOGLE@ 歡迎[${firebaseUser.displayName}]進入豬豬世界🐷`
//         })
//         router.push({ name: 'Home' })
//       } else {
//         Toast.fire({
//           icon: 'error',
//           title: `${firebaseUser.email} 這個信箱已被註冊過！`
//         })
//       }
//     })
//     .catch((error) => {
//       console.error('error', error)
//     })
// }
</script>

<template>
  <div>
    <button class="btn btn-info register-btn" type="button" @click="router.push({ name: 'Register' })">前往註冊</button>
    <div class="m-auto" style="width: 70vw">
      <form>
        <img src="@/assets/logo2.png" alt="" width="150" height="150" />
        <h1 class="h3 mb-3 fw-normal">臭建喵記帳 Login</h1>

        <div class="form-floating">
          <input type="email" class="form-control" id="email-login" v-model="email" autocomplete="on" />
          <label for="email-login">信箱</label>
        </div>
        <div class="form-floating">
          <input
            type="password"
            class="form-control"
            id="password-login"
            v-model="password"
            autocomplete="on"
            @keyup.enter="signInEmail"
          />
          <label for="password-login">密碼</label>
        </div>

        <!-- <div class="checkbox mb-3">
        <label> <input type="checkbox" value="remember-me" /> Remember me </label>
      </div> -->
        <button
          class="w-100 btn btn-lg mt-3"
          type="button"
          @click="signInEmail"
          style="color: white; background-color: coral"
        >
          進入豬豬世界
        </button>
        <!-- <button class="w-100 btn btn-lg btn-success mt-3" type="button" @click="signInGoogle">Google登入</button> -->
      </form>
    </div>
  </div>
</template>
<style scoped>
.register-btn {
  position: fixed;
  top: 1em;
  right: 1em;
}
</style>
