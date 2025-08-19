import MainLayout from '@/components/layout/MainLayout.vue';
import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
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
    path: '/',
    name: 'Home',
    meta: { layout: MainLayout },
    component: () => import('@/views/home/Index.vue'),
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
    children: [
      {
        path: '',
        name: 'TransactionDefault',
        component: () => import('@/views/transaction/Index.vue'),
      },
      {
        path: ':transactionTab',
        name: 'TransactionTab',
        component: () => import('@/views/transaction/Index.vue'),
      },
    ],
  },
  {
    path: '/assets',
    name: 'Assets',
    meta: { layout: MainLayout },
    component: () => import('@/views/assets/Index.vue'),
  },
  {
    path: '/accounts',
    name: 'AccountManagement',
    meta: { layout: MainLayout },
    children: [
      {
        path: '',
        name: 'AccountManagementDefault',
        component: () => import('@/views/accountManagement/Index.vue'),
      },
      {
        path: ':accountManagementTab',
        name: 'AccountManagementTab',
        component: () => import('@/views/accountManagement/Index.vue'),
      },
    ],
  },
  {
    path: '/support',
    name: 'Support',
    meta: { layout: MainLayout },
    children: [
      {
        path: '',
        name: 'SupportDefault',
        component: () => import('@/views/support/Index.vue'),
      },
      {
        path: ':supportTab',
        name: 'SupportTab',
        component: () => import('@/views/support/Index.vue'),
      },
    ],
  },
  {
    path: '/mypage',
    name: 'MyPage',
    meta: { layout: MainLayout },
    component: () => import('@/views/myPage/Index.vue'),
  },
  {
    path: '/markup',
    name: 'Markup',
    component: () => import('@/views/markup/Index.vue'),
  },
  {
    path: '/chart',
    name: 'Chart',
    meta: { layout: MainLayout },
    component: () => import('@/views/chart/Index.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
