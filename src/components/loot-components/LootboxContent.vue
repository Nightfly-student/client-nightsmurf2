<template>
  <div>
    <div class="card card-top shadow">
      <div
        :class="{
          common: loot.rarity === 'common',
          uncommon: loot.rarity === 'uncommon',
          rare: loot.rarity === 'rare',
          epic: loot.rarity === 'epic',
          legendary: loot.rarity === 'legendary',
        }"
        class="rarity "
      >
        {{ loot.rarity.charAt(0).toUpperCase() + loot.rarity.slice(1) }}
      </div>
      <div class="row justify-content-center p-3">
        <div class="card card-middle w-80">
          <img class="img-fluid img-hover" :alt="loot.name" title="Nighsmurf lootbox" :src="loot.image" />
        </div>
      </div>
      <p class="text-center fs-5 pt-2">{{ loot.name }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "LootboxContent",
  props: {
    loot: Object,
  },
};
</script>

<style scoped>
.card-top {
  border: none !important;
  background: #161616;
}
.card {
  border-radius: 10px;
}
.card-middle {
  background: #151515;
}
.card-top:hover {
  transform: scale(1.1);
}
.w-80 {
  width: 90%;
}
.rarity {
  position: absolute;
  margin-top: 25px;
  margin-right: 40px;
  padding: 5px;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 10px;
  right: 0;
  z-index: 10;
  font-weight: bold;
}
.epic {
  background-color: #e569fb !important;
}
.legendary {
  background-color: #e69138 !important;
}
.rare {
  background-color: #00aaff !important;
}
.uncommon {
  background-color: #354de7 !important;
}
.common {
  background-color: #9c9c9c !important;
}
</style>
