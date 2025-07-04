import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomeView.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/AboutView.vue'),
  },
  {
    path: '/form',
    name: 'Form',
    component: () => import('../views/FormView.vue'),
  },
  {
    path: '/composables',
    name: 'Composables',
    component: () => import('../views/ComposablesExample.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
