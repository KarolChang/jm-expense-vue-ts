<script setup lang="ts">
import { ref, provide } from 'vue'
import userAPI from '@/apis/user'
import { Permission } from '@/models/index'
import Spinner from '@/components/Spinner.vue'
import CreatePermissionModalButton from '@/components/ModalButton/Permission/CreatePermissionModalButton.vue'
import EditPermissionModalButton from '@/components/ModalButton/Permission/EditPermissionModalButton.vue'
import DeletePermissionModalButton from '@/components/ModalButton/Permission/DeletePermissionModalButton.vue'

// data
const isLoading = ref<boolean>(true)
const permissions = ref<Permission[]>([])

// methods
const fetchPermissions = async function () {
  try {
    const { data } = await userAPI.permission.getAll()
    permissions.value = data.data
    isLoading.value = false
  } catch (error) {
    console.error('error', error)
  }
}

// created
fetchPermissions()

// provide
provide('refetchPermissions', fetchPermissions)
</script>
<template>
  <div v-if="!isLoading">
    <div class="d-flex my-3">
      <CreatePermissionModalButton />
    </div>
    <table class="table table-striped table-danger table-hover" v-if="permissions.length">
      <thead>
        <tr>
          <!-- <th scope="col">#</th> -->
          <th scope="col">ID</th>
          <th scope="col">ACTION</th>
          <th scope="col">ITEM</th>
          <th scope="col">DESCRIPTION</th>
          <th scope="col">#</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(permission, index) in permissions" :key="index">
          <!-- <td>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked />
              <label class="form-check-label" for="flexCheckChecked"></label>
            </div>
          </td> -->
          <td>{{ permission.id }}</td>
          <td>{{ permission.action }}</td>
          <td>{{ permission.item }}</td>
          <td>{{ permission.description }}</td>
          <td>
            <EditPermissionModalButton :permission="permission" />
            <DeletePermissionModalButton :permission="permission" class="ms-2" />
          </td>
          <!-- <td> -->
          <!-- <DeletePermissionModalButton :permission="permission" /> -->
          <!-- </td> -->
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
