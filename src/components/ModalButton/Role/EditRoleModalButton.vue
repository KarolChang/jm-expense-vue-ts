<script setup lang="ts">
import { inject } from 'vue'
import Swal from 'sweetalert2'
import { Toast, ConfirmBox } from '@/utils/swal'
import userAPI from '@/apis/user'
import { Role, RoleInput } from '@/models'

// props
const props = defineProps<{
  role: Role
}>()

// inject
const refetchRoles = inject<() => {}>('refetchRoles')!

const btnClick = async () => {
  try {
    const record = props.role
    const { value: formValues } = await ConfirmBox.fire({
      title: '角色編輯',
      html: `
      <div class="d-flex mb-2">
        <div class="col-auto me-3">
          <label for="swal-name" class="col-form-label">中文名稱</label>
        </div>
        <div class="col-auto">
          <input value="${record.name}" type="text" id="swal-name" class="form-control"/>
        </div>
      </div>
      <div class="d-flex mb-2">
        <div class="col-auto me-3">
          <label for="swal-nameEn" class="col-form-label">英文名稱</label>
        </div>
        <div class="col-auto">
          <input value="${record.name_en}" type="text" id="swal-nameEn" class="form-control" >
        </div>
      </div>
      `,
      preConfirm: () => {
        const name = (document.getElementById('swal-name') as HTMLInputElement).value
        const name_en = (document.getElementById('swal-nameEn') as HTMLInputElement).value
        if (!name || !name_en) {
          Swal.showValidationMessage('所有資料都是必填！')
        }
        return {
          id: record.id as number,
          input: {
            name,
            name_en
          } as RoleInput
        }
      }
    })
    if (formValues) {
      editRole(formValues)
    }
  } catch (error) {
    console.error('error', error)
  }
}

const editRole = async function (formValues: { id: number; input: RoleInput }) {
  try {
    await userAPI.role.edit(formValues.id, formValues.input)
    refetchRoles()
    Toast.fire({
      icon: 'success',
      title: '成功編輯角色！'
    })
  } catch (error) {
    console.error('error', error)
    Toast.fire({
      icon: 'error',
      title: '編輯角色失敗！'
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
