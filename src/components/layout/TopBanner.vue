<template>
  <div id="infoBar" class="bg-dark fixed-bottom py-10">
    <div class="text-light">
      <div class="row justify-content-center align-items-center">
        <div class="align-items-center col-6 col-sm-6 col-md-8">
          <p class="fs-5 p-0 m-3 text-center size">
            Join our discord for weekly account giveaways and more ways to win
            free accounts!
          </p>
        </div>
        <div class="col-4 col-sm-4 col-md-2 align-items-center">
          <a type="button" href="https://discord.gg/yQ82SJHcU4" target="_blank" class="btn btn-primary m-3 w-75"> Join Now! </a>
        </div>
        <div class="col-2 col-sm-2 col-md-1">
          <button @click="closeBar" class="btn-close btn-close-white mb-4"></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TopBanner",
  methods: {
    closeBar() {
      document.getElementById("infoBar").remove();
    }
  }
};
</script>

<style scoped>
.bg-dark {
  background: #161616 !important;
}
@media only screen and (max-width: 800px) {
#infoBar {
  display: none;
}
  
}
</style>
