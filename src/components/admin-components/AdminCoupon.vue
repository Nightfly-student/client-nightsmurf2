<template>
  <div>
    <h1 class="text-center text-light">Coupons</h1>
    <div class="overflow-auto w-100">
      <table class="table table-dark" v-if="coupons.length != 0">
        <thead>
          <tr>
            <th scope="col">Coupon Id</th>
            <th scope="col">Coupon Code</th>
            <th scope="col">Discount Type</th>
            <th scope="col">Discount Amount</th>
            <th scope="col">Limit</th>
            <th scope="col">Expire Date</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="coupon in coupons" :key="coupon._id">
            <th class="align-middle" scope="row">{{ coupon._id }}</th>
            <td class="align-middle">{{ coupon.coupon }}</td>
            <td class="align-middle">{{ coupon.discount }}</td>
            <td class="align-middle">{{ coupon.portion }}</td>
            <td class="align-middle">{{ coupon.limit }}</td>
            <td class="align-middle">{{ coupon.expireDate }}</td>
            <td class="align-middle">
              <button @click="deleteCoupon(coupon._id)" class="btn btn-danger">
                Delete Coupon
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="">
      <div class="text-light">
        <fieldset>
          <legend>Add Coupon</legend>
          <div class="mb-3">
            <div class="form-check ps-0">
              <label for="disabledSelect" class="form-label">Coupon Name</label
              ><br />
              <input
                v-model="createCoupon.name"
                class="form-input"
                type="text"
                id="disabledFieldsetCheck"
              />
            </div>
          </div>
          <div class="mb-3">
            <div class="form-check ps-0">
              <label for="disabledSelect" class="form-label">Coupon Limit</label
              ><br />
              <input
                v-model="createCoupon.limit"
                class="form-input"
                type="text"
                id="disabledFieldsetCheck"
              />
            </div>
          </div>
          <div class="mb-3">
            <div class="form-check ps-0">
              <label for="disabledSelect" class="form-label"
                >Discount Amount</label
              ><br />
              <input
                v-model="createCoupon.amount"
                class="form-input"
                type="text"
                id="disabledFieldsetCheck"
              />
            </div>
          </div>
          <div class="mb-3">
            <div class="form-check ps-0">
              <label for="disabledSelect" class="form-label"
                >Discount Amount</label
              ><br />
              <input
                v-model="createCoupon.amount"
                class="form-input"
                type="text"
                id="disabledFieldsetCheck"
              />
            </div>
          </div>
          <div class="mb-3">
            <div class="form-check ps-0">
              <label for="disabledSelect" class="form-label">Expire Date</label
              ><br />
              <Datepicker
                class="text-light"
                :minDate="new Date()"
                v-model="date"
                ref="datepicker"
              ></Datepicker>
            </div>
          </div>
          <div class="mb-3">
            <label for="disabledSelect" class="form-label">Discount Type</label>
            <select
              v-model="createCoupon.type"
              id="disabledSelect"
              class="form-select w-25"
            >
              <option value="%">Percentage Based</option>
              <option value="A">Price Based</option>
            </select>
          </div>
          <button @click="cCoupon" class="btn btn-primary">Add Coupon</button>
        </fieldset>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { ref } from "vue";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { authHeader } from "../../helpers/authHeader";
export default {
  name: "AdminCoupon",
  data() {
    return {
      coupons: [],
      createCoupon: {
        name: "",
        limit: 0,
        amount: 0,
        type: "%",
        date: null,
      },
    };
  },
  components: {
    Datepicker,
  },
  methods: {
    getCoupons() {
      axios
        .get(`/api/coupons/`, {
          headers: authHeader(),
        })
        .then((res) => {
          console.log(res.data);
          this.coupons = res.data;
        })
        .catch((err) => {
          this.$notify({
            text: err.data.response.message,
            type: "error",
          });
        });
    },
    deleteCoupon(id) {
      axios
        .delete(`/api/coupons/${id}`, {
          headers: authHeader(),
        })
        .then((res) => {
          var findIndex = this.coupons.findIndex(
            (coupons) => coupons._id === id
          );
          this.coupons.splice(findIndex, 1);
          alert("Deleted Coupon");
        });
    },
    cCoupon() {
      this.createCoupon.date = this.date;
      console.log(this.createCoupon);
      axios
        .post(`/api/coupons/createCoupon`, this.createCoupon, {
          headers: authHeader(),
        })
        .then((res) => {
          this.coupons.push({
            _id: res.data._id,
            coupon: res.data.coupon.toLowerCase(),
            portion: res.data.portion,
            discount: res.data.discount,
            limit: res.data.limit,
          });
        })
        .catch((err) => {
          this.$notify({
            text: err.data.response.message,
            type: "error",
          });
        });
    },
  },
  mounted() {
    this.getCoupons();
  },
  setup() {
    const date = ref();
    const datepicker = ref(null);

    const yourCustomMethod = () => {
      if (datepicker) {
        // Close the menu programmatically
        datepicker.value.closeMenu();
      }
    };

    return {
      date,
    };
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
