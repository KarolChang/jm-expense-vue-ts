<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
import { onLoad } from './cocos/config'
import { useRoute } from 'vue-router'
const route = useRoute()

// created
if (import.meta.env.NODE_ENV === 'production') {
  onLoad()
}
</script>

<template>
  <!-- <div> -->
  <Navbar>
    <template #main>
      <router-view v-slot="{ Component }">
        <transition name="fade-fast" mode="out-in">
          <component :is="Component" :key="route.fullPath" />
        </transition>
      </router-view>
    </template>
  </Navbar>
  <!-- </div> -->
</template>
<style>
@import url('https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic:wght@400;700&display=swap');

body {
  background-image: url('https://png.pngtree.com/thumb_back/fh260/background/20190222/ourmid/pngtree-minimalistic-cat-claws-seamless-background-design-backgroundpinkcat-clawseamless-backgroundbanner-image_57663.jpg');
}

/* .is-primary {
  color: hsl(150, 50%, 50%);
} */

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-family: 'Zen Maru Gothic', sans-serif;
}

table {
  display: block;
  line-height: 25px;
}

.color-orange {
  color: coral;
}

.bg-orange {
  background-color: coral;
}

/* transition */
.slide-x-enter-active {
  transition: transform 0.3s ease-out;
}

.slide-x-leave-active {
  transition: transform 0.2s ease-in;
}

.slide-x-enter-from {
  transform: translateX(-100%);
}
.slide-x-enter-to {
  transform: translateX(0);
}

.slide-x-leave-from {
  transform: translateX(0);
}
.slide-x-leave-to {
  transform: translateX(-100%);
}

.fade-fast-enter-active,
.fade-fast-leave-active {
  transition: opacity 0.2s ease;
}

.fade-fast-enter-from,
.fade-fast-leave-to {
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .fade-fast-enter-active,
  .fade-fast-leave-active {
    transition: none;
  }
}

.slide-right-enter-active {
  transition: transform 0.3s ease-out;
}

.slide-right-leave-active {
  transition: transform 0.2s ease-in;
}

.slide-right-enter-from {
  transform: translateX(100%);
}
.slide-right-enter-to {
  transform: translateX(0);
}

.slide-right-leave-from {
  transform: translateX(0);
}
.slide-right-leave-to {
  transform: translateX(100%);
}

th,
td,
label {
  white-space: nowrap;
}
</style>
<!-- <style src="@vueform/multiselect/themes/default.css"></style> -->
