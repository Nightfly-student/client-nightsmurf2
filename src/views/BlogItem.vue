<template>
  <div class="container-xl pt-5" v-if="mounted">
    <Head>
      <title>
        {{ $route.params.slug.replaceAll("-", " ") }}
      </title>
    </Head>
    <div class="pt-5 text-light">
      <h1 class="text-center">{{ blog.title }}</h1>
      <img class="img-size pt-3 pb-3" :src="blog.image" />
      <button class="btn btn-primary m-4" @click="$router.push('/blog')">
        Return to Blog
      </button>
      <div class="container-lg w-75 pb-5" v-html="blog.content"></div>
    </div>
  </div>
</template>

<script>
import { Head } from "@vueuse/head";
import axios from "axios";
export default {
  name: "BlogItem",
  data() {
    return {
      blog: [],
      mounted: false,
    };
  },
  methods: {
    getBlogPost() {
      axios.get(`/api/blogs/${this.$route.params.slug}`).then((res) => {
        this.blog = res.data;
        this.mounted = true;
      });
    },
  },
  mounted() {
    this.getBlogPost();
  },
};
</script>

<style scoped>
.img-size {
  width: 100%;
}
</style>
