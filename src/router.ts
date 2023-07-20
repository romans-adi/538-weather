import { createRouter, createWebHistory } from 'vue-router';
import WeatherForecast from './views/WeatherForecast.vue'
import WeatherView from './views/WeatherView.vue'

const routes = [
  {
    path: '/',
    name: 'WeatherForecast',
    component: WeatherForecast,
  },
  {
    path: '/weather',
    name: 'WeatherView',
    component: WeatherView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
