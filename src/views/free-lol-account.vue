<template>
  <div>
    <header class="text-light">
      <div class="container-xl">
        <div class="row">
          <div class="col-xl-7 col-sm-12 col-12">
            <h1 class="pt-3">Free League of Legends Account</h1>
            <p class="">
              Try your luck with our lootbox containing League of Legends
              accounts and coupons. You may try it once every 24 hours. You may
              also join our Nightsmurf discord server where you can earn league
              of legends accounts and win them through giveaways.
            </p>
            <a
              type="button"
              href="https://discord.gg/yQ82SJHcU4"
              class="btn btn-primary"
              >Join Discord</a
            >
          </div>
          <div class="col-xl-5 col-sm-12 col-12">
            <img
              id="lootbox"
              class="img-fluid w-full"
              src="/images/free-lootbox.png"
              alt="Free LoL Account Lootbox"
              title="Nightsmurf Lootbox"
            />
          </div>
        </div>
      </div>
    </header>
    <div class="container-xl text-light pt-5 pb-2">
      <div>
        <div v-if="mounted && this.$store.getters.isLogged && isAllowed">
          <LootboxSlider
            :items="items"
            :loot="loot"
            :winningItem="winningItem"
            :ip="ip"
            :code="code"
            class="pt-5 pb-5"
          />
        </div>
        <div
          class="row pt-5 pb-5 align-items-center"
          id="overlay"
          v-if="!mounted"
        >
          <div class="col-12 col-md-6 justify-content-center">
            <div
              class="text-center text-sm-start"
              v-if="this.$store.getters.isLogged && !isAllowed"
            >
              <h1>Played Already <strong class="text-primary">:(</strong></h1>
              <p class="fs-5">Try again tomorrow</p>
            </div>
            <div v-else class="text-center text-sm-start">
              <h1>Good Luck <strong class="text-primary">:)</strong></h1>
              <p class="fs-5">
                If you win an account you may claim it through our
                <a href="https://discord.gg/yQ82SJHcU4">discord server</a>!
              </p>
            </div>
          </div>
          <div class="col-12 col-md-6">
            <div class="card rounded shadow p-5">
              <div class="row">
                <div class="col-12 col-md-6 text-center">
                  <h3>Free Loot Box</h3>
                  <div class="card bg-dark p-2 mt-2 mb-2">
                    <p class="fs-6 m-1">Looted Today</p>
                    <p class="fs-6 m-0">{{ opened }}</p>
                  </div>
                  <div v-if="!isLoading">
                    <button
                      v-if="this.$store.getters.isLogged && isAllowed"
                      class="btn btn-primary mt-2"
                      @click="openBox"
                    >
                      Open Lootbox
                    </button>
                    <p v-if="this.$store.getters.isLogged && !isAllowed">
                      Next Opening:
                      <vue-countdown
                        v-if="timerStarted"
                        :time="time"
                        :interval="100"
                        v-slot="{ hours, minutes, seconds }"
                      >
                        {{ hours }}:{{ minutes }}:{{ seconds }}
                      </vue-countdown>
                    </p>
                    <router-link
                      v-if="!this.$store.getters.isLogged"
                      type="button"
                      to="/login"
                      class="btn btn-primary mt-2"
                      >Login To Open</router-link
                    >
                  </div>
                  <div v-if="isLoading" class="text-center">
                    <div
                      class="spinner-border text-primary m-0 p-0"
                      role="status"
                    >
                      <span class="sr-only m-0 p-0"></span>
                    </div>
                  </div>
                </div>
                <div class="col-12 col-md-6">
                  <img
                    id="lootbox"
                    class="img-fluid w-full"
                    src="/images/free-lootbox.png"
                    alt="Free LoL Account Lootbox Small"
                    title="Small Nightsmurf Lootbox"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div
          v-if="!isAllowed && this.$store.getters.isLogged"
          class="alert alert-info"
          role="alert"
        >
          Adblocker May Block your attempt to use the lootbox.
        </div>
        <h2>Lootbox Content</h2>
        <div class="row justif g-3">
          <LootboxContent
            class="col-6 col-md-3 col-sm-6 p-2"
            :loot="l"
            v-for="l in loot"
            :key="l._id"
          />
        </div>
      </div>
      <div class="pt-5">
        <div class="container p-5">
          <div
            class="row align-items-center justify-content-md-center text-light"
          >
            <div class="col-12 col-md-8 col-lg-7 mb-5 text_box">
              <h6 class="text-primary">Lootbox</h6>
              <h2>How Does it work?</h2>
              <p class="fs-5">
                You can open our lootbox daily. This lootbox includes a coupon
                or a fresh free League Of Legends Account with 40k BE.
              </p>
              <p class="fs-5">
                Once you created an account on our site, you can open the
                lootbox csgo style. You cannot use any VPN to protect from
                people doing it mulitple times a day on a single account.
              </p>
              <p class="fs-5">
                We are doing this Lootbox, because we want everyone to enjoy
                owning a LoL Account, but also we want everyone to give an
                oppertunity to have some fun.
              </p>
            </div>
          </div>
        </div>
        <div class="container p-5">
          <div
            class="row align-items-center justify-content-md-center text-light"
          >
            <div class="col-12 col-md-8 col-lg-7 mb-5 text_box">
              <h6 class="text-primary">Free League Of Legends Account</h6>
              <h2>Why are you giving away?</h2>
              <p class="fs-5">
                We think that the most important thing to a business is having a
                good community where everyone can enjoy their time in. By giving
                away we make the community more active but also more exciting to
                be around in
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="container p-5">
        <ShopWidgetBody :regionI="'EUW'" :home="true" />
      </div>
    </div>
  </div>
