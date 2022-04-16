<script setup lang="ts">
import { ref, provide } from 'vue'
import userAPI from '@/apis/user'
import { Role } from '@/models/index'
import Spinner from '@/components/Spinner.vue'
import CreateRoleModalButton from '@/components/ModalButton/Role/CreateRoleModalButton.vue'
import EditRoleModalButton from '@/components/ModalButton/Role/EditRoleModalButton.vue'
import DeleteRoleModalButton from '@/components/ModalButton/Role/DeleteRoleModalButton.vue'

// data
const isLoading = ref<boolean>(true)
const roles = ref<Role[]>([])

// methods
const fetchRoles = async function () {
  try {
    const { data } = await userAPI.role.getAll()
    roles.value = data.data
    isLoading.value = false
  } catch (error) {
    console.error('error', error)
  }
}

// created
fetchRoles()

// provide
provide('refetchRoles', fetchRoles)
</script>
<template>
  <div v-if="!isLoading">
    <div class="d-flex my-3">
      <CreateRoleModalButton />
    </div>
    <table class="table table-striped table-danger table-hover" v-if="roles.length">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">中文名稱</th>
          <th scope="col">英文名稱</th>
          <th scope="col">啟用</th>
          <th scope="col">#</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(role, index) in roles" :key="index">
          <td>{{ role.id }}</td>
          <td>{{ role.name }}</td>
          <td>{{ role.name_en }}</td>
          <td>{{ role.deletedAt === null ? 'V' : 'X' }}</td>
          <!-- <td>
            <router-link :to="{ name: 'Admin-Role-Access', params: { id: role.id } }">
              <i class="fa-solid fa-circle-question"></i
            ></router-link>
            <EditRoleModalButton :role="role" class="ms-2" />
            <DeleteRoleModalButton :role="role" class="ms-2" />
          </td> -->
        </tr>
      </tbody>
    </table>
    <img
      v-else
      class="img-fluid"
      src="https://stickershop.line-scdn.net/stickershop/v1/sticker/208430466/iPhone/sticker_animation@2x.png"
      alt="img"
    />
  </div>
  <Spinner v-else />
</template>
