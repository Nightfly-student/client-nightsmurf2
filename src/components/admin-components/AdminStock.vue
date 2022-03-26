<template>
  <div>
    <h1 class="text-center text-light">Stock</h1>
    <div class="overflow-auto w-100">
      <table class="table table-dark">
        <thead>
          <tr>
            <th scope="col">Region</th>
            <th scope="col">Amount</th>
            <th scope="col">Stock</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="stok in stock" :key="stok">
            <th class="align-middle" scope="row">{{ stok.region }}</th>
            <th class="align-middle" scope="row">
              {{ Object.keys(stok).filter((stonk) => stonk != "region") }}
            </th>
            <td class="align-middle">
              {{ stok[40] }} : {{ stok[50] }} : {{ stok[60] }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div>
      <div class="text-center">
        <h2 class="text-light">Import Accounts</h2>
        <textarea v-model="importAccounts" class="w-75 height" placeholder="# Format: [REGION]:[USERNAME]:[PASSWORD]:[LEVEL]:[BLUEESSENCE]:[ORANGEESSENCE]:[CHAMPIONS]:[SKINSHARDS]"></textarea>
        <br />
        <button @click="importStock" class="btn btn-primary mt-2">
          Import Accounts
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { authHeader } from "../../helpers/authHeader";
export default {
  name: "AdminStock",
  data() {
    return {
      stock: [],
      importAccounts: [],
    };
  },
  methods: {
    getStock() {
      axios
        .get("/api/licences/allstock", { headers: authHeader() })
        .then((res) => {
          this.stock = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    importStock() {
      axios
        .get(
          "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/skins.json"
        )
        .then((res) => {
          var lines = this.importAccounts.split("\n");
          var accounts = [];
          lines.forEach((lines) => {
            var stock = lines.split(":");
            var skins = [];
            stock[7].split("_").forEach((skin) => {
              if (skin != "0") {
                var item = skin.replace(/ *\([^)]*\) */g, "");
                var found = Object.values(res.data).find((skinObject) =>
                  skinObject.name.includes(item)
                );
                skins.push(found.id);
              }
            });
            var data = {
              region: stock[0].toLowerCase(),
              username: stock[1],
              password: stock[2],
              licenceType: parseInt(stock[4].toString().substr(0, 1) + "0"),
              skins: skins,
              status: 'available',
            };
            accounts.push(data);
          });
          console.log(accounts);
          axios.post('/api/licences/import', {accounts: accounts}, {headers: authHeader()}).then((res) => {
          alert("Imported "  + accounts.length + " Accounts") 
          }).catch((err) => {
            alert("Failed"); 
          })
          this.importAccounts = '';
        });
    },
  },
  mounted() {
    this.getStock();
  },
};
</script>

<style scoped>
.height {
  height: 375px;
}
</style>
