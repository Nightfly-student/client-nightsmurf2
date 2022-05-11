<template>
  <div>
    <SkinSearch
      :championLength="Object.keys(champions).length"
      @searchValue="checkSearch"
      @click="click"
    />
    <p class="text-center alert alert-warning w-50 m-auto mt-3 mb-3">
      The account only contains the Skin Shard not the Skin itself! You need to
      use the orange essence to unlock it. It's not guaranteed that you will
      have enough, but very likely.
    </p>
    <SkinRegions @selectedRegion="check" />
    <div class="container mt-4 pb-4">
      <transition-group tag="div" name="fade" mode="out-in">
        <div v-if="!gotSelected" class="row g-4 justify-content-center">
          <SkinChampionItem
            class="col-12 col-md-3 col-sm-4"
            v-for="champion in championsHolder"
            :key="champion.key"
            :champion="champion"
            :version="version"
            @champion="checkChampion"
          />
        </div>
        <div v-if="gotSelected" class="row g-4 justify-content-center">
          <SkinsOfChampion
            :champion="selectedChampion"
            :skins="skins"
            :region="region"
          />
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import SkinRegions from "./SkinRegions.vue";
import SkinChampionItem from "./SkinChampionItem.vue";
import SkinSearch from "./SkinSearch.vue";
import SkinsOfChampion from "./SkinsOfChampion.vue";
export default {
  name: "SkinChampions",
  components: {
    SkinChampionItem,
    SkinSearch,
    SkinRegions,
    SkinsOfChampion,
  },
  data() {
    return {
      champions: [],
      championsHolder: [],
      version: "",
      selectedChampion: {},
      gotSelected: false,
      region: "EUW",
      skins: [],
    };
  },
  methods: {
    getVersion() {
      axios
        .get("https://ddragon.leagueoflegends.com/api/versions.json")
        .then((res) => {
          this.version = res.data[0];
          this.getChampions();
        });
    },
    check(reg) {
      this.skins = [];
      this.getSkinIds(reg);
      setTimeout(() => {
        this.region = reg;
      }, 100);
    },
    click() {
      this.gotSelected = false;
      this.selectedChampion = {};
    },
    checkChampion(champion) {
      this.selectedChampion = champion;
      this.gotSelected = true;
    },
    checkSearch(search) {
      if (search.length >= 1) {
        this.championsHolder = this.champions;
        var found = Object.values(this.champions).filter((champ) =>
          champ.id.toLowerCase().includes(search.toLowerCase())
        );
        this.championsHolder = found;
      }
      if (search.length === 0) {
        this.championsHolder = this.champions;
      }
    },
    getChampions() {
      axios
        .get(
          `https://ddragon.leagueoflegends.com/cdn/${this.version}/data/en_US/champion.json`
        )
        .then((res) => {
          this.champions = res.data.data;
          this.championsHolder = res.data.data;
        });
    },
    getSkinIds(reg) {
      axios.get(`/api/licences/skinstock?region=${reg}`).then((res) => {
        this.skins = res.data;
      });
    },
  },
  created() {
    this.getVersion();
    this.getSkinIds(this.region);
  },
  watch: {
    $route(to, from) {
      if (to.query.champion && to.query.champion != from.query.champion) {
        this.gotSelected = false;
        this.selectedChampion = {};
        var found = Object.values(this.champions).filter((champ) =>
          champ.id.toLowerCase().includes(to.query.champion.toLowerCase())
        );
        this.selectedChampion = found[0];
        this.gotSelected = true;
      }
    },
  },
};
</script>

<style scoped>
@media (max-width: 540px) {
  .w-50 {
    width: 85% !important;
  }
}
</style>
