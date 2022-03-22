<template>
    <div>
      <notifications width="auto"/>
      <NavBar />
      <div class="wrapper">
        <RouterView />
      </div>
      <Footer />
    </div>
</template>

<script>
import NavBar from "./components/layout/NavBar.vue";
import Footer from "./components/layout/Footer.vue";
export default {
  components: {
    NavBar,
    Footer,
  },
  created() {
    this.$store.dispatch('autoLogin');
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Fredoka&family=Merriweather+Sans:wght@800&display=swap");

body {
  font-family: "Fredoka", sans-serif !important;
}
h1,
h2,
h3,
h4 {
  font-family: "Merriweather Sans", sans-serif !important;
}
.wrapper {
  background: #121212;
  min-height: 100vh;
}
.vue-notification {
  margin: 0 5px 5px;
  padding: 10px;
  font-size: 16px!important;
  color: #ffffff;
  text-align: center!important;
}
</style>
