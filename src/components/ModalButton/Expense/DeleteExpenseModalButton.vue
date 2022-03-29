<script setup lang="ts">
import { inject } from 'vue'
import { Toast, ConfirmBox } from '@/utils/swal'
import expenseAPI from '@/apis/expense'
import { Expense } from '@/models'

// props
const props = defineProps<{
  expense: Expense
}>()

// inject
const refetchExpenses = inject<() => {}>('refetchExpenses')!

// methods
const btnClick = async () => {
  try {
    const { isConfirmed } = await ConfirmBox.fire({
      title: `確定刪除記帳[${props.expense.item}]嘛？`,
      showCancelButton: true
    })
    if (isConfirmed) {
      deleteExpense(props.expense.id)
    }
  } catch (error) {
    console.error('error', error)
  }
}

const deleteExpense = async function (id: number) {
  try {
    const { data } = await expenseAPI.expense.delete(id)
    if (data.status !== 'success') {
      throw new Error(`[SERVER ERROR] ${data.message}`)
    }
    refetchExpenses()
    Toast.fire({
      icon: 'success',
      title: `成功刪除記帳[${data.data.item}]`
    })
  } catch (error) {
    console.error('error', error)
    Toast.fire({
      icon: 'error',
      title: '刪除記帳失敗！'
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
