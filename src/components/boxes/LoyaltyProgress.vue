<template>
  <div class="container-xl">
    <div class="row justify-content-center text-light text-center g-4">
      <LoyaltyBox
        :royalty="royalty"
        :loyalty="loyalty"
        v-for="loyalty in loyalties"
        :key="loyalty._id"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import LoyaltyBox from "./LoyaltyBox.vue";
export default {
  name: "LoyaltyProgress",
  data() {
    return {
      loyalties: [],
      royalty: {},
    };
  },
  components: {
    LoyaltyBox,
  },
  methods: {
    getLoyalties() {
      axios.get("/api/loyalty").then((res) => {
        this.loyalties = res.data;
      });
    },
    getRoyalty() {
      axios.get(`/api/royalty/${this.$store.getters.getId}`).then((res) => {
        this.royalty = res.data;
      });
    },
  },
  mounted() {
    this.getLoyalties();
    if (this.$store.getters.isLogged) {
      this.getRoyalty();
    }
  },
};
</script>

<style></style>
