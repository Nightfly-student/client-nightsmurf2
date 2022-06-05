<template>
  <div class="text-light">
    <div class="modal fade" :id="'WinItem'">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5>Congrationlations</h5>
            <button
              type="button"
              class="btn-close btn-close-white"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body py-4 mx-3">
            <div>
              <p class="text-center fs-6 m-0 p-0">
                You Won {{ lootItem.name }}
              </p>
              <p
                v-if="lootItem.priceItem != 'free'"
                class="text-center m-0 p-0"
              >
                Your Coupon: <strong class="fs-4 text-primary">{{coupon}}</strong> <br/>Coupons expire in 24 hours
              </p>
              <p v-else class="text-center m-0 p-0">
                Open a ticket in our Discord Server and claim your price!
              </p>
              <p class="text-center mt-4">You may try again in 24 hours...</p>
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
  name: "WinItemModal",
  props: {
    loot: String,
    ip: String,
  },
  data() {
    return {
      lootItem: {},
      mounted: false,
      coupon: '',
    };
  },
  methods: {
    winnerLoot() {
      this.mounted = false;
      axios.get(`/api/loot/${this.loot}`).then((res) => {
        this.lootItem = res.data;
        this.postWinning();
        this.mounted = true;
      });
    },
    postWinning() {
      var lootType = "coupon";
      if(this.lootItem.pricItem === "free") {
        lootType = "account";
      } 
      if(this.lootItem.pricItem === "coin") {
        lootType = "coin";
      }
      axios.post("/api/winnings", {
        loot: this.lootItem._id,
        ip: this.ip,
        lootType: lootType
      }).then((res) => {
        if(res.data.code) {
          this.coupon = res.data.code
        }
      });
    },
  },
  mounted() {
    this.winnerLoot();
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
