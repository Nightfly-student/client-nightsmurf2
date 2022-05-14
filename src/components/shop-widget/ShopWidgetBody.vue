<template>
  <div id="shop">
    <div class="text-center info-box-shop">
      <h2 class="text-light">Cheap League of Legends smurfs</h2>
      <div class="w-25 m-auto width-mobile-small">
        <p class="text-center">
          Our accounts are of the highest quality and are cheaper than the
          competitors.
        </p>
      </div>
    </div>
    <div>
      <ShopWidgetRegion @selectedRegion="check" />
    </div>
    <div>
      <ShopWidgetContent
        v-if="mounted"
        :products="products"
        :stock="stock"
        :home="home"
        :royalty="royalty"
      />
    </div>
  </div>
</template>

<script>
import ShopWidgetRegion from "./ShopWidgetRegion.vue";
import ShopWidgetContent from "./ShopWidgetContent.vue";
import axios from "axios";

export default {
  name: "ShopWidgetBody",
  components: {
    ShopWidgetRegion,
    ShopWidgetContent,
  },
  props: {
    regionI: String,
    home: Boolean,
  },
  data() {
    return {
      products: [],
      stock: [],
      selectedRegion: "",
      mounted: false,
    };
  },
  methods: {
    check(region) {
      this.selectedRegion = region;
      axios
        .get(`/api/licences/stock?region=${this.selectedRegion}`)
        .then((response) => {
          this.stock = response.data;
          axios
            .get(`/api/products/items?region=${this.selectedRegion}`)
            .then((res) => {
              this.products = res.data.products.sort(
                (p, a) => p.price > a.price
              );
              if (this.$store.getters.isLogged) {
                this.getRoyalty();
              } else {
                this.royalty = {
                  active: false,
                };
                this.mounted = true;
              }
            });
        });
    },
    getRoyalty() {
      axios.get(`/api/royalty/${this.$store.getters.getId}`).then((res) => {
        this.royalty = res.data;
        this.products.forEach((product) => {
          var priceHolder = product.price;
          var discount = (priceHolder / 100) * this.royalty.discount;
          product.price = priceHolder - discount;
        });
        this.mounted = true;
      });
    },
  },
  created() {
    this.check(this.regionI);
  },
};
</script>

<style scoped>
.info-box-shop p {
  color: gainsboro;
}
@media (max-width: 1199px) {
  .width-mobile-small {
    width: 90% !important;
  }
}
</style>
