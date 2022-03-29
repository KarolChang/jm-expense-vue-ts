<script setup lang="ts">
import { ref, provide } from 'vue'
import recordAPI from '@/apis/record'
import { Record } from '@/models'
import { getDay } from '../utils/dateFormat'
import { useStore } from '../store/index'
import Spinner from '@/components/Spinner.vue'
import EditRecordModalButton from '@/components/ModalButton/Record/EditRecordModalButton.vue'
import RecordButtons from '@/components/RecordButtons.vue'
import DeleteRecordModalButton from '@/components/ModalButton/Record/DeleteRecordModalButton.vue'
const store = useStore()

// data
const isLoading = ref<boolean>(true)
const records = ref<Record[]>([])
const propDataForRecordButtons = ref({
  isCloseStatus: false,
  closeRecords: [] as number[],
  closeRecordsAmount: 0
})

// methods
const fetchRecords = async function () {
  try {
    const { data } = await recordAPI.getAll()
    records.value = data.data.filter((item: Record) => item.isClosed === false)
    isLoading.value = false
  } catch (error) {
    console.error('error', error)
  }
}

const checkboxClick = (id: number, amount: number) => {
  console.log('checkboxClick')
  if (propDataForRecordButtons.value.isCloseStatus) {
    const index = propDataForRecordButtons.value.closeRecords.findIndex((recordId) => recordId === id)
    if (index !== undefined) {
      if (index !== -1) {
        propDataForRecordButtons.value.closeRecords.splice(index, 1)
        propDataForRecordButtons.value.closeRecordsAmount -= amount
      } else {
        propDataForRecordButtons.value.closeRecords.push(id)
        propDataForRecordButtons.value.closeRecordsAmount += amount
      }
    }
  }
}

const handleCloseFunction = (func: string) => {
  if (func === 'cancelBtnClick') {
    propDataForRecordButtons.value.isCloseStatus = false
    propDataForRecordButtons.value.closeRecords = []
    propDataForRecordButtons.value.closeRecordsAmount = 0
  }
  if (func === 'closeBtnClick') {
    propDataForRecordButtons.value.isCloseStatus = true
    const recordIds = []
    let total = 0
    for (let record of records.value) {
      recordIds.push(record.id)
      total += record.amount
    }
    propDataForRecordButtons.value.closeRecords = recordIds
    propDataForRecordButtons.value.closeRecordsAmount = total
  }
  if (func === 'closeRecord') {
    propDataForRecordButtons.value.isCloseStatus = false
  }
}

// created
fetchRecords()

// provide
provide('refetchRecords', fetchRecords)
</script>
<template>
  <div v-if="!isLoading">
    <RecordButtons :propData="propDataForRecordButtons" @closeFunction="handleCloseFunction" />
    <table class="table table-info table-hover" v-if="records.length">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col"></th>
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
          :class="{ 'table-success': propDataForRecordButtons.closeRecords?.includes(record.id) }"
          @click="checkboxClick(record.id, record.amount)"
        >
          <td>
            <input
              v-if="propDataForRecordButtons.isCloseStatus"
              class="form-check-input"
              type="checkbox"
              :checked="propDataForRecordButtons.closeRecords?.includes(record.id)"
            />
            <EditRecordModalButton v-else :record="record" />
          </td>
          <td>
            <DeleteRecordModalButton :record="record" v-if="store.currentUser?.Role.name_en === 'root'" />
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
            {{ new Date(record.date).toLocaleDateString() + ' ' + getDay(record.date) }}
          </td>
          <td id="column-item">
            {{ record.User.displayName }}
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
