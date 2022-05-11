import { createRouter, createWebHistory } from "vue-router";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

// import Home from "../views/Home.vue";
// import Skins from "../views/Skins.vue";
// import Category from "../views/Category.vue";
// import Order from "../views/Order.vue";
// import Product from "../views/Product.vue";
// import Login from "../views/Login.vue";
// import Register from "../views/Register.vue";
// import OrderHistory from "../views/LoggedPages/OrderHistory.vue";
// import Settings from "../views/LoggedPages/Settings.vue";
// import Blogs from "../views/Blogs.vue";
// import BlogItem from "../views/BlogItem.vue";
// import Dashboard from "../views/AdminPages/Dashboard.vue";
// import Contact from "../views/Contact.vue";
// import NotFound from "../views/NotFound.vue";
// import TOS from "../views/TOS.vue";
// import PrivacyPolicy from "../views/PrivacyPolicy.vue";
import store from "../store";
import routes from "~pages";

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
  // routes: [
  //   {
  //     path: "/",
  //     name: "Home",
  //     component: Home,
  //   },
  //   {
  //     path: "/lol-skin-accounts",
  //     name: "Skins",
  //     component: Skins,
  //   },
  //   {
  //     path: "/order/:id",
  //     name: "Order",
  //     component: Order,
  //     meta: {
  //       title: "Thank You! - Nightsmurf",
  //       metaTags: [
  //         {
  //           name: "description",
  //         },
  //         {
  //           property: "og:description",
  //         },
  //       ],
  //     },
  //   },
  //   {
  //     path: "/blog/",
  //     name: "Blog",
  //     component: Blogs,
  //   },
  //   {
  //     path: "/blog/:slug",
  //     name: "BlogItem",
  //     component: BlogItem,
  //   },
  //   {
  //     path: "/category/:category",
  //     name: "Category",
  //     component: Category,
  //   },
  //   {
  //     path: "/product/:slug",
  //     name: "Product",
  //     component: Product,
  //   },
  //   {
  //     path: "/login",
  //     name: "Login",
  //     component: Login,
  //     beforeEnter: noRoute,
  //     meta: {
  //       title: "Login - Nightsmurf",
  //       metaTags: [
  //         {
  //           name: "description",
  //           content:
  //             "We offer the cheapest league of legends smurfs on the market. Buy your lol smurf account for EUW, NA, EUNE, TR, OCE, RU, LAN, and more",
  //         },
  //         {
  //           property: "og:description",
  //           content:
  //             "We offer the cheapest league of legends smurfs on the market. Buy your lol smurf account for EUW, NA, EUNE, TR, OCE, RU, LAN, and more",
  //         },
  //       ],
  //     },
  //   },
  //   {
  //     path: "/register",
  //     name: "Register",
  //     component: Register,
  //     beforeEnter: noRoute,
  //     meta: {
  //       title: "Register - Nightsmurf",
  //       metaTags: [
  //         {
  //           name: "description",
  //           content:
  //             "We offer the cheapest league of legends smurfs on the market. Buy your lol smurf account for EUW, NA, EUNE, TR, OCE, RU, LAN, and more",
  //         },
  //         {
  //           property: "og:description",
  //           content:
  //             "We offer the cheapest league of legends smurfs on the market. Buy your lol smurf account for EUW, NA, EUNE, TR, OCE, RU, LAN, and more",
  //         },
  //       ],
  //     },
  //   },
  //   {
  //     path: "/order-history",
  //     name: "OrderHistory",
  //     component: OrderHistory,
  //     beforeEnter: userRoute,
  //     meta: {
  //       title: "Order History - Nightsmurf",
  //       metaTags: [
  //         {
  //           name: "description",
  //           content:
  //             "We offer the cheapest league of legends smurfs on the market. Buy your lol smurf account for EUW, NA, EUNE, TR, OCE, RU, LAN, and more",
  //         },
  //         {
  //           property: "og:description",
  //           content:
  //             "We offer the cheapest league of legends smurfs on the market. Buy your lol smurf account for EUW, NA, EUNE, TR, OCE, RU, LAN, and more",
  //         },
  //       ],
  //     },
  //   },
  //   {
  //     path: "/settings",
  //     name: "Settings",
  //     component: Settings,
  //     beforeEnter: userRoute,
  //     meta: {
  //       title: "Settings - Nightsmurf",
  //       metaTags: [
  //         {
  //           name: "description",
  //           content:
  //             "We offer the cheapest league of legends smurfs on the market. Buy your lol smurf account for EUW, NA, EUNE, TR, OCE, RU, LAN, and more",
  //         },
  //         {
  //           property: "og:description",
  //           content:
  //             "We offer the cheapest league of legends smurfs on the market. Buy your lol smurf account for EUW, NA, EUNE, TR, OCE, RU, LAN, and more",
  //         },
  //       ],
  //     },
  //   },
  //   {
  //     path: "/dashboard",
  //     name: "Dashboard",
  //     component: Dashboard,
  //     beforeEnter: adminRoute,
  //     meta: {
  //       title: "Dashboard - Nightsmurf",
  //     },
  //   },
  //   {
  //     path: "/contact",
  //     name: "Contact",
  //     component: Contact,
  //     meta: {
  //       title: "Contact Us - Nightsmurf",
  //     },
  //   },
  //   {
  //     path: "/terms-of-service",
  //     name: "TOS",
  //     component: TOS,
  //     meta: {
  //       title: "Terms Of Service - Nightsmurf",
  //     },
  //   },
  //   {
  //     path: "/privacy-policy",
  //     name: "PrivacyPolicy",
  //     component: PrivacyPolicy,
  //     meta: {
  //       title: "Privacy policy - Nightsmurf",
  //     },
  //   },
  //   {
  //     path: "/:pathMatch(.*)*",
  //     name: "NotFound",
  //     component: NotFound,
  //     meta: {
  //       title: "Page Not Found - Nightsmurf",
  //     },
  //   },
  // ],
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0 };
  },
});

router.beforeEach((to, from) => {
  if (to.meta.userAuth && !store.getters.isLogged) {
    return {
      path: "/login",
    };
  }
  if (to.meta.adminAuth && !store.getters.isLogged && !store.getters.isAdmin) {
    return {
      path: "/",
    };
  }
  if (to.meta.noRoute && store.getters.isLogged) {
    return {
      path: "/",
    };
  }
});

export default router;
