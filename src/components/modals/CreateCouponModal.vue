<template>
  <div class="text-light">
    <div class="modal fade" :id="'CreateCoupon'">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5>Create Coupon</h5>
            <button
              type="button"
              class="btn-close btn-close-white"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body py-4 mx-3">
            <div>
              <input
                v-model="coupon"
                placeholder="Coupon name"
                type="text"
                class="form-control mb-2"
              />
              <button
                data-mdb-dismiss="modal"
                aria-label="Close"
                @click="addCoupon"
                class="btn btn-primary"
              >
                Create Coupon
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
  name: "CreateCouponModal",
  props: {
    affiliate: Object,
  },
  data() {
    return {
      coupon: "",
    };
  },
  methods: {
    addCoupon() {
      axios
        .put(`/api/affiliates/coupon`, {
          name: this.coupon,
          user: this.affiliate.user,
        })
        .then((res) => {
          this.affiliate.coupon = res.data.coupon;
        });
    },
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
