<template>
  <div>
    <header class="text-light">
      <div class="container-xl">
        <div class="row">
          <div class="col-xl-7 col-sm-12 col-12">
            <h1 class="pt-3">Blog Posts</h1>
            <p class="">Written with love</p>
          </div>
          <div class="col-xl-5 col-sm-12 col-12"></div>
        </div>
      </div>
    </header>

    <div class="container-xl divider-top pb-4">
      <div
        v-for="blog in blogs"
        :key="blog.slug"
        @click="$router.push(`/blog/${blog.slug}`)"
        class="card mb-4 text-light"
      >
        <div class="row no-gutters">
          <div class="col-lg-5 col-sm-12 col-12">
            <img
              :src="blog.frontmatter.socialImage"
              class="img-fluid img-size"
              alt=""
            />
          </div>
          <div class="col-lg-6 col-sm-12 col-12">
            <div class="card-block px-2 pt-4">
              <h4 class="card-title">{{ blog.frontmatter.title }}</h4>
              <p
                class="card-text pb-4 mb-5"
                v-html="blog.frontmatter.metaDesc"
              ></p>
              <div class="position-absolute bottom-0 mb-3">
                <router-link :to="'/blog/' + blog.slug" class="btn btn-primary"
                  >Read More</router-link
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from "@vue/reactivity";
import { useHead } from "@vueuse/head";
import { computed } from "@vue/runtime-core";
import axios from "axios";

export default {
  name: "Blogs",
  data() {
    return {
      blogs: [],
    };
  },
  created() {
    axios.get("/api/blogs").then((res) => {
      this.blogs = res.data;
      console.log(res.data);
    });
  },
  setup() {
    const siteData = reactive({
      title: "Our Blog - Nightsmurf",
      description:
        "Nightsmurf Blog posts, these posts are about League Of Legends Smurfing and League Of Legends Related Content. Please Check it Out!",
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
.card {
  border: none;
  background: #161616;
}
.img-size {
  max-width: 100%;
}
.card-title:hover {
  cursor: pointer;
  text-decoration: underline;
}
</style>
