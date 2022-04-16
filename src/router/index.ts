import { Toast } from '@/utils/swal'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { useStore } from '../store/index'
import AppLayout from '@/views/App.vue'

const root = '/jm-expense-vue-ts'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: `${root}/`
  },
  {
    path: `${root}/register`,
    name: 'Register',
    component: () => import('../views/Register.vue'),
    meta: {
      pageTitle: '註冊頁',
      show: false
    }
  },
  {
    path: `${root}/login`,
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: {
      pageTitle: '登入頁',
      show: false
    }
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
    path: `${root}/expense`,
    name: 'Expense',
    component: () => import('../views/Expense.vue'),
    meta: {
      pageTitle: '豬涵記帳',
      show: true
    }
  },
  // {
  //   path: `${root}/tools`,
  //   name: 'Tools',
  //   component: () => import('../views/Tools.vue'),
  //   meta: {
  //     pageTitle: '小工具',
  //     show: true
  //   }
  // },
  {
    path: `${root}/game`,
    name: 'Game',
    component: () => import('../views/Game.vue'),
    meta: {
      pageTitle: '小遊戲',
      show: true
      // auth: ['root', 'admin', 'member']
    }
  },
  // {
  //   path: `${root}/admin`,
  //   name: 'Admin',
  //   redirect: { name: 'Admin-Role' },
  //   component: AppLayout,
  //   meta: {
  //     pageTitle: '管理面板',
  //     show: true
  //   },
  //   children: [
  //     {
  //       path: 'role',
  //       name: 'Admin-Role',
  //       component: () => import('../views/Role.vue'),
  //       meta: {
  //         pageTitle: '角色管理',
  //         show: true
  //       }
  //     },
  //     {
  //       path: 'permission',
  //       name: 'Admin-Permission',
  //       component: () => import('../views/Permission.vue'),
  //       meta: {
  //         pageTitle: '權限管理',
  //         show: true
  //       }
  //     }
  //   ]
  // },
  // {
  //   path: `${root}/admin/role`,
  //   name: 'Admin-Role',
  //   component: () => import('@/views/Role.vue'),
  //   meta: {
  //     pageTitle: '角色管理',
  //     show: true
  //   }
  // },
  // {
  //   path: '/admin/role/:id/access',
  //   name: 'Admin-Role-Access',
  //   component: () => import('@/views/Access.vue'),
  //   meta: {
  //     pageTitle: '角色管理 / 設置權限[角色名稱]',
  //     show: false
  //   }
  // },
  // {
  //   path: '/admin/permission',
  //   name: 'Admin-Permission',
  //   component: () => import('../views/Permission.vue'),
  //   meta: {
  //     pageTitle: '權限管理',
  //     show: true
  //   }
  // },
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

router.beforeEach(async (to, from, next) => {
  const store = useStore()
  console.log('[router]firebaseUser', store.firebaseUser)
  console.log('[router]currentUser ID', store.currentUser?.id)
  // 目前不能使用 currentUser
  if (!store.firebaseUser) {
    if (to.name !== 'Login' && to.name !== 'Register') {
      next({ name: 'Login' })
      Toast.fire({
        icon: 'error',
        title: '請先登入'
      })
    } else {
      next()
    }
  } else {
    if (to.name === 'Login' || to.name === 'Register') {
      next({ name: 'Home' })
    } else {
      next()
    }
  }
})

export default router
