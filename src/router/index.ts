import { createRouter, createWebHistory } from "vue-router";
import HomeScreen from "../views/HomeScreen.vue";
import PlayVsComputer from "../views/PlayVsComputer.vue";
import PlayVsFriend from "../views/PlayVsFriend.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeScreen,
  },
  {
    path: "/game/computer",
    name: "PlayVsComputer",
    component: PlayVsComputer,
  },
  {
    path: "/game/friend",
    name: "PlayVsFriend",
    component: PlayVsFriend,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;