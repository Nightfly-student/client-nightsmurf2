<template>
  <div class="container-xl">
    <div class="row justify-content-center p-3" v-if="mounted">
      <ShopItemCard
        v-for="product in products"
        :key="product.slug"
        :product="product"
        :stock="stock[product.licenceType]"
        :home="false"
      />
    </div>
  </div>
</template>

<script>
import ShopItemCard from "../shop-widget/ShopItemCard.vue";
import axios from "axios";
export default {
  name: "CategoryWidgetContent",
  components: {
    ShopItemCard,
  },
  props: {
    region: String,
  },
  data() {
    return {
      products: [],
      selectedRegion: "",
      stock: [],
      mounted: false,
    };
  },
  methods: {
    check(region) {
      this.mounted = false;
      this.selectedRegion = region;
      axios.get(`/api/licences/stock?region=${region}`).then((response) => {
        this.stock = response.data;
        axios.get(`/api/products/items?region=${region}`).then((res) => {
          this.products = res.data.products;
          this.mounted = true;
        });
      });
    },
  },
  created() {
    this.check(this.region);
  },
  watch: {
    $route(to, from) {
      if (to.params.category && to.params.category != from.params.category) {
        this.products = [];
        this.stock = [];
        this.selectedRegion = [];
        setTimeout(() => {
          this.check(this.region);
        });
      }
    },
  },
};
</script>

<style></style>
