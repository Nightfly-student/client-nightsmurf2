<template>
  <div>
    <h1 class="text-center text-light">Lootbox</h1>
    <p class="text-light fs-6">Total: {{ count }}</p>
    <div class="overflow-auto w-100">
      <table class="table table-dark">
        <thead>
          <tr class="text-center">
            <th scope="col">Icon</th>
            <th scope="col">User</th>
            <th scope="col">Item</th>
            <th scope="col">Type</th>
            <th scope="col">Rarity</th>
            <th scope="col">Won At</th>
            <th scope="col">IP</th>
            <th scope="col">Claimed</th>
            <th scope="col">Edit</th>
          </tr>
        </thead>
        <tbody class="text-center">
          <tr v-for="winner in winners" :key="winner._id">
            <th class="align-middle" scope="row">
              <img
                class="img-fluid img-size"
                :src="JSON.parse(winner.loot).image"
              />
            </th>
            <td class="align-middle">{{ JSON.parse(winner.user).email }}</td>
            <td class="align-middle">{{ JSON.parse(winner.loot).name }}</td>
            <td class="align-middle">{{ winner.lootType }}</td>
            <td class="align-middle">{{ JSON.parse(winner.loot).rarity }}</td>
            <TimeFormatTable :order="winner" />
            <td class="align-middle">{{ winner.ip }}</td>
            <td class="align-middle">{{ winner.claimed }}</td>
            <td class="align-middle">
              <button
                class="btn btn-primary"
                :data-bs-target="'#LicenceModal' + winner._id"
                data-bs-toggle="modal"
              >
                Edit
              </button>
              <AdminLicenceModal :winning="winner" />
            </td>
          </tr>
        </tbody>
      </table>
      <button v-if="!(page >= pages)" @click="loadItems" class="btn btn-primary">Load More</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import TimeFormatTable from "../dates/TimeFormatTable.vue";
import AdminLicenceModal from "../modals/AdminLicenceModal.vue";
export default {
  name: "AdminLootBox",
  components: {
    TimeFormatTable,
    AdminLicenceModal,
  },
  data() {
    return {
      limit: 10,
      page: 0,
      winners: [],
      count: 0,
      pages: 1,
    };
  },
  methods: {
    loadItems() {
      this.page++;
      axios
        .get(`/api/winnings/?limit=${this.limit}&page=${this.page}`)
        .then((res) => {
          res.data.docs.forEach(winner => {
            this.winners.push(winner);
          });
          this.count = res.data.total;
          this.pages = res.data.pages;
          console.log(this.winners);
        });
    },
  },
  mounted() {
    this.loadItems();
  },
};
</script>

<style scoped>
.img-size {
  height: 75px;
}
</style>
