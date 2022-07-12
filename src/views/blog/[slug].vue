<template>
  <div class="container-xl pt-5" v-if="mounted">
    <Head>
      <title>
        {{ $route.params.slug.replaceAll("-", " ") }}
      </title>
    </Head>
    <div class="pt-5 text-light">
      <h1 class="text-center">{{ blog.front.title }}</h1>
      <img class="img-size pt-3 pb-3" :src="blog.front.socialImage" />
      <button class="btn btn-primary m-4" @click="$router.push('/blog')">
        Return to Blog
      </button>
      <div id="blogPost" class="pb-5">
      <Markdown :source="blog.content" />
      </div>
    </div>
  </div>
</template>

<script>
import { Head, useHead } from "@vueuse/head";
import axios from "axios";
import Markdown from 'vue3-markdown-it';
import { reactive } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";
import { useRoute } from "vue-router";
export default {
  name: "BlogItem",
  data() {
    return {
      blog: [],
      mounted: false,
    };
  },
  components: {
    Markdown
  },
  methods: {
    getBlogPost() {
      axios.get(`/api/blogs/${this.$route.params.slug}`).then((res) => {
        this.blog = res.data;
        this.mounted = true;
      });
    },
  },
  created() {
    this.getBlogPost();
  },
  setup() {
    const route = useRoute();
    const siteData = reactive({
      title: `${route.params.slug.replaceAll("-", " ")} - Nightsmurf`,
      image:
        "https://res.cloudinary.com/droomsocial/image/upload/v1647780317/yi_header_vradr7.png",
      type: "article",
      url: new URL(location.href),
    });
    useHead({
      title: computed(() => siteData.title),
      meta: [
        {
          property: "og:title",
          content: computed(() => siteData.title),
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
.img-size {
  width: 100%;
}
#blogPost /deep/ img {
   max-width: 100%!important;
}
</style>
