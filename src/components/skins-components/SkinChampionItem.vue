<template>
  <div>
    <div @click="getChamp" class="card text-light cursor py-3 shadow-sm">
      <img
        class="img-circle"
        :src="imageLoading ? '/images/blank_champion.png' : imgSource"
        @load="imageLoading = false"
        :alt="championName + ' Rounded Image'"
        :title="championName"
      />
      <h3 class="text-center p-2">{{ champion.id }}</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: "SkinChampionItem",
  props: {
    champion: Object,
    version: String,
  },
  data() {
    return {
      imgSource: "",
      imageLoading: true,
      championName: ""
    };
  },
  methods: {
    getChamp() {
      this.$emit("champion", this.champion);
    },
    getUrl() {
      this.championName = this.champion.id;

      this.imgSource =
        "https://ddragon.leagueoflegends.com/cdn/" +
        this.version +
        "/img/champion/" +
        this.championName +
        ".png";
    },
  },
  mounted() {
    this.getUrl();
  },
  watch: {
    imgSource: function () {
      this.imageLoading = true;
    },
  },
  emits: ["champion"],
};
</script>

<style scoped>
.card {
  border: none !important;
  background: #161616;
  border-radius: 5px;
}
.card:hover {
  transform: scale(1.1);
}
.img-circle {
  border-radius: 50%;
  height: 75px;
  width: 75px;
  margin: auto;
}
.cursor {
  cursor: pointer;
}
</style>
