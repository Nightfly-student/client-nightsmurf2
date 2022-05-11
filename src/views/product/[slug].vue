<template>
  <div>
    <div v-if="found">
      <header class="text-light">
        <div class="container-xl">
          <div class="row">
            <div class="col-xl-12 col-sm-12 col-12">
              <h1 class="pt-3 text-center">{{ product.title }}</h1>
            </div>
          </div>
        </div>
      </header>
      <div class="container-xl">
        <button
          class="btn btn-primary mt-3"
          @click="
            $router.push(
              `/category/league-of-legends-${product.region}-accounts`
            )
          "
        >
          Back To {{ product.region.toUpperCase() }} Accounts
        </button>
        <div class="row pt-5 pb-5 text-light">
          <div class="col-lg-6 col-md-12">
            <img
              class="m-2 img-size d-md-block d-none"
              src="/images/Yone_1_splash.jpg"
            />
          </div>
          <div class="col-lg-6 col-md-12 pt-5 mt-5">
            <h4>{{ product.title }}</h4>
            <div class="row pt-4">
              <div class="col-md-4 col-12">
                <p class="mb-0">Price per account</p>
                <p>
                  <strong>&euro;{{ product.price }} euro</strong>
                </p>
              </div>
              <div class="col-md-4 col-12">
                <p class="mb-0">Blue Essence</p>
                <p>
                  <strong>{{ product.blueEssence }}+ Blue Essence</strong>
                </p>
              </div>
              <div class="col-md-4 col-12">
                <p class="mb-0">Region</p>
                <p>
                  <strong>{{ product.region.toUpperCase() }}</strong>
                </p>
              </div>
            </div>
            <div class="text-center">
              <button
                v-if="stock != 0"
                :data-bs-target="'#CheckoutModal' + product._id"
                data-bs-toggle="modal"
                class="btn btn-primary fs-5"
              >
                Buy Now
              </button>
              <button v-else class="btn btn-primary fs-5 disabled">
                Out of Stock
              </button>
            </div>
            <hr />
            <h4>Description</h4>
            <p>{{ product.body }}</p>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!found">
      <h2>not found</h2>
    </div>
    <QuickCheckoutModal v-if="mounted" :product="product" :stock="stock" />
  </div>
</template>

<script>
import axios from "axios";
import QuickCheckoutModal from "../../components/modals/QuickCheckoutModal.vue";
import { reactive } from "@vue/reactivity";
import { useRoute } from "vue-router";
import { useHead } from "@vueuse/head";
import { computed } from "@vue/runtime-core";
export default {
  name: "Product",
  components: {
    QuickCheckoutModal,
  },
  data() {
    return {
      product: {},
      found: false,
      mounted: false,
      stock: 0,
    };
  },
  methods: {
    getProduct() {
      axios
        .get(`/api/products/slug?slug=${this.$route.params.slug}`)
        .then((res) => {
          this.product = res.data;
          this.found = true;
          axios
            .get(
              `/api/licences/stockitem?region=${this.product.region}&type=${this.product.licenceType}`
            )
            .then((response) => {
              this.stock = response.data.stock;
              this.mounted = true;
            });
        })
        .catch(() => {
          this.found = false;
        });
    },
  },
  created() {
    this.getProduct();
  },
  setup() {
    const route = useRoute();
    const info = route.params.slug.split("-");
    const siteData = reactive({
      title: `${info[0] + ' ' + info[1].toUpperCase() + ' ' + info[2].toUpperCase() + ' ' + info[3] + ' ' + info[4].toUpperCase()} - Nightsmurf`,
      description:
        `We Offer the cheapest ${info[0]} ${info[1].toUpperCase()} Accounts on the web. Our League Of Legends ${info[4].toUpperCase()} Smurf Accounts come with Lifetime Warranty and Instant Delivery.`,
      image:
        "https://res.cloudinary.com/droomsocial/image/upload/v1647780317/yi_header_vradr7.png",
    });

    useHead({
      title: computed(() => siteData.title),
      meta: [
        {
          name: `description`,
          content: computed(() => siteData.description),
        },
        {
          property: "og:title",
          content: computed(() => siteData.title),
        },
        {
          property: "og:description",
          content: computed(() => siteData.description),
        },
        {
          property: "og:image",
          content: computed(() => siteData.image),
        },
      ],
    });
  },
};
</script>

<style scoped>
.img-size {
  height: 820px;
  width: 100%;
  object-fit: cover;
}
</style>
