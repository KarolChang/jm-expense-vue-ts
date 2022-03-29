<script setup lang="ts">
const emit = defineEmits(['RPOpen'])
</script>

<template>
  <div id="panel">
    <div class="d-flex flex-column flex-shrink-0 p-3 text-white bg-light" style="width: 250px; height: 100vh">
      <i class="fas fa-chevron-right hide-icon" @click="emit('RPOpen', false)"></i>
      <slot name="title" />
      <slot name="content" />
    </div>
  </div>
</template>
<style scoped>
#panel {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 100;
}

.hide-icon {
  position: absolute;
  top: 22px;
  left: 25px;
  color: black;
}

.hide-icon:hover {
  color: orange;
}
</style>
