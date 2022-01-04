import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
const root = '/jm-expense-vue-ts'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: `${root}/`
  },
  {
    path: `${root}/`,
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: {
      pageTitle: '首頁',
      show: true
    }
  },
  {
    path: `${root}/record`,
    name: 'Record',
    component: () => import('../views/Record.vue'),
    meta: {
      pageTitle: '未結算紀錄',
      show: true
    }
  },
  {
    path: `${root}/closedRecord`,
    name: 'ClosedRecord',
    component: () => import('../views/ClosedRecord.vue'),
    meta: {
      pageTitle: '已結算紀錄',
      show: true
    }
  },
  {
    path: `${root}/logs`,
    name: 'Logs',
    component: () => import('../views/Logs.vue'),
    meta: {
      pageTitle: '更動紀錄',
      show: true
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
