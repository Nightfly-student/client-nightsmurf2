<template>
  <div>
    <div class="accordion border-none" id="accordionFlushExample">
      <div class="accordion-item m-4 border-0">
        <h2 class="accordion-header" id="flush-headingSix">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#flush-collapseSix"
            aria-expanded="false"
            aria-controls="flush-collapseSix"
          >
            What Payment methods are available?
          </button>
        </h2>
        <div
          id="flush-collapseSix"
          class="accordion-collapse collapse"
          aria-labelledby="flush-headingSix"
          data-bs-parent="#accordionFlushExample"
        >
          <div class="accordion-body bg-dark">
            We accept the following payment methods: Stripe (Visa, sofort, sepa, alipay, giropay, amex ...)
          </div>
        </div>
      </div>
      <div class="accordion-item m-4 border-0">
        <h2 class="accordion-header" id="flush-headingSeven">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#flush-collapseSeven"
            aria-expanded="false"
            aria-controls="flush-collapseSeven"
          >
            How fast is the payment processed?
          </button>
        </h2>
        <div
          id="flush-collapseSeven"
          class="accordion-collapse collapse"
          aria-labelledby="flush-headingSeven"
          data-bs-parent="#accordionFlushExample"
        >
          <div class="accordion-body bg-dark">
            Most payment providers process the payment instantly. Klarna and Sofort payments may take up to 3 days to process, Due to the fraudulent behaviour on their payment gateway.
          </div>
        </div>
      </div>
      <div class="accordion-item m-4 border-0">
        <h2 class="accordion-header" id="flush-headingEight">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#flush-collapseEight"
            aria-expanded="false"
            aria-controls="flush-collapseEight"
          >
            What happens if the payment fails?
          </button>
        </h2>
        <div
          id="flush-collapseEight"
          class="accordion-collapse collapse"
          aria-labelledby="flush-headingEight"
          data-bs-parent="#accordionFlushExample"
        >
          <div class="accordion-body bg-dark">
            Payment will be canceled and you will recieve an email about why the payment has failed.
          </div>
        </div>
      </div>
    <div class="accordion-item m-4 border-0">
        <h2 class="accordion-header" id="flush-headingNine">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#flush-collapseNine"
            aria-expanded="false"
            aria-controls="flush-collapseNine"
          >
            Why cant I pay with PayPal?
          </button>
        </h2>
        <div
          id="flush-collapseNine"
          class="accordion-collapse collapse"
          aria-labelledby="flush-headingNine"
          data-bs-parent="#accordionFlushExample"
        >
          <div class="accordion-body bg-dark">
            PayPal does not allow microtransactions of grey area businesses such as ours.
          </div>
        </div>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PaymentFaq",
};
</script>

<style scoped>
.bg-dark {
    color:white
}
.accordion-button {
    color: #ffffff;
    background-color: #212529;
}
.accordion-button:after {
  background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23ffffff'><path fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/></svg>") !important;
}
:focus {
  outline: 0 !important;
  box-shadow: 0 0 0 0 rgba(0, 0, 0, 0) !important;
}
</style>
