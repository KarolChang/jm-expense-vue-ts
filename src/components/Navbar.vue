<script setup lang="ts">
import { ref } from 'vue'
import Sidebar from '@/components/Sidebar.vue'
import { useRoute } from 'vue-router'
const route = useRoute()

const sidebarOpen = ref(false)
</script>

<template>
  <div class="d-flex">
    <transition name="slide-x">
      <Sidebar v-show="sidebarOpen" @open="sidebarOpen = false" />
    </transition>

    <div class="m-2" style="width: 100vw">
      <div class="d-flex">
        <i class="fas fa-bars fa-2x" @click="sidebarOpen = !sidebarOpen"></i>
        <h4 class="ms-3">{{ route.meta.pageTitle }}</h4>
      </div>
      <div class="m-3">
        <slot name="main" />
      </div>
    </div>
  </div>
</template>
