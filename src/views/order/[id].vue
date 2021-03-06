<template>
  <div class="mt-5">
    <div class="text-light container-xl" v-if="mounted && orderFound">
      <h1 class="pt-4">Order #{{ order._id }}</h1>
      <p>Order Status: {{ order.paymentStatus }}</p>
      <div class="row pt-4 text-light">
        <div class="col-12 col-md-6">
          <h4 class="text-primary">Order Information</h4>
          <div class="card p-3 mb-3">
            <h4 class="text-center">Need Help?</h4>
            <p class="text-center">
              Join our
              <a
                href="https://discord.gg/yQ82SJHcU4"
                class="text-decoration-none"
                >Discord server</a
              >
              for 24/7 support
            </p>
          </div>
          <div
            v-if="session.payment_status === 'paid' || session.status === '1'"
            class="card p-3 mb-3"
          >
            <h4 class="text-center">Order Completed</h4>
            <p class="m-0 text-center">Your Account Info</p>
            <div v-for="licence in licences" :key="licence._id">
              <hr />
              <p class="fs-5">
                Username <span class="float-end">{{ licence.username }}</span>
              </p>
              <p class="fs-5">
                Password <span class="float-end">{{ licence.password }}</span>
              </p>
              <div v-if="licence.skins.length != 0" class="text-center">
                <button
                  class="btn btn-secondary dropdown-toggle"
                  type="button"
                  :id="'dropdownMenuButton' + licence._id"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Show Account Skins
                </button>
                <ul
                  class="dropdown-menu"
                  :aria-labelledby="'dropdownMenuButton' + licence._id"
                >
                  <li v-for="skin in licence.skinList" :key="skin">
                    <p class="dropdown-item" href="#">{{ skin }}</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div
            v-if="
              session.payment_status != 'paid' &&
              order.paymentMethod === 'stripe' &&
              order.paymentStatus != 'processing'
            "
            class="card p-3 mb-3"
          >
            <h4 class="text-center">Method: Stripe</h4>
            <p class="text-center">Please complete your payment below</p>
            <button @click="payStripe" class="btn btn-primary w-25 m-auto">
              Pay On Stripe
            </button>
            <div class="alert alert-info mt-3 text-center" role="alert">
              Note: If you paid using Sofort it can take 1-3 days for the funds
              to arrive to Nightsmurf.
            </div>
          </div>
          <div
            v-if="order.paymentStatus === 'processing'"
            class="card p-3 mb-3"
          >
            <h4 class="text-center">Payment Processing</h4>
            <div class="alert alert-info mt-3 text-center" role="alert">
              Processing... Klarna, Sofort payments can take up to 3 days to
              process. Please watch your email.
            </div>
          </div>
          <div
            v-if="session.status != '1' && order.paymentMethod === 'payop'"
            class="card p-3 mb-3"
          >
            <h4 class="text-center">Method: Payop</h4>
            <p class="text-center">Please complete your payment below</p>
            <button @click="payPayop" class="btn btn-primary w-25 m-auto">
              Pay On Payop
            </button>
            <div class="alert alert-info mt-3 text-center" role="alert">
              Note: Payop may have delays regarding your payment.
            </div>
          </div>
          <div class="card p-3 mb-3">
            <h4 class="text-center">Nightsmurf Invoice</h4>
            <p class="text-center">#{{ order._id }}</p>
            <hr />
            <div>
              <p class="fs-5">
                Status <span class="float-end">{{ order.paymentStatus }}</span>
              </p>
              <p class="fs-5">
                Email <span class="float-end">{{ order.email }}</span>
              </p>
              <p class="fs-5">
                Quantity
                <span class="float-end">{{ session.metadata.quantity }}</span>
              </p>
              <p class="fs-5">
                Total <span class="float-end">&euro;{{ order.total.toFixed(2) }}</span>
              </p>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-6">
          <h4 class="text-primary">Accounts</h4>
          <div class="card p-3">
            <p class="fs-5 m-auto" v-if="session.metadata.product_id">
              {{ session.metadata.quantity }}x
              {{ session.metadata.product_title }}
            </p>
            <p class="fs-5 m-auto" v-if="session.metadata.skin_id">
              1x {{ session.metadata.skin_name }} -
              {{ session.metadata.region }}
            </p>
            <hr />
            <div v-if="session.metadata.skin_id" class="text-center">
              <img
                :src="
                  'https://raw.communitydragon.org/latest/game/assets/characters/anivia/skins/skin02/' +
                  skin.imgPath +
                  '.png'
                "
              />
            </div>
            <div v-if="session.metadata.product_id">
              <p>{{ product.body }}</p>
            </div>
          </div>
          <div class="card p-3 mt-3">
            <h3 class="text-center">Review Us</h3>
            <p class="text-center">
              If you review us on Trustpilot, please contact us through
              <a href="https://discord.gg/yQ82SJHcU4">Discord</a>
              and recieve a 50% discount for your next order.
            </p>
            <a
              type="button"
              class="btn btn-primary"
              href="https://trustpilot.com/review/nightsmurf.com"
              target="_blank"
              >Review Us Now</a
            >
          </div>
        </div>
      </div>
    </div>
    <div v-if="!mounted" class="text-center">
      <div class="spinner-border text-primary margin-spinner" role="status">
        <span class="visually-hidden"></span>
      </div>
      <p class="text-light">Loading Order...</p>
    </div>
    <div v-if="!orderFound && mounted" class="text-center">
      <h1 class="pt-4">No Order Found :(</h1>
      <a
        @click="$router.push('/')"
        class="text-primary cursor text-decoration-none"
        >Return to home</a
      >
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Order",
  data() {
    return {
      order: [],
      session: [],
      mounted: false,
      orderFound: false,
      skin: [],
      skins: [],
      product: [],
      licences: [],
    };
  },
  methods: {
    orderExist() {
      axios
        .get(`/api/orders/${this.$route.params.id}`)
        .then((res) => {
          this.mounted = false;
          this.order = res.data;
          if (this.order.paymentStatus === "completed") {
            this.track(this.order.total, this.order._id);
          }
          if (this.order.paymentMethod === "stripe") {
            axios
              .get(`/api/orders/session?session=${this.order.paymentSession}`)
              .then((response) => {
                this.session = response.data;
                this.orderFound = true;
                this.getProduct();
                this.getPaid();
                this.getSkin();
                this.mounted = true;
              });
          }
          if (this.order.paymentMethod === "payop") {
            axios
              .get(
                `/api/orders/payopsession?session=${this.order.paymentSession}`
              )
              .then((response) => {
                this.session = response.data;
                this.orderFound = true;
                console.log(this.session);
                this.getProduct();
                this.getPaid();
                this.getSkin();
                this.mounted = true;
              });
          }
        })
        .catch(() => {
          this.orderFound = false;
          this.mounted = true;
        });
    },
    getProduct() {
      if (this.session.metadata.product_id) {
        axios
          .get(`/api/products/${this.session.metadata.product_id}`)
          .then((respo) => {
            this.product = respo.data;
          });
      }
    },
    getPaid() {
      if (this.session.payment_status === "paid") {
        this.order.orderItems.forEach((item) => {
          axios
            .get(`/api/licences/${item}`)
            .then((respon) => {
              this.licences.push(respon.data);
            })
            .then(() => {
              this.licences.forEach((licence) => {
                axios
                  .get(
                    `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/skins.json`
                  )
                  .then((repss) => {
                    var holder = [];
                    licence.skins.forEach((skiny) => {
                      var found = Object.values(repss.data).find(
                        (skin) => skin.id === parseInt(skiny)
                      );
                      holder.push(found.name);
                    });
                    licence.skinList = holder;
                  });
              });
            });
        });
      }
    },
    getSkin() {
      if (this.session.metadata.skin_id) {
        axios
          .get(
            `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/skins.json`
          )
          .then((resp) => {
            var found = Object.values(resp.data).find(
              (skin) => skin.id === parseInt(this.session.metadata.skin_id)
            );
            var splitted = found.loadScreenPath.split("/");
            found.imgPath = splitted[splitted.length - 1]
              .toLowerCase()
              .replace(".jpg", "");
            this.skin = found;
          });
      }
    },
    payStripe() {
      window.open(this.session.url, "_self");
    },
    payPayop() {
      window.open(
        `https://checkout.payop.com/en/payment/${this.order.paymentSession}`,
        "_self"
      );
    },
    skinParser: function (id) {
      var found = [];
      axios
        .get(
          `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/skins.json`
        )
        .then((resp) => {
          found = Object.values(resp.data).find(
            (skin) => skin.id === parseInt(id)
          );
        });
      return found.name;
    },
    track(total, id) {
      this.$gtag.event("conversion", {
        transaction_id: id,
        send_to: "AW-10906096717/U7dmCLm-ssMDEM2ot9Ao",
        event_category: "conversion",
        event_label: "conversion",
        value: total.toFixed(2),
        currency: "EUR",
      });
      this.$gtag.event("conversion", {
        transaction_id: id,
        send_to: "AW-363008517/InE1COGf6f0CEIWkjK0B",
        event_category: "conversion",
        event_label: "conversion",
        value: total.toFixed(2),
        currency: "EUR",
      });
    },
  },
  mounted() {
    this.orderExist();
  },
};
</script>

<style scoped>
.card {
  border: none !important;
  background: #161616;
  border-radius: 5px;
}
.margin-spinner {
  margin-top: 300px;
}
.cursor {
  cursor: pointer;
}
.cursor:hover {
  color: rgb(59, 59, 226) !important;
}
</style>
