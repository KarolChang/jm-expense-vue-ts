<script setup lang="ts">
import { ref, computed, provide } from 'vue'
import recordAPI from '../apis/record'
import { Record } from '@/models/index'
import { getDay } from '../utils/dateFormat'
import Spinner from '../components/Spinner.vue'
import DateFilter from '@/components/DateFilter.vue'
import { DateFilterData } from '@/definition/interface'
import { dateFilter } from '@/utils/dateFilter'
import { dayjs } from '@/utils/dayjs'

// data
const isLoading = ref<boolean>(true)
const records = ref<Record[]>([])
const dateFilterData = ref<DateFilterData>({
  searchMode: '月份',
  filter: {
    year: 0,
    month: 0,
    startDate: '',
    finishDate: ''
  }
})

// methods
const fetchRecords = async function () {
  try {
    const { data } = await recordAPI.getAll()
    records.value = data.data.filter((item: Record) => item.isClosed === true)
    dateFilterData.value.filter = {
      year: dayjs(records.value[0].date).year(),
      month: dayjs(records.value[0].date).month() + 1,
      startDate: dayjs(records.value[0].date).startOf('month').format('YYYY-MM-DD'),
      finishDate: dayjs(records.value[0].date).endOf('month').format('YYYY-MM-DD')
    }
    isLoading.value = false
  } catch (error) {
    console.error('error', error)
  }
}

// computed
const filteredRecord = computed(() => {
  return dateFilter(dateFilterData.value, records.value)
})

// created
fetchRecords()

// provide
provide('dateFilterData', dateFilterData)
</script>
<template>
  <div v-if="!isLoading">
    <DateFilter />
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
          <td>{{ record.item }}</td>
          <td>{{ record.merchant }}</td>
          <td>{{ record.amount }}</td>
          <td>{{ new Date(record.date).toLocaleDateString() + ' ' + getDay(record.date) }}</td>
          <td id="column-item">{{ record.User.displayName }}</td>
          <td id="column-item">{{ new Date(record.createdAt).toLocaleString() }}</td>
          <td id="column-item">{{ new Date(record.updatedAt).toLocaleString() }}</td>
        </tr>
      </tbody>
    </table>
    <img
      v-else
      class="img-fluid"
      src="https://stickershop.line-scdn.net/stickershop/v1/sticker/208430466/iPhone/sticker_animation@2x.png"
      alt="img"
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
