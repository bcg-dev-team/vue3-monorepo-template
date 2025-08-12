import MainLayout from '@/components/layout/MainLayout.vue';
import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

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
          {
            path: 'corporate',
            name: 'corporate-sign-up',
            component: () => import('@/views/auth/signup/corporate/Index.vue'),
          },
        ],
      },
      {
        path: 'find-id',
        name: 'find-id',
        component: () => import('@/views/auth/findId/Index.vue'),
      },
      {
        path: 'reset-password',
        name: 'reset-password',
        component: () => import('@/views/auth/resetPassword/Index.vue'),
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
    path: '/my-page',
    name: 'MyPage',
    meta: { layout: MainLayout },
    component: () => import('@/views/myPage/Index.vue'),
  },
  {
    path: '/markup',
    name: 'Markup',
    component: () => import('@/views/markup/Index.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
