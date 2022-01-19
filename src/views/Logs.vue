<script setup lang="ts">
import { computed, ref } from 'vue'
import { showWeekDay } from '../utils/helper'
import recordAPI from '../apis/record'
import { Log } from '../models/Log'
import Swal from 'sweetalert2'
import Spinner from '../components/Spinner.vue'

const tabs = [
  { title: '總覽', btnColor: 'secondary' },
  { title: '新增', btnColor: 'primary' },
  { title: '編輯', btnColor: 'success' },
  { title: '結算', btnColor: 'danger' }
]
const isLoading = ref<boolean>(false)
const logs = ref<Log[]>([])
const nowTab = ref('總覽')
const logCount = ref<any>({ 總覽: 5, 新增: 5, 編輯: 5, 結算: 5 })

const filteredLogs = computed(() => {
  if (nowTab.value === '總覽') return logs.value
  return logs.value.filter((log) => log.action === nowTab.value)
})

const fetchLogs = async function () {
  try {
    const { data } = await recordAPI.getLogs()
    logs.value = data
    isLoading.value = false
  } catch (error) {
    console.error('error', error)
  }
}

const listIconClick = async (recordIds: string | undefined) => {
  if (!recordIds) return
  const recordIdArr = recordIds.split(',')
  const recordArr = []
  for (const id of recordIdArr) {
    const { data } = await recordAPI.getOne(Number(id))
    recordArr.push(data)
  }
  let html = `<table class="table"><thead><tr><th scope="col">項目</th><th scope="col">商家</th><th scope="col">金額</th><th scope="col">日期</th></tr></thead><tbody>`
  for (const id of recordIdArr) {
    const { data } = await recordAPI.getOne(Number(id))
    html += `<tr><td>${data.item}</td><td>${data.merchant}</td><td>${data.amount}</td><td>${new Date(
      data.date
    ).toLocaleDateString()}</td></tr>`
  }
  html += `</tbody></table>${
    document.documentElement.scrollWidth >= 500 ? '' : '<style>table{font-size:0.5em;}</style>'
  }`
  await Swal.fire({
    title: '結算紀錄',
    html
  })
}

// created
fetchLogs()
</script>

