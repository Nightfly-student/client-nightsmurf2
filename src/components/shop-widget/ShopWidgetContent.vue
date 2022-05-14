<template>
  <div class="container-xl">
    <div class="row justify-content-center p-3">
      <ShopItemCard
        v-for="product in products"
        :key="product.slug"
        :product="product"
        :stock="stock[product.licenceType]"
        :home="home"
        :royalty="royalty"
      />
    </div>
  </div>
</template>

<script>
import ShopItemCard from "./ShopItemCard.vue";
export default {
  name: "ShopWidgetContent",
  components: {
    ShopItemCard,
  },
  props: {
    products: Object,
    stock: Object,
    home: Boolean,
    royalty: Object,
  },
};
</script>

<style scoped></style>
