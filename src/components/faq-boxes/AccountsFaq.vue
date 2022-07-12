<template>
  <div>
    <div class="accordion accordion-flush" id="accordionFlushExample">
      <div class="accordion-item m-4 border-0">
        <h2 class="accordion-header" id="flush-headingOne">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#flush-collapseOne"
            aria-expanded="false"
            aria-controls="flush-collapseOne"
          >
            What is the banrate of an account?
          </button>
        </h2>
        <div
          id="flush-collapseOne"
          class="accordion-collapse collapse"
          aria-labelledby="flush-headingOne"
          data-bs-parent="#accordionFlushExample"
        >
          <div class="accordion-body bg-dark">
            Our banrate is 0.01%. The bans that happen are banned often for
            scripting or other milicious software. But if you are the unlucky
            one... We will replace your account with a fresh new one.
          </div>
        </div>
      </div>
      <div class="accordion-item m-4 border-0">
        <h2 class="accordion-header" id="flush-headingTwo">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#flush-collapseTwo"
            aria-expanded="false"
            aria-controls="flush-collapseTwo"
          >
            What are the quality of the accounts?
          </button>
        </h2>
        <div
          id="flush-collapseTwo"
          class="accordion-collapse collapse"
          aria-labelledby="flush-headingTwo"
          data-bs-parent="#accordionFlushExample"
        >
          <div class="accordion-body bg-dark">
            Our accounts are of the highest quality. The accounts are made with
            care and love using good vpns and software to make it past riot
            security.
          </div>
        </div>
      </div>
      <div class="accordion-item m-4 border-0">
        <h2 class="accordion-header" id="flush-headingThree">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#flush-collapseThree"
            aria-expanded="false"
            aria-controls="flush-collapseThree"
          >
            What does Ranked-Ready mean?
          </button>
        </h2>
        <div
          id="flush-collapseThree"
          class="accordion-collapse collapse"
          aria-labelledby="flush-headingThree"
          data-bs-parent="#accordionFlushExample"
        >
          <div class="accordion-body bg-dark">
            Ranked-ready means that the account is ready for ranked. Ranked is
            an gamemode were you play for ranks. To play this you need to be
            level 30. We don't want you to waste days leveling, instead play
            directly on a fresh account ready for ranked.
          </div>
        </div>
      </div>
    <div class="accordion-item m-4 border-0">
        <h2 class="accordion-header" id="flush-headingFour">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#flush-collapseFour"
            aria-expanded="false"
            aria-controls="flush-collapseFour"
          >
            How do I recieve my account?
          </button>
        </h2>
        <div
          id="flush-collapseFour"
          class="accordion-collapse collapse"
          aria-labelledby="flush-headingFour"
          data-bs-parent="#accordionFlushExample"
        >
          <div class="accordion-body bg-dark">
            You will recieve your Account after you paid on our website, through our order page. You will be redirected to this page once the payment has been made. It could be that you have to wait before your payment is processed. Then you will recieve an email with more details about that.
          </div>
        </div>
    </div>
    <div class="accordion-item m-4 border-0">
        <h2 class="accordion-header" id="flush-headingFour">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#flush-collapseFive"
            aria-expanded="false"
            aria-controls="flush-collapseFive"
          >
            What rank will my account be?
          </button>
        </h2>
        <div
          id="flush-collapseFive"
          class="accordion-collapse collapse"
          aria-labelledby="flush-headingFive"
          data-bs-parent="#accordionFlushExample"
        >
          <div class="accordion-body bg-dark">
            Our accounts are completely fresh and Unranked, which means that there are no ranked accounts played on the account.
          </div>
        </div>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AccountFaq",
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
.accordion-button:focus {
    box-shadow: none;
    border-color: rgba(0,0,0,.125);
}
</style>
