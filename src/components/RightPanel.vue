<script setup lang="ts">
import { ref } from 'vue'
import expenseAPI from '../apis/expense'
import { Category } from '../models/Category'
import CreateCategoryModalButton from '@/components/modalButton/CreateCategoryModalButton.vue'
import DeleteCategoryModalButton from '@/components/modalButton/DeleteCategoryModalButton.vue'
import EditCategoryModalButton from '@/components/modalButton/EditCategoryModalButton.vue'

// data
const isLoading = ref<boolean>(false)
const categories = ref<Category[]>([])

// methods
const fetchCategories = async () => {
  try {
    const { data } = await expenseAPI.category.getAll()
    categories.value = data.filter((item: Category) => item.deletedAt === null)
    isLoading.value = false
  } catch (error) {
    console.error('error', error)
  }
}

// created
fetchCategories()
</script>

<template>
  <div id="panel" v-if="!isLoading">
    <div class="d-flex flex-column flex-shrink-0 p-3 text-white bg-light" style="width: 250px; height: 100vh">
      <h5 class="text-dark mb-3">
        記帳類別
        <CreateCategoryModalButton :refetch="fetchCategories" />
      </h5>
      <div class="scroll">
        <ul class="list-group">
          <li class="list-group-item d-flex mb-2 border" v-for="(category, index) in categories" :key="index">
            <i :class="`${category.icon} fa-2x text-warning me-3`"></i>
            <div class="text-nowrap">
              <span>{{ category.name }}</span>
              <EditCategoryModalButton :refetch="fetchCategories" :category="category" />
              <DeleteCategoryModalButton class="ms-2" :refetch="fetchCategories" :category="category" />
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<style scoped>
#panel {
  position: fixed;
  top: 0;
  right: 0;
}

i[class~='fa-trash']:hover {
  color: rgb(226, 19, 19);
  cursor: pointer;
}

.scroll {
  overflow-y: auto;
}
</style>
