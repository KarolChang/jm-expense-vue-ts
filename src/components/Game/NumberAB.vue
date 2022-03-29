<script setup lang="ts">
import { ref } from 'vue'
interface GuessLog_AB {
  number: number[]
  status: string
}

// variable
const nums: number[] = Array.from({ length: 10 }, (_, i) => i)
const answer: number[] = []
for (let i = 0; i < 4; i++) {
  const index = Math.floor(Math.random() * nums.length)
  answer.push(nums[index])
  nums.splice(index, 1)
}
console.log('answer', answer)

// data
const nowGuessNumberArr = ref<number[]>([])
const guessedNumber = ref<GuessLog_AB[]>([])
const isWinning = ref<boolean>(false)

// methods
const numClick = (num: number) => {
  if (nowGuessNumberArr.value.length >= 4) {
    return alert('數字已滿！')
  }
  if (nowGuessNumberArr.value.includes(num)) {
    return alert('數字重複！')
  }
  nowGuessNumberArr.value.push(num)
}
const enterClick = () => {
  console.log('enterClick')
  if (nowGuessNumberArr.value.length !== 4) {
    return alert('數字未達四位！')
  }
  let ACount = 0
  let BCount = 0
  nowGuessNumberArr.value.forEach((num, i) => {
    if (num === answer[i]) {
      ACount += 1
    } else if (answer.includes(num)) {
      BCount += 1
    }
  })
  guessedNumber.value.push({
    number: nowGuessNumberArr.value,
    status: `${ACount ? ACount + 'A' : ''}${BCount ? BCount + 'B' : ''}`
  })
  // 判斷是否猜對
  if (ACount === 4) {
    isWinning.value = true
    return alert(`恭喜答對！你真幸運~\n總次數:${guessedNumber.value.length}次`)
  }
  // 重置
  nowGuessNumberArr.value = []
}
const resetClick = () => {
  nowGuessNumberArr.value = []
  guessedNumber.value = []
  isWinning.value = false
}
</script>
<template>
  <div class="container" v-if="!isWinning">
    <div class="row">
      <div class="col col-sm-6">
        <div class="d-flex justify-content-center mb-3">
          <div class="num-block">{{ nowGuessNumberArr[0] }}</div>
          <div class="num-block">{{ nowGuessNumberArr[1] }}</div>
          <div class="num-block">{{ nowGuessNumberArr[2] }}</div>
          <div class="num-block">{{ nowGuessNumberArr[3] }}</div>
        </div>
        <div class="d-flex flex-wrap justify-content-center">
          <div v-for="index in 10" :key="index" @click="numClick(index - 1)" class="num-btn">
            {{ index - 1 }}
          </div>
        </div>
        <div class="d-flex justify-content-center mb-3">
          <div class="btn-customer reset-btn" v-if="isWinning" @click="resetClick">RESET</div>
          <template v-else>
            <div class="btn-customer back-btn col-6" @click="nowGuessNumberArr.pop()">BACK</div>
            <div class="btn-customer enter-btn col-6" @click="enterClick">ENTER</div>
          </template>
        </div>
      </div>
      <div class="col col-sm-6">
        <h4 class="text-center">GUESS RECORDS</h4>
        <ul class="list-group">
          <li class="list-group-item mx-auto" v-for="(obj, index) in guessedNumber" :key="index">
            <div class="d-flex align-items-center">
              <div :class="'num-block bg-' + obj.status[num]" v-for="num in obj.number" :key="num">{{ num }}</div>
              <h3 class="ms-2">{{ obj.status }}</h3>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <img v-else src="https://i.imgur.com/OmkEpSv.jpg" alt="" class="img-fluid" @click="resetClick" />
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
