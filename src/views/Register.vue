<script setup lang="ts">
import { ref } from 'vue'
import userAPI from '@/apis/user'
import { Toast } from '@/utils/swal'
import { FirebaseUserInput } from '@/models'
import { useRouter } from 'vue-router'
const router = useRouter()

// data
const user = ref(new FirebaseUserInput())

// methods
const register = async () => {
  try {
    const { displayName, email, password } = user.value
    if (!displayName || !email || !password) {
      return Toast.fire({
        icon: 'warning',
        title: '名稱、信箱、密碼為必填選項！'
      })
    }
    if (password.length < 6) {
      return Toast.fire({
        icon: 'warning',
        title: '密碼至少要6位！'
      })
    }
    // 註冊至 firebase
    const { data } = await userAPI.user.firebase_email_register(user.value)
    // 存入 DB
    await userAPI.user.create({
      email: user.value.email,
      displayName: user.value.displayName,
      photoURL: user.value.photoURL,
      firebaseUid: data.data.uid
    })
    Toast.fire({
      icon: 'success',
      title: '註冊成功！'
    })
    router.push({ name: 'Login' })
  } catch (error) {
    console.error('error', error)
    Toast.fire({
      icon: 'error',
      title: '註冊失敗！'
    })
  }
}
</script>

<template>
  <div>
    <button class="btn btn-info login-btn" type="button" @click="router.push({ name: 'Login' })">前往登入</button>
    <div class="m-auto" style="width: 70vw">
      <form>
        <img src="@/assets/logo2.png" alt="" width="150" height="150" />
        <h1 class="h3 mb-3 fw-normal">臭建喵記帳 Register</h1>

        <div class="form-floating">
          <input type="text" class="form-control" id="name-register" v-model="user.displayName" autocomplete="on" />
          <label for="name-register">名稱</label>
        </div>
        <div class="form-floating">
          <input type="url" class="form-control" id="photoUrl-register" v-model="user.photoURL" autocomplete="on" />
          <label for="photoUrl-register">大頭貼(url)</label>
        </div>
        <div class="form-floating">
          <input type="email" class="form-control" id="email-register" v-model="user.email" autocomplete="on" />
          <label for="email-register">信箱</label>
        </div>
        <div class="form-floating">
          <input
            type="password"
            class="form-control"
            id="password-register"
            v-model="user.password"
            autocomplete="on"
          />
          <label for="password-register">密碼</label>
        </div>

        <!-- <div class="checkbox mb-3">
        <label> <input type="checkbox" value="remember-me" /> Remember me </label>
      </div> -->
        <button
          class="w-100 btn btn-lg mt-3"
          type="button"
          @click="register"
          style="color: white; background-color: mediumaquamarine"
        >
          取得進入豬豬世界的門票
        </button>
      </form>
    </div>
  </div>
</template>
<style scoped>
.login-btn {
  position: fixed;
  top: 1em;
  right: 1em;
}
</style>
