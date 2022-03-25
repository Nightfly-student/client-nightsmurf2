<template>
  <div>
      <h1 class="text-center text-light">Orders</h1>
    <select
      class="form-select bg-dark text-light w-25 float-end my-2"
      aria-label="Default select example"
      @change="sort($event.target.value)"
    >
      <option selected value="1">Completed</option>
      <option value="2">Pending</option>
      <option value="3">All</option>
    </select>
    <div class="overflow-auto w-100">
      <table class="table table-dark">
        <thead>
          <tr>
            <th scope="col">Order Id</th>
            <th scope="col">Email</th>
            <th scope="col">Total</th>
            <th scope="col">Date</th>
            <th scope="col">Status</th>
            <th scope="col">Check</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders" :key="order._id">
            <th class="align-middle" scope="row">{{ order._id }}</th>
            <td class="align-middle">{{ order.email }}</td>
            <td class="align-middle">&euro;{{ order.total }}</td>
            <td class="align-middle">{{ order.updatedAt }}</td>
            <td class="align-middle">{{ order.paymentStatus }}</td>
            <td class="align-middle">
              <button class="btn btn-primary">Info</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { authHeader } from "../../helpers/authHeader";
import axios from "axios";
export default {
  name: "AdminOrder",
  data() {
    return {
      orders: [],
      holdOrders: [],
    };
  },
  methods: {
    getOrders() {
      axios
        .get("/api/orders/", { headers: authHeader() })
        .then((res) => {
          this.holdOrders = res.data;
          this.orders = res.data.filter(
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
