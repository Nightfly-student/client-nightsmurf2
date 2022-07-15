<template>
  <div class="container-xl">
    <div class="row text-light justify-content-center hero_container">
      <div class="col-12 col-lg-4 hero_box">
        <div class="card m-2 mt-4 p-2 Regular shadow">
          <BIconTicket class="text-center fs-1 m-auto mt-3 mb-3" />
          <h2 class="card-title text-center">Coupon Codes</h2>
          <p class="card-body text-center">
            You will recieve a coupon code which you can share to your community.
          </p>
        </div>
      </div>
      <div class="col-12 col-lg-4 hero_box">
        <div class="card m-2 p-2 Regular shadow">
          <BIconPersonPlus class="text-center fs-1 m-auto mt-3 mb-3" />
          <h2 class="card-title text-center">Free Smurfs</h2>
          <p class="card-body text-center">
            Receieve free smurf accounts for your streams, events or giveaways.
          </p>
        </div>
      </div>
      <div class="col-12 col-lg-4 hero_box">
        <div class="card m-2 mt-4 p-2 Regular shadow">
          <BIconBarChart class="text-center fs-1 m-auto mt-3 mb-3" />
          <h2 class="card-title text-center">Shared Revenue</h2>
          <p class="card-body text-center">
            For each account sold using your coupon or link you will earn money.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  BIconTicket,
  BIconPersonPlus,
  BIconBarChart,
} from "bootstrap-icons-vue";

export default {
  name: "AffiliateBoxes",
  components: {
    BIconTicket,
    BIconPersonPlus,
    BIconBarChart,
  },
}
</script>

<style scoped>
.card {
  border: none !important;
  background: #161616;
  border-radius: 10px;
}
.card:hover {
  transform: scale(1.1);
}
</style>
