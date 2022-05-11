<template>
  <div>
    <header class="text-light">
      <div class="container-xl">
        <div class="row">
          <div class="col-xl-12 col-sm-12 col-12">
            <h1 class="pt-3 text-center">Settings</h1>
          </div>
        </div>
      </div>
    </header>
    <div>
      <div class="overflow-auto background-color">
        <ul class="nav justify-content-center">
          <li class="nav-item">
            <a
              class="nav-link"
              @click="onClick('CP')"
              :class="{ active: CP }"
              aria-current="page"
              >Change Password</a
            >
          </li>
          <li class="nav-item">
            <a class="nav-link" @click="onClick('CE')" :class="{ active: CE }"
              >Change Email</a
            >
          </li>
        </ul>
      </div>
    </div>
    <div class="divider-top" v-if="CP">
      <div class="row justify-content-center m-0">
        <div class="col-xl-3 col-lg-4 col-md-5 col-sm-12 m-0">
          <UpdatePassword class="pb-5" />
        </div>
      </div>
    </div>
    <div class="divider-top" v-if="CE">
      <div class="row justify-content-center m-0">
        <div class="col-xl-3 col-lg-4 col-md-5 col-sm-12 m-0">
          <UpdateEmail class="pb-5" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UpdatePassword from "../../components/settings-components/UpdatePassword.vue";
import UpdateEmail from "../../components/settings-components/UpdateEmail.vue";
export default {
  name: "Settings",
  components: {
    UpdatePassword,
    UpdateEmail,
  },
  data() {
    return {
      CP: true,
      CE: false,
    };
  },
  methods: {
    onClick(value) {
      this.CP = false;
      this.CE = false;
      this[value] = true;
    },
  },
};
</script>

<style scoped>
.background-color {
  background-color: #111111;
}
.nav-link {
  color: white;
  cursor: pointer;
}
.nav-link:hover {
  color: gainsboro;
}
.active {
  color: #0d62e0;
}
.active:hover {
  color: #3d87f5;
}
</style>
