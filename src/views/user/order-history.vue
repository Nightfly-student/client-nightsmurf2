<template>
  <div>
    <header class="text-light">
      <div class="container-xl">
        <div class="row">
          <div class="col-xl-12 col-sm-12 col-12">
            <h1 class="pt-3 text-center">Order History</h1>
          </div>
        </div>
      </div>
    </header>
    <div v-if="mounted" class="container-xl">
      <div v-if="orders.length != 0" class="divider-top">
        <p class="text-light">Your Order History</p>
        <table class="table table-dark">
          <thead>
            <tr>
              <th scope="col">Order Number</th>
              <th scope="col">Price</th>
              <th scope="col">Status</th>
              <th scope="col">Order Date</th>
              <th scope="col">Check Order</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in orders" :key="order._id">
              <th scope="row" class="align-middle">{{ order._id }}</th>
              <td class="align-middle">&euro;{{ order.total.toFixed(2) }}</td>
              <td class="align-middle">{{ order.paymentStatus }}</td>
              <td class="align-middle">
                {{ checkDate(order.createdAt) }}
              </td>
              <td class="align-middle">
                <button
                  class="btn btn-primary"
                  @click="$router.push(`/order/${order._id}`)"
                >
                  Order
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else class="divider-top">
        <h1 class="text-center">No Orders Found</h1>
      </div>
    </div>
    <div v-else class="text-center mt-5">
      <div class="spinner-border text-primary" role="status">
        <span class="sr-only"></span>
      </div>
      <p class="text-light ps-2">Loading...</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import { authHeader } from "../../helpers/authHeader";
export default {
  name: "OrderHistory",
  data() {
    return {
      orders: [],
      mounted: false,
    };
  },
  methods: {
    getOrders() {
      axios
        .get("/api/orders/history", {
          headers: authHeader(),
        })
        .then((res) => {
          this.orders = res.data;
          this.mounted = true;
        })
        .catch((err) => {
          console.log(err);
          this.mounted = true;
        });
    },
    checkDate(date) {
      var newDate = moment.utc(date).format();
      return moment.utc(newDate).local().format("YYYY-MM-DD HH:mm");
    },
  },
  mounted() {
    this.getOrders();
  },
};
</script>

<style></style>
