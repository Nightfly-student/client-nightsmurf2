<template>
  <div>
    <h1 class="text-center text-light">Affiliate</h1>
    <p class="text-light fs-6">Total: {{ count }}</p>
    <div class="overflow-auto w-100">
      <table class="table table-dark">
        <thead>
          <tr class="text-center">
            <th scope="col">Name</th>
            <th scope="col">Percentage</th>
            <th scope="col">Coupon</th>
            <th scope="col">Url</th>
            <th scope="col">Available</th>
            <th scope="col">Paid Out</th>
          </tr>
        </thead>
        <tbody class="text-center">
          <tr v-for="a in affiliates" :key="a._id">
            <td class="align-middle" scope="row">{{ a.user }}</td>
            <td class="align-middle">{{ a.percentage }}%</td>
            <td class="align-middle">{{ a.coupon }}</td>
            <td class="align-middle">/r/{{ a.url }}</td>
            <td class="align-middle">&euro;{{ a.available.toFixed(2) }}</td>
            <td class="align-middle">
              <button class="btn btn-primary" @click="PostPaid(a._id)">
                Paid Out
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <button
        v-if="!(page >= pages)"
        @click="getAffiliates"
        class="btn btn-primary"
      >
        Load More
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "AdminAffiliate",
  data() {
    return {
      limit: 10,
      page: 0,
      count: 0,
      pages: 1,
      affiliates: [],
    };
  },
  methods: {
    getAffiliates() {
      this.page++;
      axios
        .get(`/api/affiliates?limit=${this.limit}&page=${this.page}`)
        .then((res) => {
          res.data.docs.forEach((a) => {
            this.affiliates.push(a);
            this.pages = res.data.pages;
            this.count = res.data.total;
          });
        });
    },
    PostPaid(id) {
      axios
        .put(`/api/affiliates/${id}`)
        .then((res) => {
          this.$notify({
            text: res.data.message,
            type: "success",
          });
        })
        .catch((err) => {
          this.$notify({
            text: err.response.data.message,
            type: "error",
          });
        });
    },
  },
  mounted() {
    this.getAffiliates();
  },
};
</script>

<style></style>
