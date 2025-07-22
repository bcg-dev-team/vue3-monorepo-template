import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'GettingStarted',
    component: () => import('@/views/home/Index.vue'),
  },
  {
    path: '/order',
    name: 'Order',
    component: () => import('@/views/order/Index.vue'),
  },
  {
    path: '/transaction',
    name: 'Transaction',
    component: () => import('@/views/transaction/Index.vue'),
  },
  {
    path: '/assets',
    name: 'Assets',
    component: () => import('@/views/assets/Index.vue'),
  },
  {
    path: '/withdrawal',
    name: 'Withdrawal',
    component: () => import('@/views/withdrawal/Index.vue'),
  },
  {
    path: '/service',
    name: 'Service',
    component: () => import('@/views/service/Index.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
