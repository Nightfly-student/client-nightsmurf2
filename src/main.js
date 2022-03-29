import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Notifications from "@kyvg/vue3-notification";
import VueGtag from "vue-gtag";
import { createHead } from "@vueuse/head";

const app = createApp(App);
app.use(router);
app.use(createHead);
app.use(store);
app.use(Notifications);
app.use(VueGtag, {
    config: {
        id: "UA-197110880-2",
    },
}, router)
app.mount("#app");
