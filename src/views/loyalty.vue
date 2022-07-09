<template>
  <div>
    <header class="text-light">
      <div class="container-xl">
        <div class="row">
          <div class="col-xl-12 col-sm-12 col-12 text-center">
            <h1 class="pt-3">
              <BIconArrowThroughHeart class="text-primary pe-2" />Loyalty
              Program
            </h1>
            <router-link
              v-if="!this.$store.getters.isLogged"
              to="/login"
              class="btn btn-primary mt-3"
              >Login to see your progress</router-link
            >
          </div>
        </div>
      </div>
    </header>
    <div class="mt-5 mb-5">
      <LoyaltyProgress />
    </div>
    <div class="container">
      <div class="row align-items-center justify-content-md-center text-light">
        <div class="text-light pt-5 mt-5 col-12 col-md-8 col-lg-7 mb-5">
          <h2 class="text-center fs-1">How Does it work?</h2>
          <p class="fs-5">
            Nightsmurf's loyalty system is here, and it is ready to award our
            loyal customers. Currently the program consists of different tiers,
            offering various discounts. By reaching each threshold your account
            automatically adds the discount on to your next purchase. We made it
            possible for you to combine the tier based discount with our already
            existing coupons! By using them at the same time, we provide huge
            discounts for you!
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { BIconArrowThroughHeart } from "bootstrap-icons-vue";
import LoyaltyProgress from "../components/boxes/LoyaltyProgress.vue";
import { useHead } from "@vueuse/head";
import { reactive } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";
export default {
  name: "Loyalty",
  components: {
    BIconArrowThroughHeart,
    LoyaltyProgress,
  },
  setup() {
    const siteData = reactive({
      title: "Get Discounts With Our Loyalty Program - Nightsmurf",
      description:
        "Nightsmurf's loyalty system is here, and it is ready to award our loyal customers. You will get rewarded discounted prices and more",
      image:
        "https://res.cloudinary.com/droomsocial/image/upload/v1647780317/yi_header_vradr7.png",
      type: "website",
      url: new URL(location.href),
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
        {
          property: "og:type",
          content: computed(() => siteData.type),
        },
        {
          property: "og:url",
          content: computed(() => siteData.url),
        },
      ],
      link: [
        {
          rel: "canonical",
          href: computed(() => siteData.url),
        },
      ],
    });
  },
};
</script>

<style></style>
