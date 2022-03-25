import { createRouter, createWebHistory } from "vue-router";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

import Home from "../views/Home.vue";
import Skins from "../views/Skins.vue";
import Category from "../views/Category.vue";
import Order from "../views/Order.vue";
import Product from "../views/Product.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import OrderHistory from "../views/LoggedPages/OrderHistory.vue";
import Settings from "../views/LoggedPages/Settings.vue";
import Blogs from "../views/Blogs.vue";
import BlogItem from "../views/BlogItem.vue";
import Dashboard from "../views/AdminPages/Dashboard.vue";
import Contact from "../views/Contact.vue";
import NotFound from "../views/NotFound.vue";
import TOS from "../views/TOS.vue";
import PrivacyPolicy from "../views/PrivacyPolicy.vue";
import store from "../store";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
      meta: {
        title: "Buy Cheap Smurf Accounts - Nightsmurf",
        metaTags: [
          {
            name: "description",
            content:
              "We offer the cheapest league of legends smurfs on the market. Buy your lol smurf account for EUW, NA, EUNE, TR, OCE, RU, LAN, and more",
          },
        ],
      },
    },
    {
      path: "/lol-skin-accounts",
      name: "Skins",
      component: Skins,
      meta: {
        title: "Unranked Skin Accounts - Nightsmurf",
        metaTags: [
          {
            name: "description",
            content:
              "We offer the cheapest league of legends smurfs on the market. Buy your lol smurf account for EUW, NA, EUNE, TR, OCE, RU, LAN, and more",
          },
          {
            property: "og:description",
            content:
              "We offer the cheapest league of legends smurfs on the market. Buy your lol smurf account for EUW, NA, EUNE, TR, OCE, RU, LAN, and more",
          },
        ],
      },
    },
    {
      path: "/order/:id",
      name: "Order",
      component: Order,
      meta: {
        title: "Thank You! - Nightsmurf",
        metaTags: [
          {
            name: "description",
          },
          {
            property: "og:description",
          },
        ],
      },
    },
    {
      path: "/blog/",
      name: "Blog",
      component: Blogs,
      meta: {
        title: "Blog - Nightsmurf",
      },
    },
    {
      path: "/blog/:slug",
      name: "BlogItem",
      component: BlogItem,
    },
    {
      path: "/category/:category",
      name: "Category",
      component: Category,
      meta: {
        title: "Accounts - Nightsmurf",
      },
    },
    {
      path: "/product/:slug",
      name: "Product",
      component: Product,
      meta: {
        title: "Unranked Skin Accounts - Nightsmurf",
      },
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
      beforeEnter: noRoute,
      meta: {
        title: "Login - Nightsmurf",
        metaTags: [
          {
            name: "description",
            content:
              "We offer the cheapest league of legends smurfs on the market. Buy your lol smurf account for EUW, NA, EUNE, TR, OCE, RU, LAN, and more",
          },
          {
            property: "og:description",
            content:
              "We offer the cheapest league of legends smurfs on the market. Buy your lol smurf account for EUW, NA, EUNE, TR, OCE, RU, LAN, and more",
          },
        ],
      },
    },
    {
      path: "/register",
      name: "Register",
      component: Register,
      beforeEnter: noRoute,
      meta: {
        title: "Register - Nightsmurf",
        metaTags: [
          {
            name: "description",
            content:
              "We offer the cheapest league of legends smurfs on the market. Buy your lol smurf account for EUW, NA, EUNE, TR, OCE, RU, LAN, and more",
          },
          {
            property: "og:description",
            content:
              "We offer the cheapest league of legends smurfs on the market. Buy your lol smurf account for EUW, NA, EUNE, TR, OCE, RU, LAN, and more",
          },
        ],
      },
    },
    {
      path: "/order-history",
      name: "OrderHistory",
      component: OrderHistory,
      beforeEnter: userRoute,
      meta: {
        title: "Order History - Nightsmurf",
        metaTags: [
          {
            name: "description",
            content:
              "We offer the cheapest league of legends smurfs on the market. Buy your lol smurf account for EUW, NA, EUNE, TR, OCE, RU, LAN, and more",
          },
          {
            property: "og:description",
            content:
              "We offer the cheapest league of legends smurfs on the market. Buy your lol smurf account for EUW, NA, EUNE, TR, OCE, RU, LAN, and more",
          },
        ],
      },
    },
    {
      path: "/settings",
      name: "Settings",
      component: Settings,
      beforeEnter: userRoute,
      meta: {
        title: "Settings - Nightsmurf",
        metaTags: [
          {
            name: "description",
            content:
              "We offer the cheapest league of legends smurfs on the market. Buy your lol smurf account for EUW, NA, EUNE, TR, OCE, RU, LAN, and more",
          },
          {
            property: "og:description",
            content:
              "We offer the cheapest league of legends smurfs on the market. Buy your lol smurf account for EUW, NA, EUNE, TR, OCE, RU, LAN, and more",
          },
        ],
      },
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      component: Dashboard,
      beforeEnter: adminRoute,
      meta: {
        title: "Dashboard - Nightsmurf",
      },
    },
    {
      path: "/contact",
      name: "Contact",
      component: Contact,
      meta: {
        title: "Contact Us - Nightsmurf",
      },
    },
    {
      path: "/terms-of-service",
      name: "TOS",
      component: TOS,
      meta: {
        title: "Terms Of Service - Nightsmurf",
      },
    },
    {
      path: "/privacy-policy",
      name: "PrivacyPolicy",
      component: PrivacyPolicy,
      meta: {
        title: "Privacy policy - Nightsmurf",
      },
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: NotFound,
      meta: {
        title: "Page Not Found - Nightsmurf",
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  //Metadata//
  const nearestWithTitle = to.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.title);

  const nearestWithMeta = to.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.metaTags);

  const previousNearestWithMeta = from.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.metaTags);

  if (nearestWithTitle) {
    document.title = nearestWithTitle.meta.title;
  } else if (previousNearestWithMeta) {
    document.title = previousNearestWithMeta.meta.title;
  }

  Array.from(document.querySelectorAll("[data-vue-router-controlled]")).map(
    (el) => el.parentNode.removeChild(el)
  );

  if (!nearestWithMeta) return next();

  nearestWithMeta.meta.metaTags
    .map((tagDef) => {
      const tag = document.createElement("meta");

      Object.keys(tagDef).forEach((key) => {
        tag.setAttribute(key, tagDef[key]);
      });
      tag.setAttribute("data-vue-router-controlled", "");

      return tag;
    })
    .forEach((tag) => document.head.appendChild(tag));

  next();
});

function userRoute(to, from, next) {
  store.dispatch("autoLogin");
  setTimeout(() => {
    var isAuthenticated = false;
    if (store.getters.isLogged) isAuthenticated = true;
    else isAuthenticated = false;
    if (isAuthenticated) {
      next();
    } else {
      next("/login");
    }
  }, 200);
}
function adminRoute(to, from, next) {
  store.dispatch("autoLogin");
  setTimeout(() => {
    var isAuthenticated = false;
    if (store.getters.isLogged && store.getters.isAdmin) isAuthenticated = true;
    else isAuthenticated = false;
    if (isAuthenticated) {
      next();
    } else {
      next("/login");
    }
  }, 200);
}
function noRoute(to, from, next) {
  var isAuthenticated = false;
  if (store.getters.isLogged) isAuthenticated = true;
  else isAuthenticated = false;
  if (!isAuthenticated) {
    next();
  } else {
    next("/");
  }
}

export default router;
