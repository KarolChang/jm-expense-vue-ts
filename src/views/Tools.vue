<script setup lang="ts">
import { ref } from 'vue'
const num_1 = ref<number>()
const num_2 = ref<number>()

const plus = () => {
  num_1.value = num_1.value! + num_2.value!
  num_2.value = undefined
}
</script>
<template>
  <div>
    <div>
      <div class="input-group">
        <span class="input-group-text">計算機</span>
        <input type="number" class="form-control" v-model="num_1" />
        <input type="number" class="form-control" v-model="num_2" />
        <span class="input-group-text" @click="plus">加總</span>
      </div>
    </div>
    <!-- <div class="mt-3 p-3 bg-info">
      <p>~2022/2/7</p>
      <p>加總 3931</p>
    </div>
    <div class="mt-3">
      <label for="exampleFormControlTextarea1" class="form-label">Note</label>
      <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
    </div> -->
  </div>
</template>
