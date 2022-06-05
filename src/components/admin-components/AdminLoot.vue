<template>
  <div>
    <h1 class="text-center text-light">Loot</h1>
    <div class="overflow-auto w-100">
      <table class="table table-dark">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Odds</th>
            <th scope="col">Rarity</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="l in loot" :key="l._id">
            <th class="align-middle" scope="row">{{ l.name }}</th>
            <td class="align-middle">{{ l.priceItem }}</td>
            <td class="align-middle">{{ l.odds }}</td>
            <td class="align-middle">{{ l.rarity }}</td>
            <td class="align-middle">
              <button @click="deleteLoot(l._id)" class="btn btn-danger">
                Delete Loot
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="">
      <div class="text-light">
        <fieldset>
          <legend>Add Coupon</legend>
          <div class="mb-3">
            <div class="form-check ps-0">
              <label for="disabledSelect" class="form-label">Loot Name</label
              ><br />
              <input
                v-model="createLoot.name"
                class="form-input"
                type="text"
                id="disabledFieldsetCheck"
              />
            </div>
          </div>
          <div class="mb-3">
            <div class="form-check ps-0">
              <label for="disabledSelect" class="form-label">price</label><br />
              <input
                v-model="createLoot.priceItem"
                class="form-input"
                type="text"
                id="disabledFieldsetCheck"
              />
            </div>
          </div>
          <div class="mb-3">
            <div class="form-check ps-0">
              <label for="disabledSelect" class="form-label">Loot image</label
              ><br />
              <input
                v-model="createLoot.image"
                class="form-input"
                type="text"
                id="disabledFieldsetCheck"
              />
            </div>
          </div>
          <div class="mb-3">
            <div class="form-check ps-0">
              <label for="disabledSelect" class="form-label">Loot odds</label
              ><br />
              <input
                v-model="createLoot.odds"
                class="form-input"
                type="text"
                id="disabledFieldsetCheck"
              />
            </div>
          </div>
          <div class="mb-3">
            <label for="disabledSelect" class="form-label">Loot Rarity</label>
            <select
              v-model="createLoot.rarity"
              id="disabledSelect"
              class="form-select w-25"
            >
              <option value="common">Common</option>
              <option value="uncommon">Uncommon</option>
              <option value="rare">Rare</option>
              <option value="epic">Epic</option>
              <option value="legendary">Legendary</option>
            </select>
          </div>
          <button @click="addLoot" class="btn btn-primary">Add Loot</button>
        </fieldset>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { authHeader } from "../../helpers/authHeader";
export default {
  name: "AdminLoot",
  data() {
    return {
      loot: [],
      createLoot: {
        name: "10% Coupon",
        image: "",
        odds: 0,
        rarity: "common",
        priceItem: "10",
      },
    };
  },
  methods: {
    addLoot() {
      axios
        .post("/api/loot", this.createLoot, { headers: authHeader() })
        .then((res) => {
          this.loot.push(res.data);
        });
    },
  },
  mounted() {
    axios.get("/api/loot").then((res) => {
      this.loot = res.data;
    });
  },
};
</script>

<style></style>
