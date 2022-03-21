<template>
  <div class="d-flex justify-content-center m-3">
    <div>
      <div class="input-group">
        <div class="form-outline">
          <input
            id="search-input"
            type="search"
            @click="$emit('click')"
            v-on:input="$emit('searchValue', $event.target.value)"
            class="form-control search-size"
            :placeholder="'Search All Champions (' + championLength + ')'"
          />
        </div>
        <button id="search-button" type="button" class="btn">
          <BIconSearch class="fs-5 text-light" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { BIconSearch } from "bootstrap-icons-vue";
export default {
  name: "SkinSearch",
  props: {
    championLength: Number,
  },
  components: {
    BIconSearch,
  },
  emits: ["searchValue", "click"],
};
</script>

<style scoped>
.search-size {
  width: 400px !important;
  font-size: 18px;
  background-color: #161616;
  border: #161616;
  color: white;
}
#search-button {
  margin-left: -46px;
  margin-bottom: 2px;
}
</style>
