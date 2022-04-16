<script setup lang="ts">
import { inject, computed } from 'vue'
import { Swal, Toast, ConfirmBox } from '@/utils/swal'
import userAPI from '@/apis/user'
import { Permission, PermissionInput, ActionTypePermission } from '@/models'
const actions: ActionTypePermission[] = ['查看', '新增', '編輯', '刪除', '停用', '操作']

// props
const props = defineProps<{
  permission: Permission
}>()

// inject
const refetchPermissions = inject<() => {}>('refetchPermissions')!

// computed
const selectionsHtml = computed(() => {
  let html = `<select class="form-select" id="swal-action">`
  actions.forEach((action: ActionTypePermission) => {
    if (action === props.permission.action) {
      html += `<option selected value="${action}">${action}</option>`
    } else {
      html += `<option value="${action}">${action}</option>`
    }
  })
  html += `</select>`
  return html
})

// methods
const btnClick = async () => {
  try {
    const permission = props.permission
    const { value: formValues } = await ConfirmBox.fire({
      title: '編輯權限',
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
            <input value="${permission.item}" type="text" id="swal-item" class="form-control"/>
          </div>
        </div>
        <div class="d-flex mb-2">
          <div class="col-auto me-3">
            <label for="swal-description" class="col-form-label">DESCRIPTION</label>
          </div>
          <div class="col-auto">
            <input value="${
              permission.description === null ? '' : permission.description
            }" type="text" id="swal-description" class="form-control" >
          </div>
        </div>
      `,
      preConfirm: () => {
        const action = (document.getElementById('swal-action') as HTMLInputElement).value
        const item = (document.getElementById('swal-item') as HTMLInputElement).value
        const description = (document.getElementById('swal-description') as HTMLInputElement).value
        if (!action || !item) {
          Swal.showValidationMessage('除了[DESCRIPTION]，所有資料都是必填！')
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
      editPermission(formValues)
    }
  } catch (error) {
    console.error('error', error)
  }
}

const editPermission = async function (formValues: { input: PermissionInput }) {
  try {
    const { data } = await userAPI.permission.edit(props.permission.id, formValues.input)
    if (data.status !== 'success') {
      throw new Error(`[SERVER ERROR] ${data.message}`)
    }
    refetchPermissions()
    Toast.fire({
      icon: 'success',
      title: `成功編輯權限[${data.data.action}-${data.data.item}]`
    })
  } catch (error) {
    console.error('error', error)
    Toast.fire({
      icon: 'error',
      title: '編輯權限失敗！'
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
