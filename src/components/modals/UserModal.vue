<template>
  <div class="text-light">
    <div class="modal fade" :id="'UserModal' + user._id">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5>User: {{ user.name }}</h5>
            <button
              type="button"
              class="btn-close btn-close-white"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body py-4 mx-3">
            <div>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Role</label>
                <select
                  v-model="selectedRole"
                  class="form-select"
                  aria-label="Default select example"
                >
                  <option value="user">user</option>
                  <option
                    v-for="role in availableRoles"
                    :key="role._id"
                    :value="role._id"
                  >
                    {{ role.name }}
                  </option>
                </select>
              </div>
              <button @click="addRole" class="btn btn-primary">
                Add User Role
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "UserModal",
  props: {
    user: Object,
    availableRoles: [],
  },
  data() {
    return {
      selectedRole: "",
    };
  },
  methods: {
    getUserRole() {
      axios
        .get(`/api/roles/${this.user._id}`)
        .then((res) => {
          this.selectedRole = res.data.role;
        })
        .catch(() => {
          this.selectedRole = "user";
        });
    },
    addRole() {
        axios.post("/api/roles/assign", {user: this.user._id, role: this.selectedRole }).then((res) => {
            console.log(res.data);
        })
    }
  },
  mounted() {
    this.getUserRole();
  },
};
</script>

<style scoped>
.modal {
  background: #16161642;
}
.modal-content {
  background: #161616;
}
</style>
