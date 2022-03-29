<script setup lang="ts">
import { inject } from 'vue'
import { Toast, ConfirmBox } from '@/utils/swal'
import expenseAPI from '@/apis/expense'
import { Category } from '@/models'

// props
const props = defineProps<{
  category: Category
}>()

// inject
const refetchCategories = inject<() => {}>('refetchCategories')!

// methods
const btnClick = async () => {
  try {
    const { isConfirmed } = await ConfirmBox.fire({
      title: `確定刪除[${props.category.name}]類別嘛？`,
      showCancelButton: true
    })
    if (isConfirmed) {
      deleteCategory(props.category.id)
    }
  } catch (error) {
    console.error('error', error)
  }
}

const deleteCategory = async function (id: number) {
  try {
    const { data } = await expenseAPI.category.delete(id)
    if (data.status !== 'success') {
      throw new Error(`[SERVER ERROR] ${data.message}`)
    }
    refetchCategories()
    Toast.fire({
      icon: 'success',
      title: `成功刪除類別[${data.data.name}]`
    })
  } catch (error) {
    console.error('error', error)
    Toast.fire({
      icon: 'error',
      title: '刪除類別失敗！'
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
