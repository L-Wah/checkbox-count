"use strict";
import { createApp } from "vue";
import App from "./App.vue";
// import CheckboxCount from "./components/checkbox-count/index.ts";

import CheckboxCount from "vue-checkbox-count"
import "vue-checkbox-count/style.css";

import "./assets/styles/reset.css";

const app = createApp(App);
app.use(CheckboxCount);
app.mount("#app");
