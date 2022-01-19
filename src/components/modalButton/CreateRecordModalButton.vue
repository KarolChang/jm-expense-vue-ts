<script setup lang="ts">
import Swal from 'sweetalert2'
import { Toast, ConfirmBox } from '../../utils/swal'
import recordAPI from '../../apis/record'
import { RecordInput } from '../../models/Record'
import { useStore } from '../../store/index'
const store = useStore()
import { useRouter } from 'vue-router'
const router = useRouter()

// props
const props = defineProps<{
  view: 'Home' | 'Record'
  refetch?: () => {}
}>()

// methods
const btnClick = async () => {
  try {
    const { value: formValues } = await ConfirmBox.fire({
      title: '新增資料',
      html: `
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
            <label for="swal-merchant" class="col-form-label">商家</label>
          </div>
          <div class="col-auto">
            <input type="text" id="swal-merchant" class="form-control" >
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
            <label for="swal-date" class="col-form-label">日期</label>
          </div>
          <div class="col-auto">
            <input type="date" id="swal-date" class="form-control" value="${new Date().toJSON().substring(0, 10)}">
          </div>
        </div>
        <div class="d-flex mb-2">
          <div class="col-auto me-3">
            <label for="swal-recorder" class="col-form-label">紀錄者</label>
          </div>
          <div class="col-auto">
            <select id="swal-recorder" class="form-select">
              <option selected>${store.currentUser}</option>
            </select>
          </div>
        </div>
      `,
      preConfirm: () => {
        const item = (document.getElementById('swal-item') as HTMLInputElement).value
        const merchant = (document.getElementById('swal-merchant') as HTMLInputElement).value
        const amount = (document.getElementById('swal-amount') as HTMLInputElement).value
        const date = new Date((document.getElementById('swal-date') as HTMLInputElement).value)
        const recorder = (document.getElementById('swal-recorder') as HTMLInputElement).value
        if (!item || !merchant || !amount || !date || !recorder) {
          Swal.showValidationMessage('所有資料都是必填！若紀錄者為空，請登入~')
        }
        return {
          input: {
            item,
            merchant,
            amount,
            date,
            recorder
          } as RecordInput
        }
      }
    })
    if (formValues) {
      createRecord(formValues)
    }
  } catch (error) {
    console.error('error', error)
  }
}

const createRecord = async function (formValues: { input: RecordInput }) {
  try {
    await recordAPI.create(formValues.input)
    Toast.fire({
      icon: 'success',
      title: '成功建立資料！'
    })
    if (props.view === 'Record') {
      props.refetch!()
    } else {
      router.push({ name: 'Record' })
    }
    lineBotPush(formValues.input)
  } catch (error) {
    console.error('error', error)
    Toast.fire({
      icon: 'error',
      title: '新增資料失敗！'
    })
  }
}

const lineBotPush = async (recordInput: RecordInput) => {
  try {
    const input = {
      to: [process.env.VUE_APP_KAROL_USERID, process.env.VUE_APP_JIANMIAU_USERID],
      messages: {
        type: 'text',
        text: `${store.currentUser + store.icon}新增了一筆紀錄 →\n${recordInput.merchant}-${recordInput.item} $${
          recordInput.amount
        }`
      }
    }
    await recordAPI.pushLineMsg(input)
  } catch (error) {
    console.error('error', error)
  }
}
</script>
<template>
  <div>
    <button type="button" class="btn btn-primary" @click="btnClick">新增資料</button>
  </div>
</template>
