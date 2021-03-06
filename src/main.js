import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Notifications from "@kyvg/vue3-notification";
import VueGtag from "vue-gtag";
import { createHead } from "@vueuse/head";
import setupInterceptors from './helpers/Interceptor';

setupInterceptors();
const head = createHead();
const app = createApp(App);
app.use(head);
app.use(router);
app.use(store);
app.use(Notifications);
app.use(VueGtag, {
    includes: [
        {id: "AW-10906096717"},
        {id: "AW-363008517"},
    ],
    config: {
        id: "UA-197110880-2",
    },
}, router)
app.mount("#app");
