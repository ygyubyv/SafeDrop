import "./assets/styles/main.css";

import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";

import { myMSALObj } from "./azure/azure_msal/msalConfig";

import ToastPlugin from "vue-toast-notification";
import "vue-toast-notification/dist/theme-bootstrap.css";

import BaseSpinner from "./components/ui/BaseSpinner.vue";

import { FontAwesomeIcon } from "./plugins/fontAwesome";

await myMSALObj.initialize();
const app = createApp(App);

app.component("base-spinner", BaseSpinner);
app.component("font-awesome-icon", FontAwesomeIcon);

app.use(router);
app.use(ToastPlugin);

app.mount("#vue-application");
