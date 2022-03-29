<script setup lang="ts">
import { inject, computed } from 'vue'
import Swal from 'sweetalert2'
import { Toast, ConfirmBox } from '@/utils/swal'
import userAPI from '@/apis/user'
import { PermissionInput, ActionTypePermission } from '@/models'
const actions: ActionTypePermission[] = ['查看', '新增', '編輯', '刪除', '停用', '操作']

// inject
const refetchPermissions = inject<() => {}>('refetchPermissions')!

// computed
const selectionsHtml = computed(() => {
  let html = `<select class="form-select" id="swal-action">`
  actions.forEach((action: ActionTypePermission) => (html += `<option value="${action}">${action}</option>`))
  html += `</select>`
  return html
})

// methods
const btnClick = async () => {
  try {
    const { value: formValues } = await ConfirmBox.fire({
      title: '新增權限',
      html: `
      <div class="d-flex mb-2">
        <div class="col-auto me-3">
          <label for="swal-action" class="col-form-label">ACTION</label>
        </div>
        <div class="col-auto">
          ${selectionsHtml.value}
        </div>
      </div>
      <div class="d-flex mb-2">
        <div class="col-auto me-3">
          <label for="swal-item" class="col-form-label">ITEM</label>
        </div>
        <div class="col-auto">
          <input type="text" id="swal-item" class="form-control" >
        </div>
      </div>
      <div class="d-flex mb-2">
        <div class="col-auto me-3">
          <label for="swal-description" class="col-form-label">DESCRIPTION</label>
        </div>
        <div class="col-auto">
          <input type="text" id="swal-description" class="form-control" >
        </div>
      </div>
      `,
      preConfirm: () => {
        const action = (document.getElementById('swal-action') as HTMLInputElement).value
        const item = (document.getElementById('swal-item') as HTMLInputElement).value
        const description = (document.getElementById('swal-description') as HTMLInputElement).value
        if (!action || !item) {
          Swal.showValidationMessage('除了[DESCRIPTION]，所有欄位都是必填！')
        }
        return {
          input: {
            action,
            item,
            description
          } as PermissionInput
        }
      }
    })
    if (formValues) {
      createPermission(formValues)
    }
  } catch (error) {
    console.error('error', error)
  }
}

const createPermission = async function (formValues: { input: PermissionInput }) {
  try {
    await userAPI.permission.create(formValues.input)
    refetchPermissions()
    Toast.fire({
      icon: 'success',
      title: '成功建立權限！'
    })
  } catch (error) {
    console.error('error', error)
    Toast.fire({
      icon: 'error',
      title: '新增權限失敗！'
    })
  }
}
</script>
<template>
  <button type="button" class="btn btn-primary" @click="btnClick">新增權限</button>
</template>
