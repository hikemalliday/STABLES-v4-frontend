import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import Login from "./Login.vue";
import Main from "./Main.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Main",
      component: Main,
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
    },
    {
      path: "/app",
      name: "App",
      component: App,
    },
  ],
});

export default router;
