<template>
  <div>
    <Form :validation-schema="schema" @submit="onSubmit">
      <div class="row gy-3">
        <div class="col-12 col-md-6">
          <label class="form-label" for="email">Email address</label>
          <ErrorMessage class="form-label text-danger float-end" name="email" />
          <Field
            type="email"
            name="email"
            id="email"
            class="form-control form-control-lg"
            placeholder="youremail@domain.com"
          />
        </div>
        <div class="col-12 col-md-6">
          <label class="form-label" for="email"
            >Your Name or Existing Account Name</label
          >
          <ErrorMessage class="form-label text-danger float-end" name="name" />
          <Field
            type="text"
            name="name"
            id="name"
            class="form-control form-control-lg"
            placeholder="John Doe"
          />
        </div>
        <div class="col-12 col-md-6">
          <label class="form-label" for="email">Select Platform</label>
          <select
            v-model="platform"
            class="form-select form-control form-control-lg"
          >
            <option value="0" selected>Select a platform</option>
            <option value="twitch">Twitch</option>
            <option value="twitter">Twitter</option>
            <option value="facebook">Facebook</option>
            <option value="youtube">YouTube</option>
            <option value="instagram">Instagram</option>
            <option value="website">Website</option>
            <option value="tiktok">TikTok</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div class="col-12 col-md-6">
          <label class="form-label" for="email">Average Traffic/Viewers</label>
          <ErrorMessage
            class="form-label text-danger float-end"
            name="traffic"
          />
          <Field
            type="number"
            name="traffic"
            id="traffic"
            class="form-control form-control-lg"
            placeholder="200"
          />
        </div>
        <div class="col-12 col-md-6">
          <label class="form-label" for="email">Url to platform</label>
          <ErrorMessage class="form-label text-danger float-end" name="url" />
          <Field
            type="text"
            name="url"
            id="url"
            class="form-control form-control-lg"
            placeholder="Full Url"
          />
        </div>
        <div class="col-12 col-md-6">
          <label class="form-label" for="email">Your Discord</label>
          <ErrorMessage
            class="form-label text-danger float-end"
            name="discord"
          />
          <Field
            type="text"
            name="discord"
            id="discord"
            class="form-control form-control-lg"
            placeholder="Discord#0000"
          />
        </div>
        <div class="col-12">
          <label class="form-label" for="email"
            >Why should we accept you?</label
          >
          <Field
            as="textarea"
            name="description"
            id="description"
            class="form-control form-control-lg"
          />
        </div>
      </div>
      <button type="submit" class="btn btn-primary btn-lg btn-block w-100 mt-3">
        Send Application
      </button>
    </Form>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import axios from "axios";
export default {
  name: "AffiliateForm",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object({
      email: yup.string().required().email(),
      name: yup.string().required(),
      traffic: yup.number().required(),
      url: yup
        .string()
        .matches(
          /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
          "Enter correct url!"
        ),
      discord: yup.string(),
    });
    return {
      schema,
      platform: "0",
    };
  },
  methods: {
    onSubmit(values) {
      if (this.platform != "0") {
        axios
          .post("/api/submissions", {
            email: values.email,
            name: values.name,
            discord: values.discord,
            description: values.description,
            traffic: values.traffic,
            url: values.url,
            platform: this.platform,
          })
          .then((res) => {
            this.$notify({
              text: res.data.message,
              type: "success",
            });
            this.$refs.form.resetForm();
          })
          .catch((err) => {
            this.$notify({
              text: err.response.data.message,
              type: "error",
            });
          });
      } else {
        this.$notify({
          text: "No Platform Selected",
          type: "error",
        });
      }
    },
  },
};
</script>

<style scoped>
.form-select {
  font-size: 1.25rem;
  color: #6c757d;
}
</style>
