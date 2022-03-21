<template>
  <div>
    <div @click="getChamp" class="card text-light cursor py-3">
      <img
        class="img-circle"
        :src="
          'http://ddragon.leagueoflegends.com/cdn/' +
          version +
          '/img/champion/' +
          champion.id +
          '.png'
        "
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
  methods: {
    getChamp() {
      this.$emit("champion", this.champion);
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
