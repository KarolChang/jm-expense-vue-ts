<script setup lang="ts">
import { ref, inject, Ref, watch } from 'vue'
import { Category } from '@/models'

// data
const allChosen = ref<boolean>(true)

// props
const props = defineProps<{
  allCategories: number[]
}>()

// inject
const categoriesByType = inject<Ref<Category[]>>('categoriesByType')!
const categoryFilters = inject<Ref<number[]>>('categoryFilters')!

// methods
const handleCheckboxClick = (categoryId: number) => {
  if (!categoryFilters.value.includes(categoryId)) {
    categoryFilters.value.push(categoryId)
  } else {
    categoryFilters.value.forEach((id: number, index) => {
      if (categoryId === id) {
        categoryFilters.value.splice(index, 1)
        return
      }
    })
  }
}

// watch
watch(allChosen, () => {
  if (allChosen.value) {
    categoryFilters.value = props.allCategories
  } else {
    categoryFilters.value = []
  }
})
</script>

<template>
  <div class="bg-secondary me-3 p-3">
    <div class="form-check form-switch mb-4">
      <label class="form-check-label" for="flexSwitchCheckChecked">全選</label>
      <input
        class="form-check-input"
        type="checkbox"
        role="switch"
        id="flexSwitchCheckChecked"
        v-model="allChosen"
      />
    </div>
    <div class="form-check mb-2" v-for="(category, index) in categoriesByType" :key="index">
      <input
        class="form-check-input"
        type="checkbox"
        :value="category.id"
        :id="category.name"
        :checked="categoryFilters.includes(category.id)"
        @click="handleCheckboxClick(category.id)"
      />
      <label class="form-check-label" :for="category.name">{{ category.name }}</label>
    </div>
  </div>
</template>
