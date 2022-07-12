<template>
  <div>
    <header class="text-light">
      <div class="container-xl">
        <div class="row">
          <div class="col-xl-12 col-sm-12 col-12">
            <h1 class="pt-3 text-center">FAQ</h1>
          </div>
        </div>
      </div>
    </header>
    <div class="container-xl mt-5 pb-5">
      <div>
        <h2 class="text-white">Accounts</h2>
        <AccountFaq />
      </div>
      <div class="mt-5">
        <h2 class="text-white">Payment</h2>
        <PaymentFaq />
      </div>
    </div>
  </div>
</template>

<script>
import AccountFaq from "../components/faq-boxes/AccountsFaq.vue";
import PaymentFaq from "../components/faq-boxes/PaymentFaq.vue";
export default {
  name: "frequently-asked-questions",
  components: {
    AccountFaq,
    PaymentFaq
  },
};
</script>

<style></style>
