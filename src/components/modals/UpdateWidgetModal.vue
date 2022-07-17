<template>
  <div class="text-light">
    <div class="modal fade" :id="'WidgetUrl' + affiliate._id">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5>Widget Url</h5>
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
                placeholder="Widget Url Link"
                type="text"
                class="form-control mb-2"
              />
              <button
                data-bs-dismiss="modal"
                aria-label="Close"
                @click="addUrl"
                class="btn btn-primary"
              >
                Create Widget
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
  name: "UpdateWidgetModal",
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
        .post("/api/affiliates/widget", {
          affiliate: this.affiliate._id,
          widget: this.url,
        })
        .then((res) => {
          this.$notify({
            text: res.data.message,
            type: "success",
          });
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
