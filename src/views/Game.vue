<script setup lang="ts">
import { ref } from 'vue'
import NumberWordle from '@/components/Game/NumberWordle.vue'
import NumberAB from '@/components/Game/NumberAB.vue'

const tabs = ref(['猜數字(Wordle)', '猜數字(AB)'])
const nowTab = ref('猜數字(Wordle)')
</script>
<template>
  <div>
    <div class="d-flex justify-content-center m-2 mb-5">
      <button
        v-for="(tab, index) in tabs"
        :key="index"
        type="button"
        :class="`btn btn-${nowTab !== tab ? 'outline-' : ''}danger me-2`"
        @click="nowTab = tab"
      >
        {{ tab }}
      </button>
    </div>
    <NumberWordle v-if="nowTab === '猜數字(Wordle)'"></NumberWordle>
    <NumberAB v-if="nowTab === '猜數字(AB)'" />
  </div>
</template>
<style scoped>
.num-block {
  height: 50px;
  width: 50px;
  background-color: #d3d3d3;
  border: 2px solid black;
  border-radius: 8%;
  margin: 0 5px;
  text-align: center;
  font-size: 28px;
}

.num-btn {
  width: 15%;
  background-color: white;
  border: 2px solid black;
  border-radius: 8%;
  margin: 5px;
  text-align: center;
  font-size: 28px;
  cursor: pointer;
}

.btn-customer {
  width: 35%;
  border: 2px solid black;
  border-radius: 5%;
  margin: 5px 5px;
  text-align: center;
  font-size: 20px;
  cursor: pointer;
  color: black;
}

.back-btn {
  background-color: yellow;
}

.enter-btn {
  background-color: greenyellow;
}

.reset-btn {
  background-color: darkturquoise;
}
</style>
