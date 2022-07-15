<template>
  <div class="text-light">
    <div class="modal fade" :id="'CreateUrl'">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5>Create Url</h5>
            <button
              type="button"
              class="btn-close btn-close-white"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body py-4 mx-3">
            <div>
              <input
                v-model="url"
                placeholder="Url Name"
                type="text"
                class="form-control mb-2"
              />
              <p>url will be https://nightsmurf.com/r/{{ url }}</p>
              <button
                data-bs-dismiss="modal"
                aria-label="Close"
                @click="addUrl"
                class="btn btn-primary"
              >
                Create Url
              </button>
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
  name: "CreateUrlModal",
  props: {
    affiliate: Object,
  },
  data() {
    return {
      url: "",
    };
  },
  methods: {
    addUrl() {
      axios
        .put(`/api/affiliates/url`, {
          url: this.url.toLowerCase(),
          user: this.affiliate.user,
        })
        .then((res) => {
          this.affiliate.url = res.data;
        });
    },
  },
};
</script>

<style scoped>
.modal {
  background: #16161642;
}
.modal-content {
  background: #161616;
}
</style>
