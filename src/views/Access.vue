<script setup lang="ts">
import { ref } from 'vue'
import userAPI from '@/apis/user'
import { Role, Permission } from '@/models/index'
import Spinner from '@/components/Spinner.vue'
// import CreateRoleModalButton from '@/components/ModalButton/Role/CreateRoleModalButton.vue'
// import EditRoleModalButton from '@/components/ModalButton/Role/EditRoleModalButton.vue'
// import DeleteRoleModalButton from '@/components/ModalButton/Role/DeleteRoleModalButton.vue'
import { useRoute } from 'vue-router'
const route = useRoute()

// data
const isLoading = ref<boolean>(true)
const editMode = ref<boolean>(false)
const role = ref<Role>(new Role())
const permissions = ref<Permission[]>([])
const editPermissionId = ref<number[]>([])

// methods
const fetchRole = async function () {
  try {
    const { data } = await userAPI.role.getOne(Number(route.params.id))
    role.value = data.data
    isLoading.value = false
  } catch (error) {
    console.error('error', error)
  }
}

const fetchPermissions = async function () {
  try {
    const { data } = await userAPI.permission.getAll()
    permissions.value = data.data
    isLoading.value = false
  } catch (error) {
    console.error('error', error)
  }
}

const startEditBtn = () => {
  editMode.value = true
  editPermissionId.value = role.value.Permissions.map((p) => p.id)
}

const checkboxClick = (id: number) => {
  if (editMode.value) {
    if (!editPermissionId.value.includes(id)) {
      editPermissionId.value.push(id)
    } else {
      const index = editPermissionId.value.findIndex((pid) => pid === id)
      editPermissionId.value.splice(index, 1)
    }
  }
}

const editPermissions = () => {
  editMode.value = false
}

// created
fetchRole()
fetchPermissions()

// provide
// provide('refetchRoles', fetchRoles)
</script>
<template>
  <div v-if="!isLoading">
    {{ editPermissionId }}
    <div class="d-flex my-3">
      <!-- <CreateRoleModalButton /> -->
      <button v-if="!editMode" @click="startEditBtn" class="btn btn-primary">開始編輯</button>
      <template v-else>
        <button @click="editMode = false" class="btn btn-secondary me-3">取消編輯</button>
        <button @click="editPermissions" class="btn btn-warning">確定編輯</button>
      </template>
    </div>
    <table class="table table-striped table-danger table-hover" v-if="permissions.length">
      <thead>
        <tr>
          <th scope="col" v-if="editMode">#</th>
          <th scope="col">ID</th>
          <th scope="col">ACTION</th>
          <th scope="col">ITEM</th>
          <th scope="col">DESCRIPTION</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(permission, index) in permissions" :key="index" @click="checkboxClick(permission.id)">
          <td v-if="editMode">
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckChecked"
                :checked="editPermissionId.includes(permission.id)"
              />
              <label class="form-check-label" for="flexCheckChecked"></label>
            </div>
          </td>
          <td>{{ permission.id }}</td>
          <td>{{ permission.action }}</td>
          <td>{{ permission.item }}</td>
          <td>{{ permission.description }}</td>
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
