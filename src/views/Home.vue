<script setup lang="ts">
import { ref } from 'vue'
import recordAPI from '../apis/expense'
// import lineBotAPI from '../apis/lineBot'
import { Record } from '../models/Record'
import Spinner from '../components/Spinner.vue'

class MonthData {
  total!: number
  closedAmount!: number
  rate!: number
}

const isLoading = ref<boolean>(true)
const records = ref<Record[]>([])
const thisMonthData = ref<MonthData>(new MonthData())
const lastMonthData = ref<MonthData>(new MonthData())

// methods
const fetchRecords = async function () {
  try {
    const { data } = await recordAPI.getAll()
    records.value = data
    // monthData
    const nowYear = new Date().getFullYear()
    const nowMonth = new Date().getMonth() + 1
    thisMonthData.value = calculateMonthData(nowYear, nowMonth)
    lastMonthData.value = calculateMonthData(
      nowMonth - 1 === 0 ? nowYear - 1 : nowYear,
      nowMonth - 1 === 0 ? 12 : nowMonth - 1
    )
    isLoading.value = false
  } catch (error) {
    console.error('error', error)
  }
}

// simple function
const calculateMonthData = (year: number, month: number) => {
  const recordsArr = records.value?.filter(
    (record) => new Date(record.date).getFullYear() === year && new Date(record.date).getMonth() + 1 === month
  )
  let total = 0
  let closedAmount = 0
  for (let record of recordsArr) {
    total += record.amount
    if (record.isClosed === true) {
      closedAmount += record.amount
    }
  }
  let rate
  if (total === 0) {
    rate = 0
  } else {
    rate = Math.round(closedAmount / total) * 100
  }
  return {
    total,
    closedAmount,
    rate
  }
}

// test
// const btnClick = async function () {
//   try {
//     const input = { message: 'HELLO', userId: 'Ub3557f7c812e4e78293959fe4fccd414' }
//     const { data } = await lineBotAPI.pushMsg(input)
//     console.log('data', data)
//   } catch (error) {
//     console.error('error', error)
//   }
// }

fetchRecords()
</script>

<template>
  <div v-if="!isLoading">
    <!-- <button class="btn btn-info" @click="btnClick">Message</button> -->

    <div class="list-group list-group-checkable">
      <label class="list-group-item py-3 mb-3">
        <div class="row">
          <div class="col-8 text-start">
            <h4>
              本月總額 ＄<strong>{{ thisMonthData.total }}</strong>
            </h4>
            <div class="progress mt-2" style="height: 20px">
              <div
                class="progress-bar"
                role="progressbar"
                :style="`width: ${thisMonthData.rate}%`"
                :aria-valuenow="thisMonthData.rate"
                aria-valuemin="0"
                aria-valuemax="100"
              >
                {{ thisMonthData.rate }}%
              </div>
            </div>
          </div>
          <div class="col-4 text-start">
            <div>未結算＄ {{ thisMonthData.total - thisMonthData.closedAmount }}</div>
            <div>已結算＄ {{ thisMonthData.closedAmount }}</div>
          </div>
        </div>
      </label>

      <label class="list-group-item py-3 mb-3">
        <div class="row">
          <div class="col-8 text-start">
            <h4>
              上月總額 ＄<strong>{{ lastMonthData.total }}</strong>
            </h4>
            <div class="progress mt-2" style="height: 20px">
              <div
                class="progress-bar"
                role="progressbar"
                :style="`width: ${lastMonthData.rate}%`"
                :aria-valuenow="lastMonthData.rate"
                aria-valuemin="0"
                aria-valuemax="100"
              >
                {{ lastMonthData.rate }}%
              </div>
            </div>
          </div>
          <div class="col-4 text-start">
            <div>未結算＄ {{ lastMonthData.total - lastMonthData.closedAmount }}</div>
            <div>已結算＄ {{ lastMonthData.closedAmount }}</div>
          </div>
        </div>
      </label>
    </div>
  </div>
  <Spinner v-else />
</template>
