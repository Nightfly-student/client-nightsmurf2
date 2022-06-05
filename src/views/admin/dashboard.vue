<template>
  <div>
    <div class="container-fluid">
      <div class="row flex-nowrap mt-5 pt-5">
        <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 mt-top">
          <div
            class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100"
          >
            <a
              href="/"
              class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none"
            >
              <span class="fs-5 d-none d-sm-inline">Dashboard</span>
            </a>
            <ul
              class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
              id="menu"
            >
              <li class="nav-item">
                <a
                  href="#"
                  class="nav-link align-middle px-0"
                  @click="onClick('home')"
                  :class="{ activeLink: home }"
                >
                  <BIconHouseDoor class="fs-4" />
                  <span class="ms-1 d-none d-sm-inline">Home</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="nav-link px-0 align-middle"
                  @click="onClick('orders')"
                  :class="{ activeLink: orders }"
                >
                  <BIconSpeedometer2 class="fs-4" />
                  <span class="ms-1 d-none d-sm-inline">Orders</span></a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="nav-link px-0 align-middle"
                  @click="onClick('stock')"
                  :class="{ activeLink: stock }"
                >
                  <BIconPersonPlus class="fs-4" />
                  <span class="ms-1 d-none d-sm-inline">Stock</span></a
                >
              </li>
              <li class="nav-item">
                <a
                  href="#"
                  class="nav-link align-middle px-0"
                  @click="onClick('lootbox')"
                  :class="{ activeLink: lootbox }"
                >
                  <BIconBoxes class="fs-4" />
                  <span class="ms-1 d-none d-sm-inline">Lootbox</span>
                </a>
              </li>
              <li>
                <a
                  href="#submenu3"
                  data-bs-toggle="collapse"
                  class="nav-link px-0 align-middle"
                >
                  <BIconColumnsGap class="fs-4" />
                  <span class="ms-1 d-none d-sm-inline">Edits</span>
                </a>
                <ul
                  class="collapse nav flex-column ms-1"
                  id="submenu3"
                  data-bs-parent="#menu"
                >
                  <li class="w-100">
                    <a
                      href="#"
                      class="nav-link px-0"
                      @click="onClick('coupons')"
                      :class="{ activeLink: coupons }"
                    >
                      <span class="d-none d-sm-inline">Coupons</span> 1</a
                    >
                  </li>
                  <li>
                    <a
                      href="#"
                      class="nav-link px-0"
                      @click="onClick('loyalty')"
                      :class="{ activeLink: loyalty }"
                    >
                      <span class="d-none d-sm-inline">Loyalty</span> 2</a
                    >
                  </li>
                  <li>
                    <a
                      href="#"
                      class="nav-link px-0"
                      @click="onClick('loot')"
                      :class="{ activeLink: loot }"
                    >
                      <span class="d-none d-sm-inline">Loot</span> 3</a
                    >
                  </li>
                </ul>
              </li>
              <li>
                <a
                  href="#"
                  class="nav-link px-0 align-middle"
                  @click="onClick('customers')"
                  :class="{ activeLink: customers }"
                >
                  <BIconDiagram2 class="fs-4" />
                  <span class="ms-1 d-none d-sm-inline">Customers</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="col py-3">
          <div class="container-xl w-75">
            <div v-if="home">
              <AdminDashboard />
            </div>
            <div v-if="orders">
              <AdminOrder />
            </div>
            <div v-if="stock">
              <AdminStock />
            </div>
            <div v-if="coupons">
              <AdminCoupon />
            </div>
            <div v-if="loyalty">
              <AdminLoyalty />
            </div>
            <div v-if="loot">
              <AdminLoot />
            </div>
            <div v-if="lootbox">
              <AdminLootBox />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  BIconHouseDoor,
  BIconSpeedometer2,
  BIconPersonPlus,
  BIconColumnsGap,
  BIconDiagram2,
  BIconBoxes,
} from "bootstrap-icons-vue";

import AdminOrder from "../../components/admin-components/AdminOrder.vue";
import AdminStock from "../../components/admin-components/AdminStock.vue";
import AdminCoupon from "../../components/admin-components/AdminCoupon.vue";
import AdminDashboard from "../../components/admin-components/AdminDashboard.vue";
import AdminLoyalty from "../../components/admin-components/AdminLoyalty.vue";
import AdminLoot from "../../components/admin-components/AdminLoot.vue";
import AdminLootBox from "../../components/admin-components/AdminLootBox.vue";
export default {
  name: "Dashboard",
  components: {
    BIconHouseDoor,
    BIconSpeedometer2,
    BIconPersonPlus,
    BIconColumnsGap,
    BIconDiagram2,
    BIconBoxes,
    AdminOrder,
    AdminStock,
    AdminCoupon,
    AdminDashboard,
    AdminLoyalty,
    AdminLoot,
    AdminLootBox,
  },
  data() {
    return {
      home: true,
      orders: false,
      stock: false,
      products: false,
      coupons: false,
      loyalty: false,
      loot: false,
      lootbox: false,
      customers: false,
    };
  },
  methods: {
    onClick(value) {
      this.home = false;
      this.orders = false;
      this.stock = false;
      (this.loot = false), (this.products = false);
      this.coupons = false;
      this.loyalty = false;
      this.customers = false;
      this.lootbox = false;

      this[value] = true;
    },
  },
};
</script>

<style scoped>
.nav-link {
  color: white !important;
}
.nav-link:hover {
  color: gainsboro !important;
}
.activeLink {
  color: #599afb !important;
}
.activeLink:hover {
  color: #307cee !important;
}
.w-75 {
  width: 100% !important;
}
.mt-top {
  padding-top: 150px;
}
</style>
