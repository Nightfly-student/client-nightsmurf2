<template>
  <div>
    <h1 class="text-center text-light">Users</h1>
    <p class="text-light fs-6">Total: {{ total }}</p>
    <div class="overflow-auto w-100">
      <table class="table table-dark">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">CreatedAt</th>
            <th scope="col">Edit</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user._id">
            <th class="align-middle" scope="row">{{ user.name }}</th>
            <td class="align-middle">{{ user.email }}</td>
            <TimeFormatTable :order="user" />
            <td class="align-middle">
                            <button
                class="btn btn-primary"
                :data-bs-target="'#UserModal' + user._id"
                data-bs-toggle="modal"
              >
                Edit
              </button>
              <UserModal :availableRoles="availableRoles" :user="user" />
            </td>
          </tr>
        </tbody>
      </table>
      <button
        v-if="!(page >= pages)"
        @click="getAllUsers"
        class="btn btn-primary"
      >
        Load More
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import TimeFormatTable from "../dates/TimeFormatTable.vue";
import UserModal from "../modals/UserModal.vue";
export default {
  name: "AdminUsers",
  components: {
    UserModal,
    TimeFormatTable,
  },
  data() {
    return {
      users: [],
      page: 0,
      limit: 10,
      pages: 1,
      total: 0,
      availableRoles: [],
    };
  },
  methods: {
    getAllUsers() {
      this.page++;
      axios
        .get(`/api/users/?limit=${this.limit}&page=${this.page}`)
        .then((res) => {
          this.pages = res.data.pages;
          this.total = res.data.total;
          res.data.docs.forEach((user) => {
            console.log(user);
            this.users.push(user);
          });
        });
    },
        getRoles() {
      axios.get("/api/roles").then((res) => {
        this.availableRoles = res.data;
      });
    },
  },
  mounted() {
    this.getAllUsers();
        this.getRoles();
  },
};
</script>

<style></style>
