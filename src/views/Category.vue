<template>
  <div>
    <Head>
      <title>
        {{ $route.params.category.replaceAll("-", " ") }} - Nightsmurf
      </title>
      <meta
        name="description"
        content="We offer the cheapest league of legends smurfs on the market. Buy your lol smurf account for EUW, NA, EUNE, TR, OCE, RU, LAN, and more"
      />

      <!-- Social -->
      <meta
        property="og:title"
        :content="
          $route.params.category.replaceAll('-', ' ') +
          ' - Nightsmurf '
        "
      />
      <meta
        property="og:description"
        content="We offer the cheapest league of legends smurfs on the market. Buy your lol smurf account for EUW, NA, EUNE, TR, OCE, RU, LAN, and more"
      />
      <meta property="og:image" content="https://res.cloudinary.com/droomsocial/image/upload/v1647780317/yi_header_vradr7.png" />
      
      <!-- Twitter -->
      <meta
        name="twitter:title"
        :content="
          $route.params.category.replaceAll('-', ' ') +
          ' - Nightsmurf '
        "
      />
      <meta
        name="twitter:description"
        content="We offer the cheapest league of legends smurfs on the market. Buy your lol smurf account for EUW, NA, EUNE, TR, OCE, RU, LAN, and more"
      />
      <meta name="twitter:image" content="https://res.cloudinary.com/droomsocial/image/upload/v1647780317/yi_header_vradr7.png" />
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
    <header class="text-light">
      <div class="container-xl">
        <div class="row">
          <div class="col-xl-7 col-sm-12 col-12">
            <h1 class="pt-3">
              {{ $route.params.category.replaceAll("-", " ") }}
            </h1>
            <p class="">Unranked fresh League of Legends accounts</p>
          </div>
          <div class="col-xl-5 col-sm-12 col-12"></div>
        </div>
      </div>
    </header>
    <ChangeRegion />
    <CategoryWidgetContent v-if="mounted" :region="whatRegion" />
  </div>
</template>

<script>
import { Head } from "@vueuse/head";
import ChangeRegion from "../components/category-components/ChangeRegion.vue";
import CategoryWidgetContent from "../components/category-components/CategoryWidgetContent.vue";
export default {
  name: "Category",
  components: {
    ChangeRegion,
    CategoryWidgetContent,
  },
  data() {
    return {
      whatRegion: "",
      mounted: false,
    };
  },
  methods: {
    mounty() {
      this.mounted = false;
      this.whatRegion = this.$route.params.category.split("-")[3];
      this.mounted = true;
    },
  },
  created() {
    this.mounty();
  },
  watch: {
    $route(to, from) {
      if (to.params.category && to.params.category != from.params.category) {
        this.mounty();
      }
    },
  },
};
</script>

<style></style>
