<script setup lang="ts">
import { computed, inject, Ref } from 'vue'
import { Swal, Toast, ConfirmBox } from '@/utils/swal'
import expenseAPI from '@/apis/expense'
import { Expense, ExpenseInput, Category } from '@/models'
import { useStore } from '@/store/index'
const store = useStore()

// props
const props = defineProps<{
  expense: Expense
}>()

// inject
const refetchExpenses = inject<() => {}>('refetchExpenses')!
const categories = inject<Ref<Category[]>>('categories')!

// computed
const selectionsHtml = computed(() => {
  let html = `<select class="form-select" id="swal-categoryId">`
  categories.value.forEach((category: Category) => {
    if (category.id === props.expense.Category.id) {
      html += `<option selected value="${category.id}">${category.name}</option>`
    } else {
      html += `<option value="${category.id}">${category.name}</option>`
    }
  })
  html += `</select>`
  return html
})

// methods
const btnClick = async () => {
  try {
    const expense = props.expense
    const { value: formValues } = await ConfirmBox.fire({
      title: '編輯記帳',
      html: `
        <div class="d-flex mb-2">
          <div class="col-auto me-3">
            <label for="swal-categoryId" class="col-form-label">類別</label>
          </div>
          <div class="col-auto">
            ${selectionsHtml.value}
          </div>
        </div>
        <div class="d-flex mb-2">
          <div class="col-auto me-3">
            <label for="swal-item" class="col-form-label">項目</label>
          </div>
          <div class="col-auto">
            <input value="${expense.item}" type="text" id="swal-item" class="form-control"/>
          </div>
        </div>
        <div class="d-flex mb-2">
          <div class="col-auto me-3">
            <label for="swal-amount" class="col-form-label">金額</label>
          </div>
          <div class="col-auto">
            <input value="${expense.amount}" type="number" id="swal-amount" class="form-control" >
          </div>
        </div>
        <div class="d-flex mb-2">
          <div class="col-auto me-3">
            <label for="swal-note" class="col-form-label">備註</label>
          </div>
          <div class="col-auto">
            <input value="${expense.note}" type="text" id="swal-note" class="form-control" >
          </div>
        </div>
        <div class="d-flex mb-2">
          <div class="col-auto me-3">
            <label for="swal-date" class="col-form-label">日期</label>
          </div>
          <div class="col-auto">
            <input value="${new Date(expense.date)
              .toJSON()
              .substring(0, 10)}" type="date" id="swal-date" class="form-control">
          </div>
      `,
      preConfirm: () => {
        const categoryId = (document.getElementById('swal-categoryId') as HTMLInputElement).value
        const item = (document.getElementById('swal-item') as HTMLInputElement).value
        const amount = (document.getElementById('swal-amount') as HTMLInputElement).value
        const date = new Date((document.getElementById('swal-date') as HTMLInputElement).value)
        const note = (document.getElementById('swal-note') as HTMLInputElement).value
        if (!item || !amount || !date) {
          Swal.showValidationMessage('除了[備註]，所有資料都是必填！')
        }
        if (store.currentUser) {
          return {
            input: {
              UserId: store.currentUser.id,
              CategoryId: Number(categoryId),
              item,
              amount,
              note,
              date
            } as ExpenseInput
          }
        } else {
          Toast.fire({
            icon: 'error',
            title: '無法取得使用者ID'
          })
        }
      }
    })
    console.log('formValues', formValues)
    if (formValues?.input) {
      editExpense(formValues)
    }
  } catch (error) {
    console.error('error', error)
  }
}

const editExpense = async function (formValues: { input: ExpenseInput }) {
  try {
    const { data } = await expenseAPI.expense.edit(props.expense.id, formValues.input)
    if (data.status !== 'success') {
      throw new Error(`[SERVER ERROR] ${data.message}`)
    }
    refetchExpenses()
    Toast.fire({
      icon: 'success',
      title: `成功編輯記帳[${data.data.item}]`
    })
  } catch (error) {
    console.error('error', error)
    Toast.fire({
      icon: 'error',
      title: '編輯記帳失敗！'
    })
  }
}
</script>
<template>
  <i class="fas fa-edit" @click="btnClick"></i>
</template>
<style scoped>
i:hover {
  color: rgb(30, 197, 57);
  cursor: pointer;
}
</style>
