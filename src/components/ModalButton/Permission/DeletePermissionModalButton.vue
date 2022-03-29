<script setup lang="ts">
import { inject } from 'vue'
import { Toast, ConfirmBox } from '@/utils/swal'
import userAPI from '@/apis/user'
import { Permission } from '@/models'

// props
const props = defineProps<{
  permission: Permission
}>()

// inject
const refetchPermissions = inject<() => {}>('refetchPermissions')!

// methods
const btnClick = async () => {
  try {
    const { isConfirmed } = await ConfirmBox.fire({
      title: `確定刪除權限[${props.permission.action}-${props.permission.item}]嘛？`,
      showCancelButton: true
    })
    if (isConfirmed) {
      deletePermission(props.permission.id)
    }
  } catch (error) {
    console.error('error', error)
  }
}

const deletePermission = async function (id: number) {
  try {
    const { data } = await userAPI.permission.delete(id)
    if (data.status !== 'success') {
      throw new Error(`[SERVER ERROR] ${data.message}`)
    }
    refetchPermissions()
    Toast.fire({
      icon: 'success',
      title: `成功刪除權限[${data.data.action}-${data.data.item}]`
    })
  } catch (error) {
    console.error('error', error)
    Toast.fire({
      icon: 'error',
      title: '刪除權限失敗！'
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
