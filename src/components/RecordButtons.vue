<script setup lang="ts">
import { inject } from 'vue'
import recordAPI from '@/apis/record'
import CreateRecordModalButton from '@/components/ModalButton/Record/CreateRecordModalButton.vue'
import { Toast, ConfirmBox } from '@/utils/swal'
import { pushMsgToBoth } from '@/utils/lineBotMsg'
import { useStore } from '@/store/index'
const store = useStore()
const emit = defineEmits(['closeFunction'])

// inject
const refetchRecords = inject<() => {}>('refetchRecords')!

// props
const props = defineProps<{
  propData: {
    isCloseStatus: boolean
    closeRecords: number[]
    closeRecordsAmount: number
  }
}>()

// methods
const toCloseBtnClick = async () => {
  const { isConfirmed } = await ConfirmBox.fire({
    icon: 'info',
    title: '確定結算資料？',
    text: `結算金額為 $${props.propData.closeRecordsAmount} [結算者: ${store.currentUser?.displayName}]`
  })
  if (isConfirmed) {
    closeRecord(props.propData.closeRecordsAmount)
  }
}

const closeRecord = async (amount: number) => {
  try {
    if (store.currentUser) {
      const { data } = await recordAPI.close({
        records: props.propData.closeRecords.toString(),
        totalAmount: amount,
        UserId: store.currentUser?.id
      })
      emit('closeFunction', 'closeRecord')
      refetchRecords()
      if (data.data.recordsNotFound.length || data.data.recordsClosedBefore.length) {
        Toast.fire({
          icon: 'success',
          title: '成功結算資料！有部分資料未能找到或是已經結算過。'
        })
      } else {
        Toast.fire({
          icon: 'success',
          title: '成功結算資料！'
        })
      }
      // lineBot push
      pushMsgToBoth(`${store.nickName}${store.icon}結算紀錄 → 總金額 $${amount}`)
    }
  } catch (error) {
    console.error('error', error)
    Toast.fire({
      icon: 'error',
      title: '結算資料失敗！'
    })
  }
}
</script>
<template>
  <div class="d-flex mb-3" style="width: 100vw">
    <template v-if="!propData.isCloseStatus">
      <CreateRecordModalButton view="Record" class="me-3" />
      <button type="button" class="btn btn-danger" @click="emit('closeFunction', 'closeBtnClick')">開始結算</button>
    </template>

    <template v-else>
      <div class="btn btn-info fw-bold">結算金額 ${{ propData.closeRecordsAmount }}</div>
      <button type="button" class="btn btn-secondary ms-3" @click="emit('closeFunction', 'cancelBtnClick')">
        取消結算
      </button>
      <button type="button" class="btn btn-success ms-3" @click="toCloseBtnClick">確定結算</button>
    </template>
  </div>
</template>
