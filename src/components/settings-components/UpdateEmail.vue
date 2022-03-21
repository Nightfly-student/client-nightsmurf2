<template>
  <div>
    <Form
      class="card-white text-light"
      :validation-schema="schema"
      @submit="onSubmit"
    >
      <h2 class="text-center">Change Email</h2>
      <!-- Email input -->
      <div class="form-outline mb-4">
        <Field
          type="email"
          name="email"
          id="email"
          class="form-control form-control-lg"
        />
        <label class="form-label" for="email">New Email</label>
        <ErrorMessage class="form-label text-danger float-end" name="email" />
      </div>

      <div class="d-flex justify-content-around align-items-center mb-4"></div>
      <div class="text-center">
        <button type="submit" class="btn btn-primary btn-lg btn-block w-100">
          Update Email
        </button>
      </div>
    </Form>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import axios from "axios";
import { authHeader } from "../../helpers/authHeader";

export default {
  name: "UpdateEmail",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object({
      email: yup.string().required().email(),
    });
    return {
      schema,
    };
  },
  methods: {
    onSubmit(values, { resetForm }) {
      axios
        .put(
          `api/users/${JSON.parse(localStorage.getItem("user"))._id}/email`,
          { email: values.email },
          {
            headers: authHeader(),
          }
        )
        .then((res) => {
          this.$notify({
            text: res.data.message,
            type: "success",
          });
        })
        .catch((err) => {
          this.$notify({
            text: err.response.data.message,
            type: "error",
          });
        });
      resetForm();
    },
  },
};
</script>

<style scoped>
.card-white {
  padding: 30px;
  background: #161616;
  border-radius: 5px;
}
</style>
