import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import { registerComponents } from "./plugins/GlobalComponents";
const app = createApp(App);
registerComponents(app);
app.use(vuetify);

loadFonts();

app.mount("#app");
