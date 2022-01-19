<script setup lang="ts">
import { ref } from 'vue'
import expenseAPI from '../apis/expense'
import { Expense, ExpenseInput } from '../models/Expense'
import Swal from 'sweetalert2'
import { Toast, ConfirmBox } from '../utils/swal'
import { showWeekDay } from '../utils/helper'
import Spinner from '@/components/Spinner.vue'
import RightPanel from '@/components/RightPanel.vue'

// data
const isLoading = ref<boolean>(true)
const expenses = ref<Expense[]>([])
const rightPanelOpen = ref(false)

// methods
const fetchExpenses = async function () {
  try {
    const { data } = await expenseAPI.expense.getAll()
    expenses.value = data.filter((item: Expense) => item.deletedAt === null)
    isLoading.value = false
  } catch (error) {
    console.error('error', error)
  }
}

const createBtnClick = async () => {
  try {
    const { value: formValues } = await ConfirmBox.fire({
      title: '新增資料',
      html: `
      <div class="d-flex mb-2">
        <div class="col-auto me-3">
          <label for="swal-categoryId" class="col-form-label">類別</label>
        </div>
        <div class="col-auto">
          <input type="text" id="swal-categoryId" class="form-control" >
        </div>
      </div>
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
          <label for="swal-amount" class="col-form-label">金額</label>
        </div>
        <div class="col-auto">
          <input type="number" id="swal-amount" class="form-control" >
        </div>
      </div>
      <div class="d-flex mb-2">
        <div class="col-auto me-3">
          <label for="swal-note" class="col-form-label">備註</label>
        </div>
        <div class="col-auto">
          <input type="text" id="swal-note" class="form-control" >
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
      `,
      preConfirm: () => {
        const categoryId = (document.getElementById('swal-categoryId') as HTMLInputElement).value
        const item = (document.getElementById('swal-item') as HTMLInputElement).value
        const amount = (document.getElementById('swal-amount') as HTMLInputElement).value
        const date = new Date((document.getElementById('swal-date') as HTMLInputElement).value)
        const note = (document.getElementById('swal-note') as HTMLInputElement).value
        if (!item || !amount || !date) {
          Swal.showValidationMessage('除了[備註]，所有資料都是必填！')
        }
        return {
          input: {
            CategoryId: Number(categoryId),
            item,
            amount,
            note,
            date
          } as ExpenseInput
        }
      }
    })
    if (formValues) {
      createExpense(formValues)
    }
  } catch (error) {
    console.error('error', error)
  }
}

const createExpense = async function (formValues: { input: ExpenseInput }) {
  try {
    await expenseAPI.expense.create(formValues.input)
    fetchExpenses()
    Toast.fire({
      icon: 'success',
      title: '成功建立資料！'
    })
  } catch (error) {
    console.error('error', error)
    Toast.fire({
      icon: 'error',
      title: '新增資料失敗！'
    })
  }
}

const editBtnClick = (id: number) => {
  console.log('editBtnClick', id)
}

// created
fetchExpenses()
</script>
<template>
  <div v-if="!isLoading">
    <div class="d-flex mb-3" style="width: 100vw">
      <button type="button" class="btn btn-primary me-3" @click="createBtnClick">新增資料</button>
      <button type="button" class="btn btn-warning" @click="rightPanelOpen = !rightPanelOpen">查看類別</button>
    </div>
    <table class="table table-striped table-success table-hover" v-if="expenses.length">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">類別</th>
          <th scope="col">項目</th>
          <th scope="col">金額</th>
          <th scope="col">備註</th>
          <th scope="col">日期</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(expense, index) in expenses" :key="index">
          <td>
            <i class="fas fa-edit" @click="editBtnClick(expense.id)"></i>
          </td>
          <td>
            {{ expense.Category.name }}
          </td>
          <td>
            {{ expense.item }}
          </td>
          <td>
            {{ expense.amount }}
          </td>
          <td>
            {{ expense.note }}
          </td>
          <td>
            {{ new Date(expense.date).toLocaleDateString() + ` (${showWeekDay(expense.date)})` }}
          </td>
        </tr>
      </tbody>
    </table>
    <!-- <img
      v-else
      class="img-fluid"
      src="https://memeprod.sgp1.digitaloceanspaces.com/user-wtf/1581909112681.jpg"
      alt=""
    /> -->
    <transition name="slide-right">
      <RightPanel v-show="rightPanelOpen" />
    </transition>
  </div>
  <Spinner v-else />
</template>
