import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import VueFeather from "vue-feather";

const app = createApp(App);
app.component(VueFeather.name, VueFeather);
app.use(vuetify);

loadFonts();

app.mount("#app");
