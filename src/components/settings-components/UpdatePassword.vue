<template>
  <div>
    <Form
      class="card-white text-light"
      :validation-schema="schema"
      @submit="onSubmit"
    >
      <h2 class="text-center">Change Password</h2>
      <!-- Email input -->
      <div class="form-outline mb-4">
        <Field
          type="password"
          name="oldPassword"
          id="oldPassword"
          class="form-control form-control-lg"
        />
        <label class="form-label" for="oldPassword">Old Password</label>
        <ErrorMessage
          class="form-label text-danger float-end"
          name="oldPassword"
        />
      </div>

      <!-- Password input -->
      <div class="form-outline mb-4">
        <Field
          type="password"
          id="newPassword"
          class="form-control form-control-lg"
          name="newPassword"
        />
        <label class="form-label" for="newPassword">New Password</label>
        <ErrorMessage
          class="form-label text-danger float-end"
          name="newPassword"
        />
      </div>

      <!-- Password input -->
      <div class="form-outline mb-4">
        <Field
          type="password"
          id="confirmNewPassword"
          class="form-control form-control-lg"
          name="confirmNewPassword"
        />
        <label class="form-label" for="confrimNewPassword"
          >Confirm New Password</label
        >
        <ErrorMessage
          class="form-label text-danger float-end"
          name="confirmNewPassword"
        />
      </div>

      <div class="d-flex justify-content-around align-items-center mb-4"></div>
      <div class="text-center">
        <button type="submit" class="btn btn-primary btn-lg btn-block w-100">
          Update Password
        </button>
      </div>
    </Form>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import axios from "axios";
import * as yup from "yup";
import { authHeader } from '../../helpers/authHeader';

export default {
  name: "UpdatePassword",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object({
      oldPassword: yup.string().required("No password provided."),
      newPassword: yup
        .string()
        .required("No password provided.")
        .min(8, "Password is too short - should be 8 chars minimum.")
        .matches(/[a-zA-Z]/, "Password can only contain Latin letters.")
        .matches(/^\S+$/, "No Whitespace Allowed"),
      confirmNewPassword: yup
        .string()
        .required("Please confirm your password")
        .oneOf([yup.ref("newPassword"), null], "Passwords don't match."),
    });
    return {
      schema,
    };
  },
  methods: {
    onSubmit(values, { resetForm }) {
      axios
        .put(
          `api/users/${JSON.parse(localStorage.getItem("user"))._id}/password`,
          { oldPass: values.oldPassword, newPass: values.newPassword },
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
