<template>
  <div>
    <h1 class="text-center text-light">Loyalty Program</h1>
    <table class="table table-dark" v-if="loyalties.length != 0">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">When</th>
          <th scope="col">When Reached</th>
          <th scope="col">Discount Amount</th>
          <th scope="col">Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="loyal in loyalties" :key="loyal._id">
          <th scope="row" class="align-middle">{{ loyal.name }}</th>
          <td class="align-middle">{{ loyal.when }}</td>
          <td class="align-middle">{{ loyal.whenReached }} &euro;</td>
          <td class="align-middle">{{ loyal.discount }}%</td>
          <td class="align-middle">
            <button class="btn btn-danger">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="">
      <div class="text-light">
        <div class="mb-3">
          <div class="form-check ps-0">
            <label for="disabledSelect" class="form-label">Loyalty Name</label
            ><br />
            <input
              v-model="name"
              class="form-input"
              type="text"
              id="disabledFieldsetCheck"
              placeholder="Loyalty Name"
            />
          </div>
        </div>
        <div class="mb-3">
          <div class="form-check ps-0">
            <label for="disabledSelect" class="form-label">When Loyalty</label
            ><br />
            <input
              v-model="when"
              class="form-input"
              type="text"
              id="disabledFieldsetCheck"
              placeholder="When Description"
            />
          </div>
        </div>
        <div class="mb-3">
          <div class="form-check ps-0">
            <label for="disabledSelect" class="form-label"
              >Discount Reached When</label
            ><br />
            <input
              v-model="whenReached"
              class="form-input"
              type="text"
              id="disabledFieldsetCheck"
            />
          </div>
        </div>
        <div class="mb-3">
          <div class="form-check ps-0">
            <label for="disabledSelect" class="form-label"
              >Discount Amount</label
            ><br />
            <input
              v-model="discount"
              class="form-input"
              type="text"
              id="disabledFieldsetCheck"
            />
          </div>
        </div>
        <button @click="addLoyalty" class="btn btn-primary">Add Loyalty</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { authHeader } from "../../helpers/authHeader";
export default {
  name: "AdminLoyalty",
  data() {
    return {
      name: "",
      when: "",
      whenReached: 0,
      discount: 0,
      loyalties: [],
    };
  },
  methods: {
    addLoyalty() {
      if (
        this.name != "" &&
        this.when != "" &&
        this.discount >= 0 &&
        this.whenReached >= 0
      ) {
        axios
          .post(
            "/api/loyalty/",
            {
              name: this.name,
              when: this.when,
              discount: this.discount,
              whenReached: this.whenReached,
            },
            { headers: authHeader() }
          )
          .then((res) => {
            this.loyalties.push(res.data);
            this.$notify({
              text: "Successfully Added Loyalty",
              type: "success",
            });
          });
      }
    },
    getLoyalties() {
      axios.get("/api/loyalty").then((res) => {
        this.loyalties = res.data;
      });
    },
  },
  mounted() {
    this.getLoyalties();
  },
};
</script>

<style scoped></style>
