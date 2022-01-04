<script setup lang="ts">
import { ref, computed } from 'vue'
import recordAPI from '../apis/expense'
import { Record } from '../models/Record'
import { showWeekDay } from '../utils/helper'
import Spinner from '../components/Spinner.vue'
type SearchMode = '月份' | '日期'

// data
const isLoading = ref<boolean>(true)
const records = ref<Record[]>([])
const searchMode = ref<SearchMode>('月份')
const year = ref(new Date().getFullYear())
const month = ref(new Date().getMonth() + 1)
const startDate = ref<Date | string>('')
const finishDate = ref<Date | string>('')

// methods
const fetchRecords = async function () {
  try {
    const { data } = await recordAPI.getAll()
    records.value = data.filter((item: Record) => item.isClosed === true)
    isLoading.value = false
  } catch (error) {
    console.error('error', error)
  }
}

const radioClick = (radio: SearchMode) => {
  searchMode.value = radio
}

// computed
const filteredRecord = computed(() => {
  if (searchMode.value === '月份') {
    return records.value?.filter(
      (item: Record) =>
        new Date(item.date).getFullYear() === year.value && new Date(item.date).getMonth() + 1 === month.value
    )
  } else {
    if (!startDate.value && !finishDate.value) return []
    if (startDate.value && !finishDate.value) {
      return records.value?.filter(
        (item: Record) => new Date(item.date).getTime() >= new Date(startDate.value).getTime()
      )
    } else if (!startDate.value && finishDate.value) {
      return records.value?.filter(
        (item: Record) => new Date(item.date).getTime() <= new Date(finishDate.value + ' 23:59:59').getTime()
      )
    } else {
      return records.value?.filter(
        (item: Record) =>
          new Date(item.date).getTime() >= new Date(startDate.value).getTime() &&
          new Date(item.date).getTime() <= new Date(finishDate.value + ' 23:59:59').getTime()
      )
    }
  }
})

// created
fetchRecords()
</script>
<template>
  <div v-if="!isLoading">
    <div class="d-flex mb-4">
      <div class="m-2 me-5">
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault1"
            @click="radioClick('月份')"
            checked
          />
          <label class="form-check-label" for="flexRadioDefault1">月份搜尋</label>
        </div>
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault2"
            @click="radioClick('日期')"
          />
          <label class="form-check-label" for="flexRadioDefault2">日期搜尋</label>
        </div>
      </div>
      <template v-if="searchMode === '月份'">
        <div>
          <label for="year" class="form-label">西元年</label>
          <select class="form-select" aria-label="Default select example" v-model="year">
            <option v-for="n in 100" :key="n" :value="n + 2020">{{ n + 2020 }}年</option>
          </select>
        </div>
        <div class="ms-3">
          <label for="finishDate" class="form-label">月份</label>
          <select class="form-select" aria-label="Default select example" v-model="month">
            <option v-for="n in 12" :key="n" :value="n">{{ n }}月</option>
          </select>
        </div>
      </template>
      <template v-else>
        <div>
          <label for="startDate" class="form-label">開始日期</label>
          <input
            v-model="startDate"
            type="date"
            id="startDate"
            class="form-control"
            aria-describedby="passwordHelpInline"
          />
        </div>
        <div class="ms-3">
          <label for="finishDate" class="form-label">結束日期</label>
          <input
            v-model="finishDate"
            type="date"
            id="finishDate"
            class="form-control"
            aria-describedby="passwordHelpInline"
          />
        </div>
      </template>
    </div>
    <table class="table table-striped table-info table-hover" v-if="filteredRecord.length">
      <thead>
        <tr>
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
        <tr v-for="(record, index) in filteredRecord" :key="index">
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

@media screen and (max-width: 400px) {
  #column-item {
    display: none;
  }
}
</style>
