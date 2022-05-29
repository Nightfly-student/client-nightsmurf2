<template>
  <div class="banner">
    <h1 id="banner_text" class="text-center text-light p-5">
      Make your dream rank become <span>reality</span>
    </h1>
  </div>
</template>

<script>
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
export default {
  name: "QuoteBanner",
  mounted() {
    gsap.fromTo(
      "#banner_text",
      {
        opacity: 0,
        x: "-100%"
      },
      {
        duration: 1.0,
        opacity: 1,
        x: 0,
        scrollTrigger: {
          trigger: ".banner",
          start: "top 25%",
          end: "bottom 30%",
          immediateRender: false,
          toggleActions: "play",
        },
      }
    );
  },
};
</script>

<style scoped>
.banner {
  background: #161616;
}
span {
  color: #0d62e0;
}
</style>
