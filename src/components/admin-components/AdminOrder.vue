<template>
  <div>
    <h1 class="text-center text-light">Orders</h1>
    <div class="row">
      <div class="col">
        <p class="text-white">Total Orders: {{ total }}</p>
      </div>
      <div class="col">
        <select
          class="form-select bg-dark text-light w-25 float-end my-2"
          aria-label="Default select example"
          @change="sort($event.target.value)"
        >
          <option selected value="1">Completed</option>
          <option value="2">Pending</option>
          <option value="3">All</option>
        </select>
      </div>
    </div>
    <div class="overflow-auto w-100">
      <table class="table table-dark">
        <thead>
          <tr>
            <th scope="col">Order Id</th>
            <th scope="col">Email</th>
            <th scope="col">Total</th>
            <th scope="col">Date</th>
            <th scope="col">Method</th>
            <th scope="col">Status</th>
            <th scope="col">Check</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders" :key="order._id">
            <th class="align-middle" scope="row">Unauthorized</th>
            <td class="align-middle">{{ order.email }}</td>
            <td class="align-middle">&euro;{{ order.total }}</td>
            <TimeFormatTable :order="order" />
            <td class="align-middle">{{ order.paymentMethod }}</td>
            <td class="align-middle">{{ order.paymentStatus }}</td>
            <td class="align-middle">
              <router-link v-if="this.$store.getters.isAdmin" :to="`/order/${order._id}`"  class="btn btn-primary">Info</router-link>
            </td>
          </tr>
        </tbody>
      </table>
      <button @click="getOrders" class="btn btn-primary">Load More</button>
    </div>
  </div>
</template>

<script>
import { authHeader } from "../../helpers/authHeader";
import TimeFormatTable from "../dates/TimeFormatTable.vue";
import axios from "axios";
export default {
  name: "AdminOrder",
  components: {
    TimeFormatTable,
  },
  data() {
    return {
      orders: [],
      holdOrders: [],
      total: 0,
      limit: 20,
      page: 0,
    };
  },
  methods: {
    getOrders() {
      this.page++;
      axios
        .get(`/api/orders/?limit=${this.limit}&page=${this.page}`, {
          headers: authHeader(),
        })
        .then((res) => {
          res.data.docs.forEach((doc) => {
            this.holdOrders.push(doc);
          });

          this.total = res.data.total;
          console.log(this.holdOrders);
          this.orders = this.holdOrders.filter(
            (order) => order.paymentStatus === "completed"
          );
        })
        .catch((err) => {
          console.log(err);
        });
    },
    sort(value) {
      if (value === "1") {
        this.orders = this.holdOrders.filter(
          (order) => order.paymentStatus === "completed"
        );
      }
      if (value === "2") {
        this.orders = this.holdOrders.filter(
          (order) => order.paymentStatus === "open"
        );
      }
      if (value === "3") {
        this.orders = this.holdOrders;
      }
    },
  },
  mounted() {
    this.getOrders();
  },
};
</script>

<style scoped>
@media (max-width: 540px) {
  .w-25 {
    width: 50% !important;
  }
}
</style>
