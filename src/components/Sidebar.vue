<script setup lang="ts">
import { computed, inject, Ref } from 'vue'
import router, { routes } from '../router/index'
import { useRoute, RouteRecordRaw } from 'vue-router'
import { useStore } from '../store/index'
import { Toast } from '@/utils/swal'
import { getAuth, signOut } from 'firebase/auth'
const route = useRoute()
const store = useStore()
const emit = defineEmits(['openUserRP'])

// inject
const sidebarOpen = inject<Ref<boolean>>('sidebarOpen')!

// computed
const items = computed(() => {
  return routes.filter((route: RouteRecordRaw) => route.meta?.show)
})

// methods
const logout = () => {
  const auth = getAuth()
  signOut(auth)
    .then(() => {
      store.logout()
      sidebarOpen.value = false
      router.push({ name: 'Login' })
      Toast.fire({
        icon: 'success',
        title: '離開豬豬世界囉~'
      })
    })
    .catch((error) => {
      console.log('error', error)
    })
}

const openUserRP = () => {
  sidebarOpen.value = false
  emit('openUserRP', true)
}
</script>

<template>
  <div>
    <div class="d-flex flex-column flex-shrink-0 p-3 text-white bg-primary" style="width: 180px; height: 100vh">
      <router-link
        :to="{ name: 'Home' }"
        class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
      >
        <div class="fs-4 mx-auto"><i class="fas fa-star"></i> JM記帳 <i class="fas fa-star"></i></div>
      </router-link>
      <hr class="my-1" />
      <ul class="nav nav-pills mb-auto">
        <li class="nav-item" v-for="(item, index) in items" :key="index">
          <template v-if="item.children?.length">
            <button
              class="nav-link fw-bold text-white"
              type="button"
              data-bs-toggle="collapse"
              :data-bs-target="`#collapse-${index}`"
              aria-expanded="false"
              :aria-controls="`#collapse-${index}`"
            >
              <span class="me-3">{{ item.meta?.pageTitle }}</span>
              <i class="fa-solid fa-angle-down"></i>
            </button>

            <div class="collapse" :id="`collapse-${index}`">
              <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                <li v-for="child in item.children" :key="child.name">
                  <router-link
                    :to="{ name: child.name }"
                    :class="'nav-link fw-bold ' + (child.name === route.name ? 'text-danger' : 'text-white')"
                    @click="sidebarOpen = false"
                    >{{ child.meta?.pageTitle }}</router-link
                  >
                </li>
              </ul>
            </div>
          </template>
          <router-link
            v-else
            :to="{ name: item.name }"
            :class="'nav-link fw-bold ' + (item.name === route.name ? 'text-danger' : 'text-white')"
            @click="sidebarOpen = false"
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
            :src="store.currentUser.photoURL || '../assets/capoo.gif'"
            alt="photo"
            width="55"
            height="55"
            class="rounded-circle me-2"
          />
          <strong>{{ store.currentUser.displayName }}</strong>
        </a>
        <ul class="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
          <!-- <li><hr class="dropdown-divider" /></li> -->
          <li><a class="dropdown-item" @click="openUserRP">個人資料</a></li>
          <li><a class="dropdown-item" @click="logout">登出</a></li>
          <!-- <li><a class="dropdown-item" @click="switchModalOpen">切換帳號</a></li> -->
        </ul>
      </div>
    </div>

    <!-- <transition name="slide-right">
      <UserRP v-show="userRPOpen" />
    </transition> -->
  </div>
</template>
