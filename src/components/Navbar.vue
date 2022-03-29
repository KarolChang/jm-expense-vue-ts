<script setup lang="ts">
import { ref, provide } from 'vue'
import Sidebar from '@/components/Sidebar.vue'
import UserRP from '@/components/RightPanel/UserRP.vue'
import { useRoute } from 'vue-router'
import { useStore } from '@/store/index'
const store = useStore()
const route = useRoute()

const sidebarOpen = ref<boolean>(false)
const userRPOpen = ref<boolean>(false)

// provide
provide('sidebarOpen', sidebarOpen)
provide('userRPOpen', userRPOpen)
</script>

<template>
  <!-- 登入後 -->
  <div class="d-flex" v-if="store.firebaseUser">
    <transition name="slide-x">
      <Sidebar v-show="sidebarOpen" @openUserRP="userRPOpen = true" />
    </transition>

    <div class="m-2" style="width: 100vw">
      <div class="d-flex">
        <i class="fas fa-bars fa-2x" @click="sidebarOpen = !sidebarOpen"></i>
        <h4 class="ms-3">{{ route.meta.pageTitle }}</h4>
      </div>
      <div class="m-3">
        <slot name="main" />
        <transition name="slide-right">
          <UserRP v-show="userRPOpen" />
        </transition>
      </div>
    </div>
  </div>
  <!-- 未登入 -->
  <div v-else>
    <slot name="main" />
  </div>
</template>
