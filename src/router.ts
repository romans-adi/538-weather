import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue'
import AboutPage from './views/AboutPage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
