<script setup lang="ts">
import { Toast, ConfirmBox } from '../../utils/swal'
import expenseAPI from '../../apis/expense'
import { Category } from '../../models/Category'

// props
const props = defineProps<{
  refetch: () => {}
  category: Category
}>()

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
    console.log('data', data)
    Toast.fire({
      icon: 'success',
      title: `成功刪除類別[${data.deletedCategory.name}]`
    })
    props.refetch()
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
