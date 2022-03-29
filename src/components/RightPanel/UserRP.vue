<script setup lang="ts">
import { ref, inject, Ref } from 'vue'
import RightPanel from '@/components/RightPanel/RightPanel.vue'
import userAPI from '@/apis/user'
import { UserEditInput } from '@/models'
import { Toast } from '@/utils/swal'
import { useStore } from '@/store/index'
const store = useStore()

// inject
const userRPOpen = inject<Ref<boolean>>('userRPOpen')!

// data
const editField = ref<'displayName' | 'photoURL' | ''>('')
const user = ref(new UserEditInput())
const isLoading = ref<boolean>(false)

// methods
const editUser = async function () {
  try {
    if (store.currentUser) {
      isLoading.value = true
      const { data } = await userAPI.user.edit(store.currentUser.id, user.value)
      store.getCurrentUser(store.currentUser.email)
      if (data.status !== 'success') {
        throw new Error(`[SERVER ERROR] ${data.message}`)
      }
      editField.value = ''
      Toast.fire({
        icon: 'success',
        title: '成功編輯個人資料！'
      })
      isLoading.value = false
    }
  } catch (error) {
    console.error('error', error)
    Toast.fire({
      icon: 'error',
      title: '編輯個人資料失敗！'
    })
  }
}

// created
if (store.currentUser) {
  user.value = {
    displayName: store.currentUser.displayName,
    photoURL: store.currentUser.photoURL
  }
}
</script>

<template>
  <RightPanel @RPOpen="userRPOpen = false">
    <template #title>
      <h5 class="text-dark mb-3">個人資料</h5>
    </template>
    <template #content>
      <div class="my-3">
        <div class="text-dark fw-bold">
          <span class="badge rounded-pill bg-success ms-2 mb-1">信箱</span>
          <span class="ms-2">{{ store.currentUser?.email }}</span>
        </div>
      </div>
      <div class="mb-3">
        <div class="text-dark fw-bold">
          <span class="badge rounded-pill bg-success ms-2">名稱</span>
          <span class="ms-2">
            <template v-if="editField === 'displayName'">
              <input
                type="text"
                class="form-control d-inline-block"
                id="displayName"
                style="width: 120px"
                v-model="user.displayName"
              />
              <div class="spinner-border spinner-border-sm text-success ms-2" role="status" v-if="isLoading">
                <span class="visually-hidden">Loading...</span>
              </div>
              <i v-else class="far fa-check-circle fa-lg ms-2" @click="editUser"></i>
            </template>
            <template v-else>
              <span>{{ user.displayName }}</span>
              <i class="far fa-edit ms-2" @click="editField = 'displayName'"></i>
            </template>
          </span>
        </div>
      </div>
      <div class="mb-3">
        <div class="text-dark fw-bold">
          <span class="badge rounded-pill bg-success ms-2">大頭貼(url)</span>
          <span class="ms-2">
            <template v-if="editField === 'photoURL'">
              <div class="d-flex">
                <div class="input-group mt-2">
                  <textarea class="form-control" aria-label="With textarea" v-model="user.photoURL"></textarea>
                </div>
                <div class="spinner-border spinner-border-sm text-success ms-2 mt-4" role="status" v-if="isLoading">
                  <span class="visually-hidden">Loading...</span>
                </div>
                <i v-else class="far fa-check-circle fa-lg ms-2 mt-4" @click="editUser"></i>
              </div>
            </template>
            <template v-else>
              <img :src="user.photoURL || ''" alt="photoURL" width="55" height="55" class="rounded-circle" />
              <i class="far fa-edit ms-2" @click="editField = 'photoURL'"></i>
            </template>
          </span>
        </div>
      </div>
    </template>
  </RightPanel>
</template>
<style scoped>
span {
  float: left;
}

span[class~='badge'] {
  margin-top: 0.2em;
}

i {
  color: black;
}

i:hover {
  color: rgb(86, 116, 42);
  cursor: pointer;
}
</style>
