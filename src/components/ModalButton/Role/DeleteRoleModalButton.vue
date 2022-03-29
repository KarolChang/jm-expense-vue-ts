<script setup lang="ts">
import { inject } from 'vue'
import { Toast, ConfirmBox } from '@/utils/swal'
import userAPI from '@/apis/user'
import { Role } from '@/models'

// props
const props = defineProps<{
  role: Role
}>()

// inject
const refetchRoles = inject<() => {}>('refetchRoles')!

// methods
const btnClick = async () => {
  try {
    const { isConfirmed } = await ConfirmBox.fire({
      title: `確定刪除角色[${props.role.name}]嘛？`,
      showCancelButton: true
    })
    if (isConfirmed) {
      deleteRole(props.role.id)
    }
  } catch (error) {
    console.error('error', error)
  }
}

const deleteRole = async function (id: number) {
  try {
    const { data } = await userAPI.role.delete(id)
    if (data.status !== 'success') {
      throw new Error(`[SERVER ERROR] ${data.message}`)
    }
    refetchRoles()
    Toast.fire({
      icon: 'success',
      title: `成功刪除角色[${data.data.name}]`
    })
  } catch (error) {
    console.error('error', error)
    Toast.fire({
      icon: 'error',
      title: '刪除角色失敗！'
    })
  }
}
</script>
<template>
  <i class="fas fa-trash" @click="btnClick"></i>
</template>
<style scoped>
i:hover {
  color: rgb(226, 19, 19);
  cursor: pointer;
}
</style>
