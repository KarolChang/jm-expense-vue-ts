<script setup lang="ts">
import { inject } from 'vue'
import { Toast, ConfirmBox } from '@/utils/swal'
import recordAPI from '@/apis/record'
import { Record } from '@/models'

// props
const props = defineProps<{
  record: Record
}>()

// inject
const refetchRecords = inject<() => {}>('refetchRecords')!

// methods
const btnClick = async () => {
  try {
    const { isConfirmed } = await ConfirmBox.fire({
      title: `確定刪除紀錄[${props.record.item}]嘛？`,
      showCancelButton: true
    })
    if (isConfirmed) {
      deleteRecord(props.record.id)
    }
  } catch (error) {
    console.error('error', error)
  }
}

const deleteRecord = async function (id: number) {
  try {
    const { data } = await recordAPI.delete(id)
    if (data.status !== 'success') {
      throw new Error(`[SERVER ERROR] ${data.message}`)
    }
    refetchRecords()
    Toast.fire({
      icon: 'success',
      title: `成功刪除紀錄[${data.data.item}]`
    })
  } catch (error) {
    console.error('error', error)
    Toast.fire({
      icon: 'error',
      title: '刪除紀錄失敗！'
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
