<template>
  <transition tag="div" name="fade" mode="out-in">
    <div v-if="mounted" class="row justify-content-center">
      <SkinOfChampion
        v-for="championSkin in championSkins"
        :key="championSkin.id"
        :championSkin="championSkin"
        :champion="champion"
        :royalty="royalty"
      />
    </div>
  </transition>
</template>

<script>
import axios from "axios";
import SkinOfChampion from "./SkinOfChampion.vue";
export default {
  name: "SkinsOfChampion",
  components: {
    SkinOfChampion,
  },
  props: {
    champion: Object,
    skins: Object,
    region: String,
  },
  data() {
    return {
      championSkins: [],
      mounted: false,
      royalty: {},
    };
  },
  methods: {
    getSkins() {
      axios
        .get(
          "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/skins.json"
        )
        .then((res) => {
          var found = [];
          this.championSkins = [];
          var champKey = this.champion.key;
          if (champKey.length === 2) {
            champKey = this.champion.key + "0";
          }
          found = Object.values(res.data).filter(
            (skin) =>
              skin.isBase === false &&
              skin.isLegacy === false &&
              skin.loadScreenPath.includes(this.champion.id)
          );
          found.forEach((options) => {
            if (this.skins.some((skin) => skin === options.id)) {
              options.available = true;
              options.region = this.region;
            } else {
              options.available = false;
              options.region = this.region;
            }
          });
          this.championSkins = found;
        });
    },
    getRoyalty() {
      axios.get(`/api/royalty/${this.$store.getters.getId}`).then((res) => {
        this.royalty = res.data;
        this.mounted = true;
      });
    },
  },
  mounted() {
    this.mounted = false;
    this.getSkins();
    if (this.$store.getters.isLogged) {
      this.getRoyalty();
    } else {
      this.royalty = {
        active: false,
      }
      this.mounted = true;
    }
  },
  watch: {
    $route(to, from) {
      if (to.query.champion && to.query.champion != from.query.champion) {
        this.getSkins();
      }
    },
    region: function (newVal, oldVal) {
      this.getSkins();
    },
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease !important;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
