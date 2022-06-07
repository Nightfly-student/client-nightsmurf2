<template>
  <div>
    <TopBanner />
    <notifications width="auto" />
    <NavBar />
    <div class="wrapper">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
    <Footer />
  </div>
</template>

<script>
import NavBar from "./components/layout/NavBar.vue";
import TopBanner from "./components/layout/TopBanner.vue";
import Footer from "./components/layout/Footer.vue";
export default {
  components: {
    NavBar,
    Footer,
    TopBanner,
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Fredoka&family=Merriweather+Sans:wght@800&display=swap");

body {
  font-family: "Fredoka", sans-serif !important;
  background: #111111 !important;
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
  font-size: 16px !important;
  color: #ffffff;
  text-align: center !important;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
