<template>
  <div class="card text-light m-3 py-3 shadow" style="width: 18rem">
    <p class="btn btn-primary button-warranty">Liftime Warranty</p>
    <img
      src="/images/yone_1.jpg"
      class="card-img-top img-size-pos"
      alt="yone"
    />
    <button
      class="btn btn-primary button-buy-now"
      :data-bs-target="'#CheckoutModal' + product._id"
      data-bs-toggle="modal"
      v-if="stock > 0 && home"
    >
      Buy Now
    </button>
    <button
      href="#"
      class="btn btn-primary button-buy-now disabled"
      v-else-if="home"
    >
      Out of Stock
    </button>
    <button
      @click="$router.push(`/product/${product.slug}`)"
      class="btn btn-primary button-buy-now"
      v-else-if="!home"
    >
      Learn More
    </button>
    <div class="card-body">
      <h5 class="card-title pt-3 text-center">
        {{ product.title }}
      </h5>
      <hr />
      <div class="card-text">
        <div class="my-3">
          <BIconPiggyBank class="fs-4 me-2 text-primary" /> Price:
          <strong class="float-end me-4"
            >&euro;{{ product.price.toFixed(2) }}</strong
          >
        </div>
        <div class="my-3">
          <BIconGem class="fs-4 me-2 text-primary" /> Blue Essence:
          <strong class="float-end me-4">{{ product.blueEssence }}</strong>
        </div>
        <div class="my-3">
          <BIconGlobe class="fs-4 me-2 text-primary" /> Region:
          <strong class="float-end me-4">{{
            product.region.toUpperCase()
          }}</strong>
        </div>
        <div class="my-3">
          <BIconEject class="fs-4 me-2 text-primary" /> Rank:
          <strong class="float-end me-4">Fresh Unranked</strong>
        </div>
      </div>
    </div>
    <QuickCheckoutModal :product="product" :stock="stock" />
  </div>
</template>

<script>
import QuickCheckoutModal from "../modals/QuickCheckoutModal.vue";
import {
  BIconPiggyBank,
  BIconGem,
  BIconGlobe,
  BIconEject,
} from "bootstrap-icons-vue";
export default {
  name: "ShopItemCard",
  components: {
    BIconPiggyBank,
    BIconGem,
    BIconGlobe,
    BIconEject,
    QuickCheckoutModal,
  },
  props: {
    product: Object,
    stock: Number,
    home: Boolean,
  },
};
</script>

<style scoped>
.card {
  border: none !important;
  background: #161616;
  border-radius: 5px;
}
.img-size-pos {
  height: 300px;
  width: auto;
  margin: 5px;
  object-fit: cover;
  object-position: top;
}
.button-buy-now {
  margin: auto;
  margin-top: -50px;
  margin-left: 20px;
  margin-right: 20px;
  width: auto;
}
.button-warranty {
  background: #161616 !important;
  border: none !important;
  font-size: 14px;
  margin: auto 15px auto auto;
  margin-bottom: -50px;
  padding: 7px;
  z-index: 2;
  width: auto;
}
</style>
