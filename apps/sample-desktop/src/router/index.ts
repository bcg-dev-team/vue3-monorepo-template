import MainLayout from '@/components/layout/MainLayout.vue';
import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/auth',
    children: [
      {
        path: 'login',
        name: 'login',
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
          {
            path: 'complete',
            name: 'sign-up-complete',
            component: () => import('@/views/auth/signup/complete/index.vue'),
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
        children: [
          {
            path: '',
            name: 'reset-password',
            component: () => import('@/views/auth/resetPassword/Index.vue'),
          },
          {
            path: 'complete',
            name: 'reset-password-complete',
            component: () => import('@/views/auth/resetPassword/complete/Index.vue'),
          },
        ],
      },
    ],
  },
  {
    path: '/',
    name: 'home',
    meta: { layout: MainLayout },
    component: () => import('@/views/home/Index.vue'),
  },
  {
    path: '/order',
    name: 'order',
    meta: { layout: MainLayout },
    component: () => import('@/views/order/Index.vue'),
  },
  {
    path: '/transaction',
    meta: { layout: MainLayout },
    children: [
      {
        path: '',
        name: 'transaction',
        component: () => import('@/views/transaction/Index.vue'),
      },
      {
        path: ':transactionTab',
        name: 'transaction-tab',
        component: () => import('@/views/transaction/Index.vue'),
      },
    ],
  },
  {
    path: '/assets',
    name: 'assets',
    meta: { layout: MainLayout },
    component: () => import('@/views/assets/Index.vue'),
  },
  {
    path: '/accounts',
    meta: { layout: MainLayout },
    children: [
      {
        path: '',
        name: 'account-management',
        component: () => import('@/views/accountManagement/Index.vue'),
      },
      {
        path: ':accountManagementTab',
        name: 'account-management-tab',
        component: () => import('@/views/accountManagement/Index.vue'),
      },
    ],
  },
  {
    path: '/support',

    meta: { layout: MainLayout },
    children: [
      {
        path: '',
        name: 'support',
        component: () => import('@/views/support/Index.vue'),
      },
      {
        path: ':supportTab',
        name: 'support-tab',
        component: () => import('@/views/support/Index.vue'),
      },
    ],
  },
  {
    path: '/mypage',
    name: 'mypage',
    meta: { layout: MainLayout },
    component: () => import('@/views/myPage/Index.vue'),
  },
  {
    path: '/markup',
    name: 'markup',
    component: () => import('@/views/markup/Index.vue'),
  },
  {
    path: '/chart',
    name: 'chart',
    meta: { layout: MainLayout },
    component: () => import('@/views/chart/Index.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  // step 마지막 단계에서 뒤로가기 막기 임시로 login으로 전환
  const rules = [
    { from: 'sign-up-complete', to: ['individual-sign-up', 'corporate-sign-up'] },
    { from: 'reset-password-complete', to: ['reset-password'] },
    {
      from: 'find-id',
      to: ['find-id'],
      when: (_to: any, from: any) => String(from.query.step) === '1',
    },
  ];

  const shouldRedirect = rules.some(
    (rule) =>
      from.name === rule.from &&
      rule.to.includes(String(to.name)) &&
      (!rule.when || rule.when(to, from))
  );

  if (shouldRedirect) return next({ name: 'login' });
  next();
});

export default router;
