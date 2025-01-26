import { createRouter, createWebHistory } from 'vue-router';
import GameView from './views/GameView.vue';
import HomeView from './views/HomeView.vue';

const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: HomeView,
  },
  {
    path: '/game',
    name: 'GameView',
    component: GameView,
  },
];

const router = createRouter({
  // eslint-disable-next-line
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const game = localStorage.getItem('currentGame');
  if (game && to.name === 'HomeView') {
    next({ name: 'GameView' });
  } else {
    next();
  }
});

export default router;
