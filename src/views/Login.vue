<template>
  <div>
    <section class="vh-100 min-height">
      <div class="container py-5 h-100">
        <div class="row d-flex align-items-center justify-content-center h-100">
          <div class="col-md-8 col-lg-7 col-xl-6">
            <img
              src="/images/yi_header.png"
              class="img-fluid img-login"
              alt="Master yi"
            />
          </div>
          <div class="col-md-7 col-lg-5 col-xl-5 offset-xl-1 text-light">
            <Form
              class="card-white m-1 Regular shadow"
              :validation-schema="schema"
              @submit="onSubmit"
            >
              <h2 class="text-center">Login</h2>
              <!-- Email input -->
              <div class="form-outline mb-4">
                <Field
                  type="email"
                  name="email"
                  id="email"
                  class="form-control form-control-lg"
                />
                <label class="form-label" for="email">Email address</label>
                <ErrorMessage
                  class="form-label text-danger float-end"
                  name="email"
                />
              </div>

              <!-- Password input -->
              <div class="form-outline mb-4">
                <Field
                  type="password"
                  id="password"
                  class="form-control form-control-lg"
                  name="password"
                />
                <label class="form-label" for="password">Password</label>
                <ErrorMessage
                  class="form-label text-danger float-end"
                  name="password"
                />
              </div>

              <div
                class="d-flex justify-content-around align-items-center mb-4"
              ></div>
              <div class="text-center">
                <button
                  type="submit"
                  class="btn btn-primary btn-lg btn-block w-100"
                >
                  Sign in
                </button>
                <div
                  class="d-flex justify-content-around align-items-center p-4"
                >
                  <router-link to="/register"
                    >Don't have an account?</router-link
                  >
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
export default {
  name: "Login",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object({
      email: yup.string().required().email(),
      password: yup.string().required("No password provided."),
    });
    return {
      schema,
    };
  },
  methods: {
    onSubmit(values) {
      this.$store
        .dispatch("login", { email: values.email, password: values.password })
        .then(() => {
          this.$router.push("/");
          this.$notify({
            text: "Successfully Logged In",
            type: "success",
          });
        }).catch((err) => {
          this.$notify({
            text: err,
            type: "error",
          });
        });
    },
  },
};
</script>

<style scoped>
.img-login {
  max-height: 400px;
}
.card-white {
  padding: 30px;
  background: #161616;
  border-radius: 5px;
}
@media (max-width: 921px) {
  .min-height {
    height: 100% !important;
  }
}
</style>