</template>

<script>
import gsap from "gsap";
import axios from "axios";
import LootboxContent from "../components/loot-components/LootboxContent.vue";
import LootboxSlider from "../components/loot-components/LootboxSlider.vue";
import ShopWidgetBody from "../components/shop-widget/ShopWidgetBody.vue";
import moment from "moment";
import { reactive } from "@vue/reactivity";
import { useHead } from "@vueuse/head";
import { computed } from "@vue/runtime-core";
import VueCountdown from "@chenfengyuan/vue-countdown";

export default {
  name: "Free-LoL-Account",
  components: {
    LootboxContent,
    LootboxSlider,
    ShopWidgetBody,
    VueCountdown,
  },
  data() {
    return {
      loot: [],
      items: [],
      winningItem: "",
      mounted: false,
      isAllowed: false,
      timerStarted: false,
      isLoading: true,
      opened: 0,
      time: 0,
      code: "",
    };
  },
  methods: {
    openBox() {
      axios.get("/api/loot/slot").then((res) => {
        this.winningItem = res.data.winner;
        this.items = res.data.items;
        this.code = res.data.code;
        gsap.to("#overlay", { opacity: 0, duration: 0.75 });
        setTimeout(() => {
          this.mounted = true;
        }, 750);
      });
    },
    countdown(t) {
      this.time = moment(t).add(1, "d").toDate() - moment().toDate();
      this.timerStarted = true;
    },
  },
  mounted() {
    axios.get("/api/loot/loot").then((res) => {
      this.loot = res.data;
    });
    axios.get("/api/winnings/opened").then((res) => {
      this.opened = res.data.played;
    });
    if (this.$store.getters.isLogged) {
      axios.get(`/api/winnings/played`).then((res) => {
        if (res.data.allowedToPlay) {
          this.isAllowed = true;
        } else {
          if (res.data.reason.includes("VPN")) {
            alert("Please turn off your vpn");
          } else {
            this.countdown(res.data.lastPlay);
            this.isAllowed = false;
          }
        }
        this.isLoading = false;
      });
    } else {
      this.isLoading = false;
    }
    gsap.fromTo(
      "#lootbox",
      {
        y: "-=15",
        ease: "sine",
      },
      {
        y: "+=15",
        ease: "sine",
        repeat: -1,
        yoyo: true,
        duration: 0.8,
      }
    );
  },
  setup() {
    const siteData = reactive({
      title: `Free League of Legends Account - Nightsmurf`,
      description:
        "Looking to get a free League of Legends Account? Try your luck at our free League Of Legends Lootbox, free to open every 24 hours!",
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
  background: #151515;
}
</style>
