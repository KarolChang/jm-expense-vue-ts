<script setup lang="ts">
import { inject } from 'vue'
import { Swal, Toast, ConfirmBox } from '@/utils/swal'
import userAPI from '@/apis/user'
import { RoleInput } from '@/models'

// inject
const refetchRoles = inject<() => {}>('refetchRoles')!

// methods
const btnClick = async () => {
  try {
    const { value: formValues } = await ConfirmBox.fire({
      title: '新增角色',
      html: `
      <div class="d-flex mb-2">
        <div class="col-auto me-3">
          <label for="swal-name" class="col-form-label">中文名稱</label>
        </div>
        <div class="col-auto">
          <input type="text" id="swal-name" class="form-control"/>
        </div>
      </div>
      <div class="d-flex mb-2">
        <div class="col-auto me-3">
          <label for="swal-nameEn" class="col-form-label">英文名稱</label>
        </div>
        <div class="col-auto">
          <input type="text" id="swal-nameEn" class="form-control" >
        </div>
      </div>
      `,
      preConfirm: () => {
        const name = (document.getElementById('swal-name') as HTMLInputElement).value
        const name_en = (document.getElementById('swal-nameEn') as HTMLInputElement).value
        if (!name || !name_en) {
          Swal.showValidationMessage('所有欄位都是必填！')
        }
        return {
          input: {
            name,
            name_en
          } as RoleInput
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

const createExpense = async function (formValues: { input: RoleInput }) {
  try {
    await userAPI.role.create(formValues.input)
    refetchRoles()
    Toast.fire({
      icon: 'success',
      title: '成功建立角色！'
    })
  } catch (error) {
    console.error('error', error)
    Toast.fire({
      icon: 'error',
      title: '新增角色失敗！'
    })
  }
}
</script>
<template>
  <button type="button" class="btn btn-primary" @click="btnClick">新增角色</button>
</template>
