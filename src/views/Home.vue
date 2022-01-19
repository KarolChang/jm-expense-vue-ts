<script setup lang="ts">
import { ref } from 'vue'
import recordAPI from '../apis/record'
import { Record } from '../models/Record'
import Spinner from '../components/Spinner.vue'
import CreateRecordModalButton from '../components/modalButton/CreateRecordModalButton.vue'

class MonthData {
  total!: number
  closedAmount!: number
  rate!: number
}

// data
const isLoading = ref<boolean>(true)
const records = ref<Record[]>([])
const thisMonthData = ref<MonthData>(new MonthData())
const lastMonthData = ref<MonthData>(new MonthData())

// methods
const fetchRecords = async function () {
  try {
    const { data } = await recordAPI.getAll()
    records.value = data.filter((item: Record) => item.deletedAt === null)
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

// created
fetchRecords()

// 笨蛋才按我
const handle = async () => {
  const input = {
    to: [process.env.VUE_APP_KAROL_USERID, process.env.VUE_APP_JIANMIAU_USERID],
    messages: { type: 'text', text: '卡比覺得促咪！' }
  }
  console.log('input', input)
  await recordAPI.pushLineMsg(input)
}
</script>

<template>
  <div v-if="!isLoading">
    <div class="d-flex mb-3">
      <CreateRecordModalButton view="Home" class="me-3" />
      <button type="button" class="btn btn-success me-3" @click="handle">笨蛋才按我</button>
    </div>
    <div class="list-group list-group-checkable">
      <label class="list-group-item py-3 mb-3">
        <div class="row">
          <div class="col-7 text-start">
            <h5>
              本月總額 ＄<strong>{{ thisMonthData.total }}</strong>
            </h5>
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
          <div class="col-5 text-start">
            <div>未結算＄ {{ thisMonthData.total - thisMonthData.closedAmount }}</div>

            <div>已結算＄ {{ thisMonthData.closedAmount }}</div>
          </div>
        </div>
      </label>

      <label class="list-group-item py-3 mb-3">
        <div class="row">
          <div class="col-7 text-start">
            <h5>
              上月總額 ＄<strong>{{ lastMonthData.total }}</strong>
            </h5>
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
          <div class="col-5 text-start">
            <div>未結算＄ {{ lastMonthData.total - lastMonthData.closedAmount }}</div>
            <div>已結算＄ {{ lastMonthData.closedAmount }}</div>
          </div>
        </div>
      </label>
    </div>
  </div>
  <Spinner v-else />
</template>
