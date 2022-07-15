<template>
  <div class="text-light">
    <h1 class="text-center">Admin Dashboard</h1>
    <div class="row g-4">
      <div class="col-12 col-md-9">
        <div class="card p-3">
          <h2 class="text-center">Revenue</h2>
          <RevenueChart />
        </div>
      </div>
      <div class="col-12 col-md-3">
        <div class="card p-3">
          <h2 class="text-center">This Month</h2>
          <p v-if="mounted" class="text-center fs-2">
            &euro;{{ calculateRevenue() }}
          </p>
        </div>
      </div>
      <div class="col-12" v-if="availableAffiliate">
        <div class="card p-3">
          <h2 class="text-center">Affiliate Requests</h2>
          <div class="overflow-auto w-100">
            <table class="table text-light">
              <thead>
                <tr>
                  <th scope="col">Email</th>
                  <th scope="col">Name</th>
                  <th scope="col">Platform</th>
                  <th scope="col">Traffic</th>
                  <th scope="col">Discord</th>
                  <th scope="col">Accept</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="a in affiliates" :key="a._id">
                  <th scope="row">{{ a.email }}</th>
                  <td>{{ a.name }}</td>
                  <td>{{ a.platform }}</td>
                  <td>{{ a.traffic }}</td>
                  <td>{{ a.discord }}</td>
                  <td>
                    <button @click="acceptAffiliate(a._id)" class="btn btn-primary me-2">
                      Accept
                    </button>
                    <button @click="declineAffiliate(a._id)" class="btn btn-danger">Decline</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
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
      affiliates: [],
      availableAffiliate: false,
    };
  },
  methods: {
    getRevenueData() {
      axios
        .get("/api/orders/revenue", { headers: authHeader() })
        .then((res) => {
          var date = moment.now();
          var monthNumber = moment(date).format("M");
          if (res.data[monthNumber]) {
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
    getAffiliateRequests() {
      axios
        .get("/api/submissions")
        .then((res) => {
          this.affiliates = res.data;
          this.availableAffiliate = true;
        })
        .catch((err) => {
          this.availableAffiliate = false;
        });
    },
    declineAffiliate(id) {
      axios.delete(`/api/submissions/${id}`).then((res) => {
        this.$notify({
          text: res.data.message,
          type: "success",
        });
        var findIndex = this.affiliates.findIndex(
          (affiliates) => affiliates._id === id
        );
        this.affiliates.splice(findIndex, 1);
      });
    },
    acceptAffiliate(id) {
      axios.put(`/api/submissions/${id}`, { accepted: true }).then((res) => {
        this.$notify({
          text: res.data.message,
          type: "success",
        });
        var findIndex = this.affiliates.findIndex(
          (affiliates) => affiliates._id === id
        );
        this.affiliates.splice(findIndex, 1);
      });
    },
  },
  mounted() {
    this.getRevenueData();
    this.getAffiliateRequests();
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
