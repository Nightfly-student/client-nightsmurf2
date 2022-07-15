<template>
  <div class="mt-5 pt-5 container-xl">
    <h2 class="text-light">Affiliate Dashboard</h2>
    <div v-if="mounted" class="row text-light g-4">
      <div class="col-12 col-md-4">
        <div class="card p-3">
          <p>Your Coupon</p>
          <h2 v-if="affiliate.coupon">{{ affiliate.coupon }}</h2>
          <div v-else>
            <button
              :data-bs-target="'#CreateCoupon'"
              data-bs-toggle="modal"
              class="btn btn-primary mt-1 mb-1"
            >
              Create Coupon
            </button>
            <CreateCouponModal :affiliate="affiliate" />
          </div>
          <p class="pt-2">{{ affiliate.percentage }}% off on all accounts</p>
        </div>
      </div>
      <div class="col-12 col-md-4">
        <div class="card p-3">
          <p>Products Sold</p>
          <div v-if="completedMounted">
            <h2>{{ completedOrders }}</h2>
            <p class="pt-2">&euro;{{ earned.toFixed(2) }} earned</p>
          </div>
          <div v-else>
            <h2>0</h2>
            <p class="pt-2">&euro;0.00 earned</p>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-4">
        <div class="card p-3">
          <p>Available Payout</p>
          <h2>&euro;{{ affiliate.available.toFixed(2) }}</h2>
          <p class="pt-2">Payouts go through Discord</p>
        </div>
      </div>
      <div class="col-12 col-md-8">
        <div class="card p-3">
          <p v-if="ordersMounted">Orders ({{ total }})</p>
          <p v-else>Orders (0)</p>
          <div v-if="ordersMounted && ordersCount != 0">
            <table class="table text-light">
              <thead>
                <tr>
                  <th scope="col">Product</th>
                  <th scope="col">Product Name</th>
                  <th scope="col">Order Date</th>
                  <th scope="col">Earned</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="order in orders" :key="order._id">
                  <th scope="row" class="align-middle">
                    <img
                      src="https://res.cloudinary.com/droomsocial/image/upload/v1647779609/logowithout_luxbdf.png"
                      height="75"
                      width="75"
                    />
                  </th>
                  <td class="align-middle">{{ order.product.title }}</td>
                  <td class="align-middle">
                    <TimeFormatTable :order="order" />
                  </td>
                  <td
                    class="align-middle"
                    v-if="order.paymentStatus === 'completed'"
                  >
                    &euro;{{
                      (
                        ((order.total - ((order.total / 100 * 21) + 1)) / 100) *
                        affiliate.percentage
                      ).toFixed(2)
                    }}
                  </td>
                  <td class="align-middle" v-else>&euro;0.00</td>
                  <td class="align-middle">{{ order.paymentStatus }}</td>
                </tr>
              </tbody>
            </table>
            <button
              class="btn btn-primary"
              @click="getAffiliateOrders"
              v-if="page < pages"
            >
              Load More
            </button>
          </div>
          <div v-if="!ordersMounted" class="text-center">
            <div class="spinner-border text-primary mt-4" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
          <div v-if="ordersMounted && ordersCount === 0">
            <p>No Orders Found :(</p>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-4">
        <div class="card p-3">
          <p>Your Url</p>
          <code v-if="affiliate.url"
            >https://nightsmurf.com/r/{{ affiliate.url }}</code
          >
          <div v-else>
            <button
              :data-bs-target="'#CreateUrl'"
              data-bs-toggle="modal"
              class="btn btn-primary mt-1 mb-1"
            >
              Create redirect url
            </button>
            <CreateUrlModal :affiliate="affiliate" />
          </div>
          <p class="pt-2">Send this url to your crowd</p>
        </div>
        <div class="card p-3 mt-4">
          <p>Your Widget</p>
          <h2>Banner Here</h2>
          <p class="pt-2">Use this widget for promotions.</p>
        </div>
      </div>
    </div>
    <div v-else class="pt-5 mt-5 text-center">
      <div class="spinner-border text-primary mt-5" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p class="text-light">Loading Dashboard...</p>
    </div>
  </div>
</template>

<script>
import CreateCouponModal from "../../components/modals/CreateCouponModal.vue";
import CreateUrlModal from "../../components/modals/CreateUrlModal.vue";
import TimeFormatTable from "../../components/dates/TimeFormatTable.vue";

import axios from "axios";
export default {
  name: "AffiliateDashboard",
  data() {
    return {
      affiliate: {},
      mounted: false,
      ordersMounted: false,
      orders: [],
      sold: 0,
      earned: 0,
      limit: 5,
      page: 0,
      pages: 0,
      total: 0,
      completedOrders: 0,
      completedMounted: false,
    };
  },
  components: {
    CreateCouponModal,
    CreateUrlModal,
    TimeFormatTable,
  },
  methods: {
    getAffiliate() {
      axios.get(`/api/affiliates/${this.$store.getters.getId}`).then((res) => {
        this.affiliate = res.data;
        this.mounted = true;
        this.getAffiliateOrders();
        this.getProductsSold();
      });
    },
    getProductsSold() {
      axios
        .get(`/api/affiliates/products/${this.affiliate._id}`)
        .then((res) => {
          this.completedOrders = res.data.completedOrders;
          this.earned = res.data.earnings;
          this.completedMounted = true;
        })
        .catch(() => {
          this.completedMounted = true;
        });
    },
    getAffiliateOrders() {
      this.page++;
      axios
        .get(
          `/api/affiliates/orders/${this.affiliate._id}?limit=${this.limit}&page=${this.page}`
        )
        .then((res) => {
          res.data.affiliateOrders.forEach((a) => {
            this.orders.push(a);
          });
          this.pages = res.data.pages;
          this.ordersMounted = true;
          this.total = res.data.orders;
        })
        .catch((err) => {
          this.ordersMounted = true;
        });
    },
  },
  created() {
    this.getAffiliate();
  },
};
</script>

<style scoped>
.card {
  background: #161616;
}
</style>
