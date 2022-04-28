<template>
  <div class="text-light">
    <h1 class="text-center">Admin Dashboard</h1>
    <div class="row">
      <div class="col-9">
        <div class="card p-3">
          <h2 class="text-center">Revenue</h2>
          <RevenueChart />
        </div>
      </div>
      <div class="col-3">
        <div class="card p-3">
          <h2 class="text-center">This Month</h2>
          <p v-if="mounted" class="text-center fs-2">
            &euro;{{ calculateRevenue() }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import RevenueChart from "../charts/RevenueChart.vue";
import { authHeader } from "../../helpers/authHeader";
import moment from "moment";
export default {
  name: "AdminDashboard",
  components: {
    RevenueChart,
  },
  data() {
    return {
      revenueMonth: [],
      mounted: false,
    };
  },
  methods: {
    getRevenueData() {
      axios
        .get("/api/orders/revenue", { headers: authHeader() })
        .then((res) => {
          var date = moment.now();
          var monthNumber = moment(date).format("M");
          if(res.data[monthNumber]) {
          this.revenueMonth = res.data[monthNumber];
          }
          this.mounted = true;
        });
    },
    calculateRevenue() {
      var revenue = 0;
      if (this.revenueMonth != null) {
        this.revenueMonth.forEach((order) => {
          revenue += order.total;
        });
        return revenue.toFixed(2);
      }
    },
  },
  mounted() {
    this.getRevenueData();
  },
};
</script>

<style scoped>
.card {
  border: none !important;
  background: #161616;
  border-radius: 5px;
}
</style>
