<script setup lang="ts">
import { inject } from 'vue'
import { Swal, Toast, ConfirmBox } from '@/utils/swal'
import expenseAPI from '@/apis/expense'
import { CategoryInput } from '@/models'

// inject
const refetchCategories = inject<() => {}>('refetchCategories')!

// methods
const btnClick = async () => {
  try {
    const { value: formValues } = await ConfirmBox.fire({
      title: '新增類別',
      html: `
        <div class="d-flex mb-2">
          <div class="col-auto me-3">
            <label for="swal-name" class="col-form-label">種類</label>
          </div>
          <div class="col-auto my-auto">
            <input class="form-check-input" type="radio" name="type" id="swal-expense" value="支出" checked>
            <label class="form-check-label me-3" for="swal-expense">支出</label>
            <input class="form-check-input" type="radio" name="type" id="swal-income" value="收入">
            <label class="form-check-label" for="swal-income">收入</label>
          </div>
        </div>
        <div class="d-flex mb-2">
          <div class="col-auto me-3">
            <label for="swal-name" class="col-form-label">名稱</label>
          </div>
          <div class="col-auto">
            <input type="text" id="swal-name" class="form-control"/>
          </div>
        </div>
        <div class="d-flex mb-2">
          <div class="col-auto me-3">
            <label for="swal-icon" class="col-form-label">Icon</label>
          </div>
          <div class="col-auto">
            <input type="text" id="swal-icon" class="form-control" >
          </div>
          <a class="ms-4 mt-1" href="https://fontawesome.com/v5.15/icons?d=gallery&p=2" target="_blank">
            <span class="badge bg-info text-dark">找Icon</span>
          </a>
        </div>
        <div class="d-flex mb-2">
          <div class="col-auto me-3">
            <label for="swal-photoUrl" class="col-form-label">PhotoUrl</label>
          </div>
          <div class="col-auto">
            <input type="text" id="swal-photoUrl" class="form-control" >
          </div>
        </div>
      `,
      preConfirm: () => {
        const type = (document.getElementById('swal-expense') as HTMLInputElement).checked
        const name = (document.getElementById('swal-name') as HTMLInputElement).value
        const icon = (document.getElementById('swal-icon') as HTMLInputElement).value
        const photoUrl = (document.getElementById('swal-photoUrl') as HTMLInputElement).value
        if (name) {
          if (!icon && !photoUrl) {
            Swal.showValidationMessage('Icon和PhotoUrl欄位必須擇一填寫！')
          }
        } else {
          Swal.showValidationMessage('名稱欄位必填！')
        }
        return {
          input: {
            type: type ? '支出' : '收入',
            name,
            icon: icon === '' ? null : icon,
            photoUrl: photoUrl === '' ? null : photoUrl
          } as CategoryInput
        }
      }
    })
    if (formValues) {
      createExpense(formValues!)
    }
  } catch (error) {
    console.error('error', error)
  }
}

const createExpense = async function (formValues: { input: CategoryInput }) {
  try {
    console.log('formValues.input', formValues.input)
    const { data } = await expenseAPI.category.create(formValues.input)
    refetchCategories()
    Toast.fire({
      icon: 'success',
      title: `成功建立類別[${data.data.name}]`
    })
  } catch (error) {
    console.error('error', error)
    Toast.fire({
      icon: 'error',
      title: '新增類別失敗！'
    })
  }
}
</script>
<template>
  <span class="badge bg-success" @click="btnClick">+</span>
</template>
<style scoped>
span:hover {
  cursor: pointer;
  color: darkorange;
}
</style>
