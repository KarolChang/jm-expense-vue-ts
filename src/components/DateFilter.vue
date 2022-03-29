<script setup lang="ts">
import { inject, Ref } from 'vue'
import { formatDate } from '@/utils/dateFormat'
import { DateFilterData } from '@/definition/interface'

// inject
const dateFilterData = inject<Ref<DateFilterData>>('dateFilterData')!

// methods
const format = (date: Date) => {
  return formatDate(date)
}

const setStartDate = (date: Date) => {
  if (date === null) {
    dateFilterData.value.filter.startDate = ''
  } else {
    dateFilterData.value.filter.startDate = formatDate(date)
  }
}

const setFinishDate = (date: Date) => {
  if (date === null) {
    dateFilterData.value.filter.finishDate = ''
  } else {
    dateFilterData.value.filter.finishDate = formatDate(date)
  }
}
</script>

<template>
  <div class="d-flex m-2 ms-3">
    <div class="form-check me-3">
      <input
        class="form-check-input"
        type="radio"
        name="flexRadioDefault"
        id="flexRadioDefault1"
        @click="dateFilterData.searchMode = '月份'"
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
        @click="dateFilterData.searchMode = '日期'"
      />
      <label class="form-check-label" for="flexRadioDefault2">日期搜尋</label>
    </div>
  </div>

  <div class="d-flex mb-3" v-if="dateFilterData.searchMode === '月份'">
    <div class="ms-3 my-auto">
      <select class="form-select" aria-label="Default select example" v-model="dateFilterData.filter.year">
        <option v-for="n in 100" :key="n" :value="n + 2020">{{ n + 2020 }}年</option>
      </select>
    </div>
    <div class="ms-3 my-auto">
      <select class="form-select" aria-label="Default select example" v-model="dateFilterData.filter.month">
        <option v-for="n in 12" :key="n" :value="n">{{ n }}月</option>
      </select>
    </div>
  </div>

  <div v-else class="d-flex mb-3">
    <div class="ms-3 my-auto">
      <Datepicker
        :modelValue="dateFilterData.filter.startDate"
        @update:modelValue="setStartDate"
        :format="format"
        :previewFormat="format"
        :enableTimePicker="false"
        autoApply
      />
    </div>
    <div class="mx-2 my-auto">～</div>
    <div class="my-auto">
      <Datepicker
        :modelValue="dateFilterData.filter.finishDate"
        @update:modelValue="setFinishDate"
        :format="format"
        :previewFormat="format"
        :enableTimePicker="false"
        autoApply
      />
    </div>
  </div>
</template>
