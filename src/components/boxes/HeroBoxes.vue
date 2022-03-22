<template>
  <div class="container-xl">
    <div class="row text-light justify-content-center">
      <div class="col-12 col-lg-4">
        <div class="card m-2 mt-4  p-2 Regular shadow">
          <BIconTrophy class="text-center fs-1 m-auto mt-3 mb-3" />
          <h2 class="card-title text-center">Ranked Ready</h2>
          <p class="card-body text-center">
            Our lol smurf accounts comes with enough blue essence to buy 20+
            champs
          </p>
        </div>
      </div>
      <div class="col-12 col-lg-4">
        <div class="card m-2 p-2 Regular shadow">
          <BIconClockHistory class="text-center fs-1 m-auto mt-3 mb-3" />
          <h2 class="card-title text-center">Instant Delivery</h2>
          <p class="card-body text-center">
            Our lol smurf accounts are delivered instantly after the payment has
            been made in your mail
          </p>
        </div>
      </div>
      <div class="col-12 col-lg-4">
        <div class="card m-2 mt-4 p-2 Regular shadow">
          <BIconShieldCheck class="text-center fs-1 m-auto mt-3 mb-3" />
          <h2 class="card-title text-center">Lifetime Warranty</h2>
          <p class="card-body text-center">
            All of our accounts come with lifetime warranty, protected against
            bot bans
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { BIconTrophy, BIconClockHistory, BIconShieldCheck } from "bootstrap-icons-vue";
export default {
  name: "HeroBoxes",
  components: {
    BIconTrophy,
    BIconClockHistory,
    BIconShieldCheck
  },
};
</script>

<style scoped>
.card {
  border: none !important;
  background: #161616;
  border-radius: 10px;
}
.card:hover {
    transform: scale(1.10);
}
</style>
