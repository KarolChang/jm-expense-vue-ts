<script setup lang="ts">
import { inject, Ref, ref } from 'vue'
import { Category } from '@/models'
import CreateCategoryModalButton from '@/components/ModalButton/Category/CreateCategoryModalButton.vue'
import DeleteCategoryModalButton from '@/components/ModalButton/Category/DeleteCategoryModalButton.vue'
import EditCategoryModalButton from '@/components/ModalButton/Category/EditCategoryModalButton.vue'
import RightPanel from '@/components/RightPanel/RightPanel.vue'
import type { CategoryType } from '@/models'

// inject
const categories = inject<Ref<Category[]>>('categories')!
const categoryRPOpen = inject<Ref<boolean>>('categoryRPOpen')!

// data
const nowTab = ref<CategoryType>('支出')
</script>

<template>
  <RightPanel @RPOpen="categoryRPOpen = false">
    <template #title>
      <h5 class="text-dark mb-3">
        記帳類別
        <CreateCategoryModalButton />
      </h5>
    </template>
    <template #content>
      <ul class="nav nav-tabs mb-2">
        <li class="nav-item">
          <span class="nav-link" :class="{ active: nowTab === '支出' }" @click="nowTab = '支出'">支出</span>
        </li>
        <li class="nav-item">
          <span class="nav-link" :class="{ active: nowTab === '收入' }" @click="nowTab = '收入'">收入</span>
        </li>
      </ul>
      <div class="scroll">
        <ul class="list-group">
          <template v-for="(category, index) in categories" :key="index">
            <li class="list-group-item d-flex mb-2 border" v-if="category.type === nowTab">
              <div class="col-2">
                <i :class="`${category.icon} fa-2x text-warning`"></i>
              </div>
              <div class="col-10">
                <div class="text-nowrap text-start ms-3">
                  <span class="align-middle">{{ category.name }}</span>
                  <EditCategoryModalButton :category="category" class="align-middle" />
                  <DeleteCategoryModalButton class="ms-2 align-middle" :category="category" />
                </div>
              </div>
            </li>
          </template>
        </ul>
      </div>
    </template>
  </RightPanel>
</template>
<style scoped>
.scroll {
  overflow-y: auto;
}

.nav-link {
  cursor: pointer;
}
</style>
