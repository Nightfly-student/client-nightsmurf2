<template>
  <div>
    <header class="text-light">
      <div class="container-xl">
        <div class="row">
          <div class="col-xl-7 col-sm-12 col-12">
            <h1 class="pt-3">
              Start your ranked journey with your favorite skin
            </h1>
            <p class="">
              Unranked fresh league of legends accounts with pre-defined skins,
              you get all the benefits from our other products, including an
              amazing skin.
            </p>
          </div>
          <div class="col-xl-5 col-sm-12 col-12">
            <h2 class="pt-3 text-center">Popular Skins</h2>
            <CarouselPopular />
          </div>
        </div>
      </div>
    </header>
    <div class="divider-top">
      <SkinChampions />
    </div>
  </div>
</template>

<script>
import { useHead } from '@vueuse/head';
import CarouselPopular from "../components/skins-components/CarouselPopular.vue";
import SkinChampions from "../components/skins-components/SkinChampions.vue";
import { reactive } from '@vue/reactivity';
import { computed } from '@vue/runtime-core';
export default {
  name: "Skins",
  components: {
    CarouselPopular,
    SkinChampions,
  },
  setup() {
    const siteData = reactive({
      title: "Unranked Skin Accounts Starting at €5.49 - Nightsmurf",
      description:
        "Cheap High Quality League Of Legends Smurf Skin Accounts. Instant Delivery & Life Time Warranty",
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

<style></style>
