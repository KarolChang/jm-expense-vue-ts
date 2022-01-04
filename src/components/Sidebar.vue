<script setup lang="ts">
import { computed } from 'vue'
import { routes } from '../router/index'
import { useRoute, RouteRecordRaw } from 'vue-router'
import { useStore } from '../store/index'
import Swal from 'sweetalert2'
import { ConfirmBox } from '../utils/swal'
const route = useRoute()
const store = useStore()
const getUser = store.switchUser
const emit = defineEmits(['open'])

const items = computed(() => {
  return routes.filter((route: RouteRecordRaw) => route.meta?.show)
})

const changeItem = () => {
  emit('open', false)
}

const switchModalOpen = async () => {
  const { value: user } = await ConfirmBox.fire({
    title: '切換使用者',
    input: 'select',
    inputOptions: { 建喵: '建喵', 豬涵: '豬涵' },
    inputPlaceholder: 'who are you?',
    showCancelButton: true
  })
  if (user) {
    getUser(user)
    Swal.fire(`使用者已切換至 [${user}]`)
  }
}
</script>

<template>
  <div>
    <div class="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style="width: 180px; height: 100vh">
      <router-link
        :to="{ name: 'Home' }"
        class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
      >
        <span class="fs-4"><i class="fas fa-star"></i> JM記帳 <i class="fas fa-star"></i></span>
      </router-link>
      <hr />
      <ul class="nav nav-pills flex-column mb-auto">
        <li class="nav-item" v-for="(item, index) in items" :key="index">
          <router-link
            :to="{ name: item.name }"
            :class="'nav-link ' + (item.name === route.name ? 'text-info' : 'text-white')"
            @click="changeItem"
            >{{ item.meta?.pageTitle }}</router-link
          >
        </li>
      </ul>
      <hr />
      <div class="dropdown">
        <a
          href="#"
          class="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
          id="dropdownUser1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <img
            v-if="store.currentUser === '建喵'"
            src="../assets/jianmiau-login.png"
            alt=""
            width="50"
            height="55"
            class="rounded-circle me-2"
          />
          <img
            v-else-if="store.currentUser === '豬涵'"
            src="../assets/karol-login.png"
            alt=""
            width="50"
            height="55"
            class="rounded-circle me-2"
          />
          <img v-else src="../assets/capoo.gif" alt="" width="50" height="55" class="rounded-circle me-2" />
          <strong>{{ store.currentUser ? store.currentUser : '未登入' }}</strong>
        </a>
        <ul class="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
          <!-- <li><a class="dropdown-item" href="#">New project...</a></li>
          <li><a class="dropdown-item" href="#">Settings</a></li>
          <li><a class="dropdown-item" href="#">Profile</a></li> -->
          <!-- <li><hr class="dropdown-divider" /></li> -->
          <li><a class="dropdown-item" @click="switchModalOpen">切換帳號</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>
