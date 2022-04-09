<template>
  <div class="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3 py-3">
    <div class="card text-light m-auto shadow" style="width: 18rem">
      <a
        v-if="championSkin.rarity != 'kNoRarity'"
        class="btn btn-primary button-warranty"
        :class="{
          epic: championSkin.rarity === 'kEpic',
          legendary: championSkin.rarity === 'kLegendary',
          mythic: championSkin.rarity === 'kMythic',
        }"
      >
        {{ championSkin.rarity.substr(1) }}
      </a>
      <a v-else class="btn btn-primary button-warranty hidden"> </a>
      <img
        :src="imageLoading ? '/images/blank_loading.jpg' : imgSource"
        class="card-img-top img-size-pos"
        :alt="champion.id"
        @load="imageLoading = false"
      />
      <a
        href="#"
        v-if="!championSkin.available"
        class="btn btn-primary button-buy-now disabled"
        >Out Of Stock</a
      >
      <button
        v-if="championSkin.available"
        :data-bs-target="'#CheckoutModal' + championSkin.id"
        data-bs-toggle="modal"
        class="btn btn-primary button-buy-now"
      >
        Buy Now
      </button>
      <div class="card-body">
        <h5 class="card-title pt-3 text-center">
          {{ championSkin.name }}
        </h5>
        <hr />
        <div class="card-text">
          <div class="my-3">
            <BIconPiggyBank class="fs-4 me-2 text-primary" /> Price:
            <strong class="float-end me-4">&euro;{{ price }}</strong>
          </div>
          <div class="my-3">
            <BIconGem class="fs-4 me-2 text-primary" /> Blue Essence:
            <strong class="float-end me-4">40-60k+</strong>
          </div>
          <div class="my-3">
            <BIconGlobe class="fs-4 me-2 text-primary" /> Region:
            <strong class="float-end me-4">{{
              championSkin.region.toUpperCase()
            }}</strong>
          </div>
          <div class="my-3">
            <BIconEject class="fs-4 me-2 text-primary" /> Rank:
            <strong class="float-end me-4">Fresh Unranked</strong>
          </div>
        </div>
      </div>
    </div>
    <QuickSkinCheckoutModal
      v-if="mounted"
      :champion="champion"
      :skin="championSkin"
      :price="price"
    />
  </div>
</template>

<script>
import {
  BIconPiggyBank,
  BIconGem,
  BIconGlobe,
  BIconEject,
} from "bootstrap-icons-vue";
import QuickSkinCheckoutModal from "../modals/QuickSkinCheckoutModal.vue";
export default {
  name: "SkinOfChampion",
  props: {
    champion: Object,
    championSkin: Object,
  },
  components: {
    BIconPiggyBank,
    BIconGem,
    BIconGlobe,
    BIconEject,
    QuickSkinCheckoutModal,
  },
  data() {
    return {
      skinId: 0,
      price: 7.22,
      imageLoading: false,
      imgSource: "",
      mounted: false,
    };
  },
  methods: {
    getSkinId() {
      var id = this.championSkin.id.toString();
      id = id.charAt(id.length - 2) + id.charAt(id.length - 1);
      this.skinId = parseInt(id);

      if (this.championSkin.id === 9009) {
        this.champion.id = "FiddleSticks";
      }
      this.imgSource =
        "https://ddragon.leagueoflegends.com/cdn/img/champion/loading/" +
        this.champion.id +
        "_" +
        this.skinId +
        ".jpg";
    },
    priceUpper() {
      if (this.championSkin.rarity === "kNoRarity") {
        this.price = 5.49;
      }
      if (this.championSkin.rarity === "kEpic") {
        this.price = 6.49;
      }
      if (this.championSkin.rarity === "kMythic") {
        this.price = 7.49;
      }
      if (this.championSkin.rarity === "kLegendary") {
        this.price = 8.49;
      }
      if (this.championSkin.rarity === "kUltimate") {
        this.price = 9.49;
      }
      this.mounted = true;
    },
  },
  mounted() {
    this.getSkinId();
    this.priceUpper();
  },
  watch: {
    imgSource: function () {
      this.imageLoading = true;
    },
  },
};
</script>

<style scoped>
.card {
  border: none !important;
  background: #161616;
  border-radius: 5px;
}
.img-size-pos {
  width: auto;
  margin: 5px;
  object-fit: cover;
  object-position: top;
}
.button-buy-now {
  margin: auto;
  margin-top: -50px;
  margin-left: 20px;
  margin-right: 20px;
  width: auto;
}
.button-warranty {
  border: none !important;
  font-size: 14px;
  position: absolute;
  margin: auto 15px auto auto;
  right: 0;
  padding: 7px;
  z-index: 2;
  width: 90px;
  margin-top: 20px;
}
.hidden {
  visibility: hidden;
}
.epic {
  background-color: #e569fb !important;
}
.legendary {
  background-color: #e69138 !important;
}
.mythic {
  background-color: #9900ff !important;
}
</style>
