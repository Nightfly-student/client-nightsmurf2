<template>
  <div>
    <header class="text-light">
      <div class="container-xl">
        <div class="row">
          <div class="col-xl-6 col-sm-12 col-12">
            <h1 class="pt-3">Affiliate Program</h1>
            <p class="">
              Earn money with your influence! Do you have a Discord server,
              YouTube channel, Instagram page, Telegram server, TikTok profile
              or Twitter profile and want to earn some money?
            </p>
            <p>
              It is now possible with our affiliate program. Every purchase made
              by an customer of yours equals money. We pay up to 75% of the
              profit share!
            </p>
            <a type="button" href="#form" class="btn btn-primary"
              >Become an affiliate now</a
            >
          </div>
          <div class="col-sm-6 col-0 d-none d-xl-block">
            <img
              id="header_image"
              class="img-fluid w-full"
              src="/images/yi_header.png"
              alt="Cosmic Master Yi Header Image"
              title="Nightsmurf Cosmic Yi"
            />
          </div>
        </div>
      </div>
    </header>

    <div class="container-xl mt-5 pb-5 text-white">
      <div class="container p-5">
        <div
          class="row align-items-center justify-content-md-center text-center"
        >
          <div class="col-12 col-md-8 col-lg-7">
            <h2>What do you get?</h2>
            <p>
              Are you an influencer? Then you can make some money. On every sale
              make through our site, you earn a percentage of the profit share.
              We also give free lol smurf accounts for you to give away to your
              community and help you out with some free promotion on our site!
            </p>
          </div>
        </div>
      </div>
      <AffiliateBoxes class="pb-5" />
      <div class="pt-5 pb-5">
        <h2 class="text-center">How does it works?</h2>
        <div class="card">
          <div
            class="btn-group m-auto pt-3"
            role="group"
            aria-label="Basic example"
          >
            <button
              type="button"
              @click="onClick('apply')"
              :class="[apply ? 'btn-primary' : 'btn-dark']"
              class="btn rounded m-2"
            >
              1. Apply for Program
            </button>
            <button
              type="button"
              @click="onClick('link')"
              :class="[link ? 'btn-primary' : 'btn-dark']"
              class="btn rounded m-2"
            >
              2. Link Nightsmurf Url or Widget
            </button>
            <button
              type="button"
              @click="onClick('paid')"
              :class="[paid ? 'btn-primary' : 'btn-dark']"
              class="btn rounded m-2"
            >
              3. Get Paid
            </button>
          </div>
          <hr />
          <div class="tab-group text-center pb-3">
            <div class="tab-1" v-if="apply">
              <h3>Apply for the program</h3>
              <p>
                Start out by filling out the form below to apply for the
                program, we will get back to you within 24 hours regarding if
                you have been accepted or not.
              </p>
            </div>
            <div class="tab-2" v-if="link">
              <h3>Link Nightsmurf Url or Widget</h3>
              <p>
                If you have been accepted to the Nightsmurf affiliate program.
                You will recieve a coupon code which can be used by your
                community, also you will recieve a special link to our website.
                This link will directly apply the customer to you.
              </p>
              <img
                class="img-fluid"
                alt="example affiliate widget"
                title="affiliate widget"
                src="/images/b_blue.png"
              />
            </div>
            <div class="tab-3" v-if="paid">
              <h3>Get Paid</h3>
              <p>
                Once everything is setup you can follow your sales and progress
                through our affiliate panel, here you can see your available
                payout, total earned and when/what your community has purchased
                at Nightsmurf.
              </p>
              <img
                class="img-fluid"
                alt="example affiliate dashboard"
                title="affiliate dashboard"
                src="/images/dashboard.png"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="pt-5" id="form">
        <h2 class="text-center">Lets Become Partners!</h2>
        <div class="card p-3">
          <AffiliateForm />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AffiliateForm from "../../components/forms/AffiliateForm.vue";
import AffiliateBoxes from "../../components/boxes/AffiliateBoxes.vue";
import { useHead } from "@vueuse/head";
import { reactive } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";
export default {
  name: "affiliate",
  components: {
    AffiliateBoxes,
    AffiliateForm,
  },
  data() {
    return {
      apply: true,
      link: false,
      paid: false,
    };
  },
  methods: {
    onClick(value) {
      this.apply = false;
      this.link = false;
      this.paid = false;

      this[value] = true;
    },
  },
  setup() {
    const siteData = reactive({
      title: `Become an Affiliate - Nightsmurf`,
      description:
        "Become an Affiliate for Nightsmurf and earn money, accounts and more from promoting our products",
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

<style scoped>
.card {
  background: #161616;
}
.img-fluid {
  max-width: 400px;
}
</style>
