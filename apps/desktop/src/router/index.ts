import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'GettingStarted',
    component: () => import('../views/GettingStartedView.vue'),
  },
  {
    path: '/packages',
    name: 'Packages',
    component: () => import('../views/PackagesView.vue'),
  },
  {
    path: '/development',
    name: 'Development',
    component: () => import('../views/DevelopmentView.vue'),
  },
  {
    path: '/components',
    name: 'Components',
    component: () => import('../views/ComponentsView.vue'),
  },
  {
    path: '/api-examples',
    name: 'ApiExamples',
    component: () => import('../views/ApiExamplesView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
