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
          $route.params.category.replaceAll('-', ' ') + ' - Nightsmurf '
        "
      />
      <meta
        property="og:description"
        content="We offer the cheapest league of legends smurfs on the market. Buy your lol smurf account for EUW, NA, EUNE, TR, OCE, RU, LAN, and more"
      />
      <meta
        property="og:image"
        content="https://res.cloudinary.com/droomsocial/image/upload/v1647780317/yi_header_vradr7.png"
      />

      <!-- Twitter -->
      <meta
        name="twitter:title"
        :content="
          $route.params.category.replaceAll('-', ' ') + ' - Nightsmurf '
        "
      />
      <meta
        name="twitter:description"
        content="We offer the cheapest league of legends smurfs on the market. Buy your lol smurf account for EUW, NA, EUNE, TR, OCE, RU, LAN, and more"
      />
      <meta
        name="twitter:image"
        content="https://res.cloudinary.com/droomsocial/image/upload/v1647780317/yi_header_vradr7.png"
      />
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
    <div class="pt-5 mt-5 pb-5 bg-dark">
      <div class="text-center">
        <div
          class="trustpilot-widget"
          data-locale="en-US"
          data-template-id="5419b6a8b0d04a076446a9ad"
          data-businessunit-id="60929b432ebaea0001d71961"
          data-style-height="24px"
          data-style-width="100%"
          data-theme="dark"
          data-min-review-count="10"
        >
          <a
            href="https://www.trustpilot.com/review/nightsmurf.com"
            target="_blank"
            rel="noopener"
            class="text-decoration-none"
            >Trustpilot</a
          >
        </div>
      </div>
    </div>
    <div class="container-xl mt-5 text-light">
      <h2 class="text-center pb-4">
        Looking for a {{ whatRegion.toUpperCase() }} account? You are at the
        right place
      </h2>
      <HeroBoxes />
      <div class="container p-5">
        <div
          class="row align-items-center justify-content-md-center text-light"
        >
          <div class="col-12 col-md-8 col-lg-7 mb-5">
            <h6 class="text-primary">Cheap LoL Smurf</h6>
            <h2>Why should you buy a {{whatRegion.toUpperCase()}} smurf account?</h2>
            <p class="fs-5">
              It takes a regular League Of Legends player over 30 days to level
              up an account from level 1 to 30. Since you found out about
              Nightsmurf.com, you don't have to worry about it. You will get
              your smurf account instantly in your mail and on our dashboard.
            </p>
            <p class="fs-5">
              We all love to play League Of Legends and keep getting an higher elo. Every day/week/month we jump into League Of Legends for a ranked game just to climb to that dream rank, but... we all know that it keeps getting harder and harder
            </p>
            <p class="fs-5">
              While grinding {{whatRegion}} League of Legends on your main account, you could end up getting stuck in a rank. This may be the case of bad team mates, or you not improving fast enough. A LoL smurf account could save you. You may start from scratch again, but when you reach your own elo, your account will have a better MMR. This means you earn more LP and you get a Higher Rank
            </p>
          </div>
        </div>
      </div>
      <div class="container p-5">
        <div
          class="row align-items-center justify-content-md-center text-light"
        >
          <div class="col-12 col-md-8 col-lg-7 mb-5">
            <h6 class="text-primary">Who?</h6>
            <h2>Who are we?</h2>
            <p class="fs-5">
              We are Nightsmurf.com and are dedicated League of Legends since 2016. We changed names, we changed platforms and ended up creating our own webshop.
            </p>
            <p class="fs-5">
              Over the years we learned that being a LoL seller is risky. We dealed with scammers, we dealed with issues from payment provider and even dealed with issue from the goverment. We overcame these things to get you the best product and service we can deliver.
            </p>
            <p class="fs-5">
              Now we are here, with a brand new site, brand new community and some new team members. Hopefully we will end up being your favorite account supplier.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useHead } from "@vueuse/head";
import ChangeRegion from "../../components/category-components/ChangeRegion.vue";
import CategoryWidgetContent from "../../components/category-components/CategoryWidgetContent.vue";
import { reactive } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";
import HeroBoxes from "../../components/boxes/HeroBoxes.vue";
export default {
  name: "Category",
  components: {
    ChangeRegion,
    CategoryWidgetContent,
    HeroBoxes,
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
  setup() {
    const siteData = reactive({
      title: `League Of Legends Accounts - Nightsmurf`,
      description:
        "League Of Legends Smurf Accounts, Unranked, Fresh & Instant Delivery. We Offer 40k, 50k, 60k For EUW, EUNE, NA, TR, OCE, BR, LAS, LAN, RU",
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
.bg-dark {
  background: #161616 !important;
}
</style>
