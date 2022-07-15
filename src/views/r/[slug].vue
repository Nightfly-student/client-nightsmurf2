<template>
  <h2 class="mt-5 pt-5 text-center text-light">Redirecting To Home...</h2>
</template>

<script>
import { useHead } from "@vueuse/head";
import { reactive } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";
import axios from 'axios';
export default {
  name: "Redirect",
  mounted() {
    this.$store.dispatch("affiliate", {affiliate: this.$route.params.slug});
  },
  setup() {
    const siteData = reactive({
      title: `Cheapest Smurf Accounts Only €3.99 - Nightsmurf`,
      description:
        "We offer the cheapest league of legends smurfs on the market. Buy your lol smurf account for EUW, NA, EUNE, TR, OCE, RU, LAN, and more",
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
