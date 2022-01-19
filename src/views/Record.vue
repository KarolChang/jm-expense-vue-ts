<script setup lang="ts">
import { ref } from 'vue'
import recordAPI from '../apis/record'
import { Record, RecordInput } from '../models/Record'
import Swal from 'sweetalert2'
import { Toast, ConfirmBox } from '../utils/swal'
import { showWeekDay } from '../utils/helper'
import Spinner from '../components/Spinner.vue'
import CreateRecordModalButton from '../components/modalButton/CreateRecordModalButton.vue'
import { useStore } from '../store/index'
const store = useStore()

// data
const isLoading = ref<boolean>(true)
const records = ref<Record[]>([])
const isCloseStatus = ref<boolean>(false)
const closeRecords = ref<number[]>([])
const closeRecordsAmount = ref<number>(0)

// methods
const fetchRecords = async function () {
  try {
    const { data } = await recordAPI.getAll()
    records.value = data.filter((item: Record) => item.isClosed === false)
    isLoading.value = false
  } catch (error) {
    console.error('error', error)
  }
}

const editBtnClick = async function (id: number) {
  try {
    const { data } = await recordAPI.getOne(id)
    const { value: formValues } = await ConfirmBox.fire({
      title: '資料編輯',
      html: `
      <div class="d-flex mb-2">
        <div class="col-auto me-3">
          <label for="swal-item" class="col-form-label">項目</label>
        </div>
        <div class="col-auto">
          <input value="${data.item}" type="text" id="swal-item" class="form-control"/>
        </div>
      </div>
      <div class="d-flex mb-2">
        <div class="col-auto me-3">
          <label for="swal-merchant" class="col-form-label">商家</label>
        </div>
        <div class="col-auto">
          <input value="${data.merchant}" type="text" id="swal-merchant" class="form-control" >
        </div>
      </div>
      <div class="d-flex mb-2">
        <div class="col-auto me-3">
          <label for="swal-amount" class="col-form-label">金額</label>
        </div>
        <div class="col-auto">
          <input value="${data.amount}" type="number" id="swal-amount" class="form-control" >
        </div>
      </div>
      <div class="d-flex mb-2">
        <div class="col-auto me-3">
          <label for="swal-date" class="col-form-label">日期</label>
        </div>
        <div class="col-auto">
          <input value="${new Date(data.date)
            .toISOString()
            .substring(0, 10)}" type="date" id="swal-date" class="form-control" >
        </div>
      </div>
      <div class="d-flex mb-2">
        <div class="col-auto me-3">
          <label for="swal-editor" class="col-form-label">編輯者</label>
        </div>
        <div class="col-auto">
          <select id="swal-editor" class="form-select">
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
        const editor = (document.getElementById('swal-editor') as HTMLInputElement).value
        if (!item || !merchant || !amount || !date || !editor) {
          Swal.showValidationMessage('所有資料都是必填！若編輯者為空，請登入~')
        }
        return {
          id: data.id as number,
          input: {
            item,
            merchant,
            amount,
            date,
            editor
          } as RecordInput
        }
      }
    })
    if (formValues?.input) {
      editRecord(formValues)
    }
  } catch (error) {
    console.error('error', error)
  }
}

const editRecord = async function (formValues: { id: number; input: RecordInput }) {
  try {
    await recordAPI.edit(formValues.id, formValues.input)
    fetchRecords()
    Toast.fire({
      icon: 'success',
      title: '成功編輯資料！'
    })
    // lineBot push
    const input = {
      to: [process.env.VUE_APP_KAROL_USERID, process.env.VUE_APP_JIANMIAU_USERID],
      messages: {
        type: 'text',
        text: `${store.currentUser + store.icon}編輯了一筆紀錄 →\n${formValues.input.merchant}-${
          formValues.input.item
        } $${formValues.input.amount}`
      }
    }
    await recordAPI.pushLineMsg(input)
  } catch (error) {
    console.error('error', error)
    Toast.fire({
      icon: 'error',
      title: '編輯資料失敗！'
    })
  }
}

const closeBtnClick = () => {
  if (!store.currentUser) {
    Swal.fire('請先登入才能結算！', '', 'warning')
    return
  }
  isCloseStatus.value = true
  const recordIds = []
  let total = 0
  for (let record of records.value) {
    recordIds.push(record.id)
    total += record.amount
  }
  closeRecords.value = recordIds
  closeRecordsAmount.value = total
}

const checkboxClick = (id: number, amount: number) => {
  if (isCloseStatus.value) {
    const index = closeRecords.value?.findIndex((recordId) => recordId === id)
    if (index !== undefined) {
      if (index !== -1) {
        closeRecords.value?.splice(index, 1)
        closeRecordsAmount.value -= amount
      } else {
        closeRecords.value?.push(id)
        closeRecordsAmount.value += amount
      }
    }
  }
}

const cancelBtnClick = () => {
  isCloseStatus.value = false
  closeRecords.value = []
  closeRecordsAmount.value = 0
}

const toCloseBtnClick = async () => {
  const { isConfirmed } = await ConfirmBox.fire({
    icon: 'info',
    title: '確定結算資料？',
    text: `結算金額為 $${closeRecordsAmount.value} [結算者: ${store.currentUser}]`
  })
  if (isConfirmed) {
    closeRecord(closeRecordsAmount.value)
  }
}

const closeRecord = async (amount: number) => {
  try {
    if (store.currentUser) {
      await recordAPI.close({
        records: closeRecords.value.toString(),
        totalAmount: amount,
        recorder: store.currentUser
      })
      isCloseStatus.value = false
      fetchRecords()
      Toast.fire({
        icon: 'success',
        title: '成功結算資料！'
      })
      // lineBot push
      const input = {
        to: [process.env.VUE_APP_KAROL_USERID, process.env.VUE_APP_JIANMIAU_USERID],
        messages: {
          type: 'text',
          text: `${store.currentUser + store.icon}結算紀錄 → 總金額 $${amount}`
        }
      }
      await recordAPI.pushLineMsg(input)
    }
  } catch (error) {
    console.error('error', error)
    Toast.fire({
      icon: 'error',
      title: '結算資料失敗！'
    })
  }
}

// created
fetchRecords()
</script>
<template>
  <div v-if="!isLoading">
    <div class="d-flex mb-3" style="width: 100vw">
      <template v-if="!isCloseStatus">
        <CreateRecordModalButton view="Record" :refetch="fetchRecords" class="me-3" />
        <button type="button" class="btn btn-danger" @click="closeBtnClick">開始結算</button>
      </template>

      <template v-else>
        <div class="btn btn-info fw-bold">結算金額 ${{ closeRecordsAmount }}</div>
        <button type="button" class="btn btn-secondary ms-3" @click="cancelBtnClick">取消結算</button>
        <button type="button" class="btn btn-success ms-3" @click="toCloseBtnClick">確定結算</button>
      </template>
    </div>
    <table class="table table-striped table-info table-hover" v-if="records.length">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">項目</th>
          <th scope="col">商家</th>
          <th scope="col">金額</th>
          <th scope="col">日期</th>
          <th scope="col" id="column-item">首次記錄者</th>
          <th scope="col" id="column-item">首次記錄時間</th>
          <th scope="col" id="column-item">更新時間</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(record, index) in records"
          :key="index"
          :class="{ 'table-warning': closeRecords?.includes(record.id) }"
          @click="checkboxClick(record.id, record.amount)"
        >
          <td>
            <input
              v-if="isCloseStatus"
              class="form-check-input"
              type="checkbox"
              :checked="closeRecords?.includes(record.id)"
            />
            <i v-else class="fas fa-edit" @click="editBtnClick(record.id)"></i>
          </td>
          <td>
            {{ record.item }}
          </td>
          <td>
            {{ record.merchant }}
          </td>
          <td>
            {{ record.amount }}
          </td>
          <td>
            {{ new Date(record.date).toLocaleDateString() + ` (${showWeekDay(record.date)})` }}
          </td>
          <td id="column-item">
            {{ record.recorder }}
          </td>
          <td id="column-item">{{ new Date(record.createdAt).toLocaleString() }}</td>
          <td id="column-item">{{ new Date(record.updatedAt).toLocaleString() }}</td>
        </tr>
      </tbody>
    </table>
    <img
      v-else
      class="img-fluid"
      src="https://memeprod.sgp1.digitaloceanspaces.com/user-wtf/1581909112681.jpg"
      alt=""
    />
  </div>
  <Spinner v-else />
</template>

<style scoped>
th,
td {
  white-space: nowrap;
}

span {
  margin-top: 0.1em;
}

i[class~='fa-edit']:hover {
  color: rgb(30, 197, 57);
  cursor: pointer;
}

@media screen and (max-width: 400px) {
  #column-item {
    display: none;
  }
}
</style>
