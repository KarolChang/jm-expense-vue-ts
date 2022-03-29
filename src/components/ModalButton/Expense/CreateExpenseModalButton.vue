<script setup lang="ts">
import { inject, computed, Ref } from 'vue'
import Swal from 'sweetalert2'
import { Toast, ConfirmBox } from '@/utils/swal'
import expenseAPI from '@/apis/expense'
import { ExpenseInput, Category } from '@/models'
import { useStore } from '@/store/index'
const store = useStore()

// inject
const refetchExpenses = inject<() => {}>('refetchExpenses')!
const categories = inject<Ref<Category[]>>('categories')!

// computed
const selectionsHtml = computed(() => {
  let html = `<select class="form-select" id="swal-categoryId">`
  categories.value.forEach((category: Category) => (html += `<option value="${category.id}">${category.name}</option>`))
  html += `</select>`
  return html
})

// methods
const btnClick = async () => {
  try {
    const { value: formValues } = await ConfirmBox.fire({
      title: '新增記帳',
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
          <input type="text" id="swal-item" class="form-control"/>
        </div>
      </div>
      <div class="d-flex mb-2">
        <div class="col-auto me-3">
          <label for="swal-amount" class="col-form-label">金額</label>
        </div>
        <div class="col-auto">
          <input type="number" id="swal-amount" class="form-control" >
        </div>
      </div>
      <div class="d-flex mb-2">
        <div class="col-auto me-3">
          <label for="swal-note" class="col-form-label">備註</label>
        </div>
        <div class="col-auto">
          <input type="text" id="swal-note" class="form-control" >
        </div>
      </div>
      <div class="d-flex mb-2">
        <div class="col-auto me-3">
          <label for="swal-date" class="col-form-label">日期</label>
        </div>
        <div class="col-auto">
          <input type="date" id="swal-date" class="form-control" value="${new Date().toJSON().substring(0, 10)}">
        </div>
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
        return {
          input: {
            UserId: store.currentUser?.id,
            CategoryId: Number(categoryId),
            item,
            amount,
            note,
            date
          } as ExpenseInput
        }
      }
    })
    if (formValues) {
      createExpense(formValues)
    }
  } catch (error) {
    console.error('error', error)
  }
}

const createExpense = async function (formValues: { input: ExpenseInput }) {
  try {
    await expenseAPI.expense.create(formValues.input)
    refetchExpenses()
    Toast.fire({
      icon: 'success',
      title: '成功建立記帳！'
    })
  } catch (error) {
    console.error('error', error)
    Toast.fire({
      icon: 'error',
      title: '新增記帳失敗！'
    })
  }
}

// created
// fetchCategories()
</script>
<template>
  <button type="button" class="btn btn-primary me-3" @click="btnClick">新增記帳</button>
</template>
