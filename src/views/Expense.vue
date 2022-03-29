<script setup lang="ts">
import { ref, provide, computed, watch } from 'vue'
import expenseAPI from '@/apis/expense'
import { Expense, Category } from '@/models'
import { getDay } from '../utils/dateFormat'
import Spinner from '@/components/Spinner.vue'
import CategoryRP from '@/components/RightPanel/CategoryRP.vue'
import CreateExpenseModalButton from '@/components/ModalButton/Expense/CreateExpenseModalButton.vue'
import EditExpenseModalButton from '@/components/ModalButton/Expense/EditExpenseModalButton.vue'
import DeleteExpenseModalButton from '@/components/ModalButton/Expense/DeleteExpenseModalButton.vue'
import FilterBox from '@/components/FilterBox.vue'
import DateFilter from '@/components/DateFilter.vue'
import { DateFilterData } from '@/definition/interface'
import { dateFilter } from '@/utils/dateFilter'
import { dayjs } from '@/utils/dayjs'

// data
const expenses = ref<Expense[]>()
const categories = ref<Category[]>()
const categoryRPOpen = ref<boolean>(false)
const categoryFilters = ref<number[]>([])
const dateFilterData = ref<DateFilterData>({
  searchMode: '月份',
  filter: {
    year: dayjs().year(),
    month: dayjs().month() + 1,
    startDate: dayjs().startOf('month').format('YYYY-MM-DD hh:mm:ss'),
    finishDate: dayjs().endOf('month').format('YYYY-MM-DD hh:mm:ss')
  }
})
const selectedType = ref<'支出' | '收入' | 'ALL'>('ALL')

// computed
const allCategories = computed<number[]>(() => {
  if (selectedType.value !== 'ALL') {
    return categories
      .value!.filter((category: Category) => category.type === selectedType.value)
      .map((item: Category) => item.id)
  } else {
    return categories.value!.map((item: Category) => item.id)
  }
})

const categoriesByType = computed(() => {
  if (selectedType.value === 'ALL') {
    return categories.value
  } else {
    return categories.value!.filter((category: Category) => category.type === selectedType.value)
  }
})

const filteredExpenses = computed(() => {
  let chosenExpenses: Expense[] = []
  // category filter
  chosenExpenses = expenses.value!.filter((expense: Expense) => categoryFilters.value.includes(expense.Category.id))
  // date filter
  return dateFilter(dateFilterData.value, chosenExpenses)
})

const amountSum = computed(() => {
  let income = 0
  let expense = 0
  filteredExpenses.value.forEach((item: Expense) => {
    if (item.Category.type === '支出') {
      expense += item.amount
    } else {
      income += item.amount
    }
  })
  return {
    income,
    expense
  }
})

// methods
const fetchExpenses = async function () {
  try {
    const { data } = await expenseAPI.expense.getAll()
    expenses.value = data.data
  } catch (error) {
    console.error('error', error)
  }
}

const fetchCategories = async () => {
  try {
    const { data } = await expenseAPI.category.getAll()
    categories.value = data.data
    categoryFilters.value = categories.value!.map((item: Category) => item.id)
  } catch (error) {
    console.error('error', error)
  }
}

// created
fetchExpenses()
fetchCategories()

// watch
watch(selectedType, (newVal) => {
  if (newVal !== 'ALL') {
    categoryFilters.value = categories
      .value!.filter((category: Category) => category.type === selectedType.value)
      .map((item: Category) => item.id)
  } else {
    categoryFilters.value = categories.value!.map((item: Category) => item.id)
  }
})

// provide
provide('refetchExpenses', fetchExpenses)
provide('refetchCategories', fetchCategories)
provide('categories', categories)
provide('categoryFilters', categoryFilters)
provide('dateFilterData', dateFilterData)
provide('categoryRPOpen', categoryRPOpen)
provide('categoriesByType', categoriesByType)
</script>

<template>
  <div v-if="expenses && categories">
    <!-- buttons -->
    <div class="d-flex mb-3" style="width: 100vw">
      <CreateExpenseModalButton />
      <button type="button" class="btn btn-warning text-dark" @click="categoryRPOpen = true">查看類別</button>
    </div>
    <!-- filter -->
    <div class="d-flex mb-4" style="width: 100%">
      <div class="mt-4" style="width: 50px">
        <label for="type" style="float: left; font-size: 0.7em">TYPE</label>
        <select class="form-select" id="type" aria-label="Default select example" v-model="selectedType">
          <option selected>ALL</option>
          <option>支出</option>
          <option>收入</option>
        </select>
      </div>
      <div>
        <DateFilter style="width: 250px" />
      </div>
    </div>
    <!-- sum -->
    <div class="d-flex align-items-center mb-4" style="width: 100%">
      <span class="badge bg-warning text-dark fs-3">收入 $ {{ amountSum.income }}</span>
      <i class="fas fa-minus mx-2"></i>
      <span class="badge bg-success fs-3">支出 $ {{ amountSum.expense }}</span>
      <i class="fas fa-equals mx-2"></i>
      <span class="badge bg-info fs-3">$ {{ amountSum.income - amountSum.expense }}</span>
    </div>
    <div class="d-flex align-items-start">
      <FilterBox :allCategories="allCategories" />
      <table class="table table-striped table-success table-hover" v-if="filteredExpenses?.length">
        <thead>
          <tr class="table-light">
            <th scope="col">#</th>
            <th scope="col">#</th>
            <th scope="col">類別</th>
            <th scope="col">項目</th>
            <th scope="col">金額</th>
            <th scope="col">備註</th>
            <th scope="col">日期</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(expense, index) in filteredExpenses" :key="index">
            <tr :class="expense.Category.type === '支出' ? 'table-success' : 'table-warning'">
              <td>
                <EditExpenseModalButton :expense="expense" />
              </td>
              <td>
                <DeleteExpenseModalButton :expense="expense" />
              </td>
              <td>
                <i :class="expense.Category.icon"></i>
              </td>
              <td>{{ expense.item }}</td>
              <td>{{ expense.amount }}</td>
              <td>{{ expense.note }}</td>
              <td>{{ new Date(expense.date).toLocaleDateString() + ' ' + getDay(expense.date) }}</td>
            </tr>
          </template>
        </tbody>
      </table>
      <img
        v-else
        class="img-fluid"
        src="https://stickershop.line-scdn.net/stickershop/v1/sticker/208430466/iPhone/sticker_animation@2x.png"
        alt="img"
      />
    </div>
    <transition name="slide-right">
      <CategoryRP v-if="categoryRPOpen" />
    </transition>
  </div>
  <Spinner v-else />
</template>
