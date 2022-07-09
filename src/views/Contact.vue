<template>
  <div>
    <header class="text-light">
      <div class="container-xl">
        <div class="row">
          <div class="col-xl-12 col-sm-12 col-12">
            <h1 class="pt-3 text-center">Contact Us</h1>
          </div>
        </div>
      </div>
    </header>
    <div class="divider-top">
      <div class="container-xl text-light">
        <div>
          <h1>Hello, We are Nightsmurf :)</h1>
          <p class="m-0">
            We are here to help you with the questions you might have.
          </p>
          <p>We are looking forward to see your questions.</p>
        </div>
        <div class="w-50 bg-primary p-2 rounded">
          <h4 class="m-0">
            You can contact support through our
            <span @click="discord">Discord server</span>.
          </h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useHead } from "@vueuse/head";
import { reactive } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";
export default {
  name: "Contact",
  methods: {
    discord() {
      window.open("https://discord.gg/yQ82SJHcU4");
    },
  },
  setup() {
    const siteData = reactive({
      title: "Got Any Issue? Contact Us Now - Nightsmurf",
      description:
        "Need any support with your League of Legends Smurf Account, Dont mind asking us over on Discord or Mail us",
      image:
        "https://res.cloudinary.com/droomsocial/image/upload/v1647780317/yi_header_vradr7.png",
      type: "website",
      url: new URL(location.href),
    });

    useHead({
      title: computed(() => siteData.title),
      meta: [
        {
          name: `description`,
          content: computed(() => siteData.description),
        },
        {
          property: "og:title",
          content: computed(() => siteData.title),
        },
        {
          property: "og:description",
          content: computed(() => siteData.description),
        },
        {
          property: "og:image",
          content: computed(() => siteData.image),
        },
        {
          property: "og:type",
          content: computed(() => siteData.type),
        },
        {
          property: "og:url",
          content: computed(() => siteData.url),
        },
      ],
      link: [
        {
          rel: "canonical",
          href: computed(() => siteData.url),
        },
      ],
    });
  },
};
</script>

<style scoped>
span {
  color: rgb(3, 3, 3);
}
span:hover {
  color: rgb(39, 39, 39);
  cursor: pointer;
}
</style>
