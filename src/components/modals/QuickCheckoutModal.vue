<template>
  <div class="text-light">
    <div class="modal fade" :id="'CheckoutModal' + product._id">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-body py-4 mx-3">
            <button
              type="button"
              class="btn-close float-end btn-close-white"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
            <h3>Apply Coupon</h3>
            <p>Enter your coupon code here below.</p>
            <input
              v-model="coupon"
              placeholder="Coupon"
              class="p-1 coupon-size"
              type="text"
            />
            <button @click="checkCoupon" class="btn btn-primary ms-3">
              Apply Coupon
            </button>
            <hr />
            <h4 class="pb-3">{{ product.title }}</h4>
            <p class="fs-5">
              Blue Essence:
              <span class="float-end fw-bold"
                >{{ product.blueEssence }}+ BE</span
              >
            </p>
            <p class="fs-5">
              Price Per Account:
              <span class="float-end fw-bold"
                >&euro;{{ product.price.toFixed(2) }}</span
              >
            </p>
            <p class="fs-5">
              Region/Server:
              <span class="float-end fw-bold">{{
                product.region.toUpperCase()
              }}</span>
            </p>
            <p class="fs-5">
              Warranty:
              <span class="float-end fw-bold">Lifetime</span>
            </p>
            <hr />
            <input
              type="number"
              class="w-100 fs-5 text-center"
              :value="quantityValue"
              @change="onChange($event.target.value)"
              min="1"
              @blur="onChange($event.target.value)"
              :max="stock"
            />
          </div>
          <div class="m-2">
            <button
              type="button"
              :data-bs-target="'#CheckoutModalStep' + product._id"
              data-bs-toggle="modal"
              data-bs-dismiss="modal"
              class="btn btn-primary w-100"
            >
              Continue (&euro;{{ (product.price * quantityValue).toFixed(2) }})
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      :id="'CheckoutModalStep' + product._id"
      aria-hidden="true"
      aria-labelledby="exampleModalToggleLabel2"
      tabindex="-1"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-body py-4 mx-3">
            <button
              type="button"
              class="btn-close float-end btn-close-white"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
            <p class="mb-1 fs-5">Delivery Email</p>
            <input
              placeholder="Email Address"
              class="p-1 fs-6 input-text w-75"
              :value="email"
              @change="onChangeMail($event.target.value)"
              type="email"
            />
            <p class="m-0 text-danger">{{ emailErr }}</p>
            <hr />
            <h3>Payment Methods</h3>
            <div v-if="!startPay">
              <p>click on payment method to start payment process</p>
              <button class="btn btn-dark" @click="startPayment()">
                <img class="img-size" src="/images/stripe.png" />
              </button>
              <p class="m-0 tiny-text">
                Klarna/Sofort payments can take up to 3 days to be processed.
              </p>
            </div>
            <div v-else class="text-center mt-5">
              <div class="spinner-border" role="status">
                <span class="sr-only"></span>
              </div>
              <p>please wait</p>
            </div>
          </div>
          <div class="m-2">
            <button
              class="btn btn-primary float-end m-2"
              :data-bs-target="'#CheckoutModal' + product._id"
              data-bs-toggle="modal"
              data-bs-dismiss="modal"
            >
              Go back
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "QuickCheckoutModal",
  props: {
    product: Object,
    stock: Number,
  },
  data() {
    return {
      quantityValue: 1,
      email: "",
      startPay: false,
      emailErr: "",
      coupon: "",
      priceHolder: this.product.price,
      currentCoupon: "",
    };
  },
  methods: {
    onChange(value) {
      if (/^\d+$/.test(value.toString())) {
        if (value <= this.stock) {
          this.quantityValue = value;
        } else {
          this.quantityValue = this.stock;
        }
      } else {
        this.quantityValue = 1;
      }
    },
    onChangeMail(value) {
      this.email = value;
    },
    startPayment() {
      if (this.email === "") {
        return;
      }
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email)) {
        this.emailErr = "Invalid Email";
        return;
      }
      this.startPay = true;
      var userId = "Guest";
      if (this.$store.getters.isLogged) {
        userId = this.$store.getters.getId;
      }
      axios
        .post(`/api/orders/start`, {
          title: this.product.title,
          total: (this.quantityValue * this.product.price).toFixed(2),
          quantity: this.quantityValue,
          email: this.email,
          product: this.product._id,
          region: this.product.region,
          product_title: this.product.title,
          user: userId,
          coupon: this.currentCoupon
        })
        .then((res) => {
          window.open(res.data, "_self");
        });
    },
    checkCoupon() {
      axios
        .get(`/api/coupons/${this.coupon}`)
        .then((res) => {
          if (res.data.discount === "%") {
            var discount = (this.priceHolder / 100) * res.data.portion;
            this.product.price = this.priceHolder - discount;
            console.log("hi");
          }
          if (res.data.discount === "A") {
            this.product.price = this.priceHolder - res.data.portion;
          }
          this.currentCoupon = this.res.data.coupon;
          this.$notify({
            text: "Successfully Applied Coupon",
            type: "success",
          });
        })
        .catch((err) => {
          this.$notify({
            text: err,
            type: "error",
          });
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
.tiny-text {
  font-size: 11px;
  text-align: center;
  color: #4a90f8;
}
@media (max-width: 800px) {
  .img-size {
    width: 90%;
  }
  .coupon-size {
    width: 30%;
  }
}
</style>
