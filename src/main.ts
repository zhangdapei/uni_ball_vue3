import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router";
import { store } from "@/store";
import "@/styles/index.scss";
import "uno.css";
import "@/permission"; //路由钩子
// 本地SVG图标
import "virtual:svg-icons-register";

const app = createApp(App);
app.use(router);
app.use(store);
app.mount("#app");
