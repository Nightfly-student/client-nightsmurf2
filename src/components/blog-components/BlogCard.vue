<template>
  <div class="container-xl divider-top pb-4">
    <div class="row h-100">
      <div class="col-12 col-md-4" v-for="blog in blogs" :key="blog.slug">
        <div
          @click="$router.push(`/blog/${blog.slug}`)"
          class="card text-light h-100 Regular shadow"
        >
          <div class="row no-gutters">
            <div class="col-lg-12 col-sm-12 col-12 text-center">
              <img :src="blog.frontmatter.socialImage" class="img-fluid img-size p-2" alt="Blog post Image" :title="blog.frontmatter.title" />
            </div>
            <div class="col-lg-12 col-sm-12 col-12">
              <div class="card-block px-2 pt-4">
                <h4 class="card-title text-center">{{ blog.frontmatter.title }}</h4>
                <p
                  class="card-text pb-4 mb-5"
                  v-html="
                    blog.frontmatter.metaDesc
                  "
                ></p>
              </div>
              <div class="card-footer">
                <div class="text-center">
                  <router-link :to='"/blog/"+blog.slug' class="btn btn-primary w-75">Read More</router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "BlogCard",
  data() {
    return {
      blogs: [],
    };
  },
  methods: {
    getBlogPosts() {
      axios.get("/api/blogs").then((res) => {
        this.blogs = res.data;
      });
    },
  },
  mounted() {
    this.getBlogPosts();
  },
};
</script>

<style scoped>
.card {
  border: none;
  background: #161616;
  cursor: pointer;
}
.img-size {
  max-width: 100%;
  border-radius: 10px;
}
.card-footer {
  position: absolute;
  bottom: 0;
  width: 100%;
}
</style>
