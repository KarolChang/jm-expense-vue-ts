<script setup lang="ts">
import { inject } from 'vue'
import Swal from 'sweetalert2'
import { Toast, ConfirmBox } from '@/utils/swal'
import expenseAPI from '@/apis/expense'
import { Category, CategoryInput } from '@/models'

// props
const props = defineProps<{
  category: Category
}>()

// inject
const refetchCategories = inject<() => {}>('refetchCategories')!

// methods
const btnClick = async () => {
  try {
    const category = props.category
    const { value: formValues } = await ConfirmBox.fire({
      title: '編輯類別',
      html: `
        <div class="d-flex mb-2">
          <div class="col-auto me-3">
            <label for="swal-name" class="col-form-label">種類</label>
          </div>
          <div class="col-auto my-auto">
            <input class="form-check-input" type="radio" name="type" id="swal-expense" value="支出" ${
              category.type === '支出' ? 'checked' : ''
            }>
            <label class="form-check-label me-3" for="swal-expense">支出</label>
            <input class="form-check-input" type="radio" name="type" id="swal-income" value="收入" ${
              category.type === '收入' ? 'checked' : ''
            }>
            <label class="form-check-label" for="swal-income">收入</label>
          </div>
        </div>
        <div class="d-flex mb-2">
          <div class="col-auto me-3">
            <label for="swal-name" class="col-form-label">名稱</label>
          </div>
          <div class="col-auto">
            <input value="${category.name}" type="text" id="swal-name" class="form-control"/>
          </div>
        </div>
        <div class="d-flex mb-2">
          <div class="col-auto me-3">
            <label for="swal-icon" class="col-form-label">Icon</label>
          </div>
          <div class="col-auto">
            <input value="${
              category.icon === null ? '' : category.icon
            }" type="text" id="swal-icon" class="form-control" >
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
            <input value="${
              category.photoUrl === null ? '' : category.photoUrl
            }" type="text" id="swal-photoUrl" class="form-control" >
          </div>
          <a class="ms-4 mt-1" href="${
            category.photoUrl === null ? 'https://www.google.com/' : category.photoUrl
          }" target="_blank">
            <span class="badge bg-success">圖片連結</span>
          </a>
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
      editCategory(formValues)
    }
  } catch (error) {
    console.error('error', error)
  }
}

const editCategory = async function (formValues: { input: CategoryInput }) {
  try {
    const { data } = await expenseAPI.category.edit(props.category.id, formValues.input)
    if (data.status !== 'success') {
      throw new Error(`[SERVER ERROR] ${data.message}`)
    }
    refetchCategories()
    Toast.fire({
      icon: 'success',
      title: `成功編輯類別[${data.data.name}]`
    })
  } catch (error) {
    console.error('error', error)
    Toast.fire({
      icon: 'error',
      title: '編輯類別失敗！'
    })
  }
}
</script>
<template>
  <i class="fas fa-edit ms-2" @click="btnClick"></i>
</template>
<style scoped>
i:hover {
  color: rgb(30, 197, 57);
  cursor: pointer;
}
</style>
