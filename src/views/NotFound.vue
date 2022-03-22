<template>
  <div class="pt-5 text-light">
    <div class="div-top text-center">
      <h1 class="fs-huge">404</h1>
      <h3>RIP... Page not Found</h3>
      <p>Maybe this page ragequitted</p>
      <button class="btn btn-primary" @click="$router.push('/')">Go To Home</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotFound",
};
</script>

<style scoped>
.div-top {
  padding-top: 200px;
}
.fs-huge {
    font-size: 160px;
}
</style>