<template>
  <div v-if="!isLoading && logs.length">
    <template v-if="logs.length">
      <div id="pc">
        <div class="btn-group mb-3" role="group" aria-label="Basic radio toggle button group">
          <template v-for="(tab, index) in tabs" :key="index">
            <input
              type="radio"
              class="btn-check"
              name="btnradio"
              :id="tab.title"
              autocomplete="off"
              :checked="nowTab === tab.title"
            />
            <label :class="`btn btn-outline-${tab.btnColor}`" :for="tab.title" @click="nowTab = tab.title">{{
              tab.title
            }}</label>
          </template>
        </div>

        <div class="row h-20 mb-3" v-for="(log, index) in filteredLogs" :key="index">
          <div class="col-2 mt-4">
            <div class="fw-bold">
              {{ new Date(log.createdAt).toLocaleDateString() }}
              <!-- {{ new Date(log.createdAt).toLocaleDateString() + ` (${showWeekDay(log.createdAt)})` }} -->
            </div>
            <div class="fw-bold">{{ new Date(log.createdAt).toLocaleTimeString() }}</div>
          </div>
          <div class="col-9">
            <div class="bg-white border p-3">
              <div class="d-flex">
                <img
                  v-if="log.recorder === '建喵'"
                  src="../assets/jianmiau.jpeg"
                  class="my-auto img-thumbnail me-2"
                  width="60"
                  height="60"
                /><img v-else src="../assets/karol.png" class="my-auto img-thumbnail me-2" width="60" height="60" />
                <div class="text-start mt-2">
                  <strong class="px-1 me-1" style="background-color: yellow">{{ log.recorder }}</strong>
                  <strong style="color: salmon">{{ log.action }}紀錄</strong>
                  <i class="fas fa-chevron-right m-2"></i>
                  <template v-if="log.action === '新增' || log.action === '編輯'">
                    <strong style="color: blue">{{ log.item }}</strong> |
                    <strong style="color: brown">{{ log.merchant }}</strong> |
                    <strong style="color: orange">$ {{ log.amount }}</strong> |
                    <strong style="color: green">{{ new Date(log.date || '').toLocaleDateString() }}</strong>
                  </template>
                  <template v-if="log.action === '編輯'">
                    <br />
                    <h6>
                      原紀錄：<strong style="color: blue">{{ log.itemBefore }}</strong> |
                      <strong style="color: brown">{{ log.merchantBefore }}</strong> |
                      <strong style="color: orange">$ {{ log.amountBefore }}</strong> |
                      <strong style="color: green">{{ new Date(log.dateBefore || '').toLocaleDateString() }}</strong>
                    </h6>
                  </template>
                  <template v-if="log.action === '結算'">
                    <span>
                      結算金額
                      <strong style="color: orange">$ {{ log.closeAmount }} </strong>
                    </span>
                    <i class="far fa-list-alt fa-lg ms-2" id="records" @click="listIconClick(log.RecordIds)"></i>
                  </template>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- mobile -->
      <div id="mobile" class="card text-center">
        <div class="card-header">
          <ul class="nav nav-tabs card-header-tabs">
            <li class="nav-item" v-for="tab in tabs" :key="tab.title" @click="nowTab = tab.title">
              <span class="nav-link" :class="{ active: nowTab === tab.title }">{{ tab.title }}</span>
            </li>
          </ul>
        </div>

        <div class="card-body">
          <div class="card mb-3" v-for="(log, index) in filteredLogs.slice(0, logCount[nowTab])" :key="index">
            <div class="card-header">
              {{
                new Date(log.createdAt).toLocaleDateString() +
                ` (${showWeekDay(log.createdAt)}) ` +
                new Date(log.createdAt).toLocaleTimeString()
              }}
            </div>
            <div class="card-body d-flex">
              <img
                v-if="log.recorder === '建喵'"
                src="../assets/jianmiau.jpeg"
                class="my-auto img-thumbnail me-2"
                width="60"
                height="60"
              /><img v-else src="../assets/karol.png" class="my-auto img-thumbnail me-2" width="60" height="60" />
              <div class="text-start mt-2">
                <strong class="px-1 me-1" style="background-color: yellow">{{ log.recorder }}</strong>
                <strong style="color: salmon">{{ log.action }}紀錄</strong>
                <i class="fas fa-chevron-right m-2"></i>
                <template v-if="log.action === '新增' || log.action === '編輯'">
                  <h6>
                    <strong style="color: blue">{{ log.item }}</strong> |
                    <strong style="color: brown">{{ log.merchant }}</strong> |
                    <strong style="color: orange">$ {{ log.amount }}</strong> |
                    <strong style="color: green">{{ new Date(log.date || '').toLocaleDateString() }}</strong>
                  </h6>
                </template>
                <template v-if="log.action === '編輯'">
                  <h6>
                    原紀錄：<strong style="color: blue">{{ log.itemBefore }}</strong> |
                    <strong style="color: brown">{{ log.merchantBefore }}</strong> |
                    <strong style="color: orange">$ {{ log.amountBefore }}</strong> |
                    <strong style="color: green">{{ new Date(log.dateBefore || '').toLocaleDateString() }}</strong>
                  </h6>
                </template>
                <template v-if="log.action === '結算'">
                  <h6>
                    <span>
                      結算金額
                      <strong style="color: orange">$ {{ log.closeAmount }} </strong>
                    </span>
                    <i class="far fa-list-alt fa-lg ms-2" id="records" @click="listIconClick(log.RecordIds)"></i>
                  </h6>
                </template>
              </div>
            </div>
          </div>
          <div class="mt-3">
            <button
              v-if="logCount[nowTab] < filteredLogs.length"
              type="button"
              class="btn btn-secondary"
              @click="logCount[nowTab] += 5"
            >
              更多紀錄
            </button>
          </div>
        </div>
      </div>
    </template>
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
#records:hover {
  cursor: pointer;
  color: salmon;
}
@media screen and (max-width: 499px) {
  #pc {
    display: none;
  }
}
@media screen and (min-width: 500px) {
  #mobile {
    display: none;
  }
}
</style>
