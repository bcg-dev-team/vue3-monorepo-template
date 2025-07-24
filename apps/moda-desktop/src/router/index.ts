import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import MainLayout from '@/components/layout/MainLayout.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'GettingStarted',
    meta: { layout: MainLayout },
    component: () => import('@/views/home/Index.vue'),
  },
  {
    path: '/auth',
    children: [
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/views/auth/login/Index.vue'),
      },

      {
        path: 'sign-up',
        children: [
          {
            path: '',
            name: 'sign-up',
            component: () => import('@/views/auth/signup/Index.vue'),
          },
          {
            path: 'individual',
            name: 'individual-sign-up',
            component: () => import('@/views/auth/signup/individual/Index.vue'),
          },
        ],
      },
    ],
  },
  {
    path: '/order',
    name: 'Order',
    meta: { layout: MainLayout },
    component: () => import('@/views/order/Index.vue'),
  },
  {
    path: '/transaction',
    name: 'Transaction',
    meta: { layout: MainLayout },
    component: () => import('@/views/transaction/Index.vue'),
  },
  {
    path: '/assets',
    name: 'Assets',
    meta: { layout: MainLayout },
    component: () => import('@/views/assets/Index.vue'),
  },
  {
    path: '/withdrawal',
    name: 'Withdrawal',
    meta: { layout: MainLayout },
    component: () => import('@/views/withdrawal/Index.vue'),
  },
  {
    path: '/service',
    name: 'Service',
    meta: { layout: MainLayout },
    component: () => import('@/views/service/Index.vue'),
  },
  {
    path: '/myPage',
    name: 'MyPage',
    meta: { layout: MainLayout },
    component: () => import('@/views/myPage/Index.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
