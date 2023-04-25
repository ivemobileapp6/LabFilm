import { createWebHistory, createRouter } from "vue-router";
import App from './App.vue';
import Home from './components/Home.vue';
import About from './components/About.vue';
import NotFound from './components/NotFound.vue';
import FilmDetail from './components/DetailFilm.vue'

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    component: About
  },
  {
    path: "/d/:id",
    name: "FilmDetail",
    component: FilmDetail
  },
  {
    path: "/:catchAll(.*)",
    component: NotFound
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes

  
})
export default router;