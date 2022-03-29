<script setup lang="ts">
import { inject } from 'vue'
import Swal from 'sweetalert2'
import { Toast, ConfirmBox } from '@/utils/swal'
import recordAPI from '@/apis/record'
import { pushMsgToBoth } from '@/utils/lineBotMsg'
import { Record, RecordInput } from '@/models'
import { useStore } from '@/store/index'
const store = useStore()

// props
const props = defineProps<{
  record: Record
}>()

// inject
const refetchRecords = inject<() => {}>('refetchRecords')!

const btnClick = async () => {
  try {
    const record = props.record
    const { value: formValues } = await ConfirmBox.fire({
      title: '資料編輯',
      html: `
      <div class="d-flex mb-2">
        <div class="col-auto me-3">
          <label for="swal-item" class="col-form-label">項目</label>
        </div>
        <div class="col-auto">
          <input value="${record.item}" type="text" id="swal-item" class="form-control"/>
        </div>
      </div>
      <div class="d-flex mb-2">
        <div class="col-auto me-3">
          <label for="swal-merchant" class="col-form-label">商家</label>
        </div>
        <div class="col-auto">
          <input value="${record.merchant}" type="text" id="swal-merchant" class="form-control" >
        </div>
      </div>
      <div class="d-flex mb-2">
        <div class="col-auto me-3">
          <label for="swal-amount" class="col-form-label">金額</label>
        </div>
        <div class="col-auto">
          <input value="${record.amount}" type="number" id="swal-amount" class="form-control" >
        </div>
      </div>
      <div class="d-flex mb-2">
        <div class="col-auto me-3">
          <label for="swal-date" class="col-form-label">日期</label>
        </div>
        <div class="col-auto">
          <input value="${new Date(record.date)
            .toISOString()
            .substring(0, 10)}" type="date" id="swal-date" class="form-control" >
        </div>
      </div>
      `,
      preConfirm: () => {
        const item = (document.getElementById('swal-item') as HTMLInputElement).value
        const merchant = (document.getElementById('swal-merchant') as HTMLInputElement).value
        const amount = (document.getElementById('swal-amount') as HTMLInputElement).value
        const date = new Date((document.getElementById('swal-date') as HTMLInputElement).value)
        if (!item || !merchant || !amount || !date) {
          Swal.showValidationMessage('所有資料都是必填！若編輯者為空，請登入~')
        }
        return {
          id: record.id as number,
          input: {
            item,
            merchant,
            amount,
            date,
            UserId: store.currentUser?.id
          } as RecordInput
        }
      }
    })
    if (formValues) {
      editRecord(formValues)
    }
  } catch (error) {
    console.error('error', error)
  }
}

const editRecord = async function (formValues: { id: number; input: RecordInput }) {
  try {
    await recordAPI.edit(formValues.id, formValues.input)
    refetchRecords()
    Toast.fire({
      icon: 'success',
      title: '成功編輯資料！'
    })
    // lineBot push
    pushMsgToBoth(
      `${store.nickName}${store.icon}編輯了一筆紀錄 →\n${formValues.input.merchant}-${formValues.input.item} $${formValues.input.amount}`
    )
  } catch (error) {
    console.error('error', error)
    Toast.fire({
      icon: 'error',
      title: '編輯資料失敗！'
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
