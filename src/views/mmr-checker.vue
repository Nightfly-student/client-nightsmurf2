<template>
  <div>
    <header class="text-light">
      <div class="container-xl">
        <div class="row">
          <div class="col-xl-7 col-sm-12 col-12">
            <h1 class="pt-3">What is your League Of Legends MMR?</h1>
            <p class="">
              Find out what your League of Legends MMR is down below with our
              LoL MMR Calculator. Your MMR may give you information about your
              League of Legends account that you not knew about.
            </p>
          </div>
          <div class="col-xl-5 col-sm-12 col-12 d-none d-xl-block">
            <img
              id="lootbox"
              class="img-fluid h-75 w-full"
              src="/images/logowithout.png"
              alt="Nightsmurf logo"
            />
          </div>
        </div>
        <p class="text-center fs-6 opacity-25">Power By WhatIsMyMMR.com</p>
      </div>
    </header>
    <div class="container-xl text-light pt-5">
      <MmrBody />
    </div>
    <div class="pt-5">
      <div class="container p-5">
        <div
          class="row align-items-center justify-content-md-center text-light"
        >
          <div class="col-12 col-md-8 col-lg-7 mb-5 text_box">
            <h6 class="text-primary">MMR</h6>
            <h2>What is LoL MMR?</h2>
            <p class="fs-5">
              MMR is the ranking system based on how good you are as a player
              based on you and other players. By having a MMR system in place,
              you can play against people at the same skill bracket (mostly
              then). MMR systems are pretty popular and is used in a wide
              verierty of things, like chess or age of empires.
            </p>
            <p class="fs-5">
              In League Of Legends, MMR is calculated to see what rank you are
              and how much League Points you earn each game. The lower the
              League Points the lower the MMR is based on other people at the
              same rank.
            </p>
            <p class="fs-5">
              By Checking your MMR you may realise some critical information
              about your account. Maybe your account is pretty stuck or maybe it
              only looks like it. You can always
              <router-link to="/category/league-of-legends-euw-accounts"
                >buy a smurf account</router-link
              >
              to get a higher MMR faster. Because Fresh accounts have Fresh MMR.
            </p>
            <h2 class="mt-5">How to check your MMR in LoL?</h2>
            <p class="fs-5">
              At the moment there are no offical ways to check your LoL MMR.
              Luckily some big websites gathered together to save all games
              played in League of Legends to calculate the average mmr of
              players in your rank and the mmr you likely have based on
              wins/losses and your LP gain.
            </p>
            <h2 class="mt-5">How to increase your MMR in LoL?</h2>
            <p class="fs-5">
              You can increase your winrate by playing League of Legends. You do
              it by winning games. The more you win the higher your MMR gets.
              You can also decide to get into placements to a higher devision
              and dodge the games then play again to increase your MMR rapidly.
            </p>
            <h2 class="mt-5">Why us Nightsmurf MMR Calculator?</h2>
            <p class="fs-5">
              Our calculator is powered by WhatIsMyMMR. This is the best MMR
              checker there is, and we are using it so that you can check your
              LoL MMR on Nightsmurf.com. When you create an account on our site
              you are able to open the
              <router-link to="/free-lol-account"
                >Free LoL Account Lootbox</router-link
              >
              Daily! Win a free League of Legends account today.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from "@vue/reactivity";
import MmrBody from "../components/mmr-components/MmrBody.vue";
import { computed } from "@vue/runtime-core";
import { useHead } from "@vueuse/head";
export default {
  name: "mmr-checker",
  components: {
    MmrBody,
  },
  setup() {
    const siteData = reactive({
      title: `LoL MMR Checker - Nightsmurf`,
      description:
        "Check your League Of Legends MMR and see what rank your MMR is closest too! You can also check on Normal MMR and Aram MMR to see if your account benefits from faster climbing in Ranked",
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
header {
  padding-bottom: 50px !important;
}
</style>
