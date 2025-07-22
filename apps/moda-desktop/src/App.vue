<template>
  <div id="app" class="min-h-screen flex flex-col font-sans bg-bg-default text-text-primary">
    <Header />
    <main class="flex-1 p-6 mx-auto w-full bg-bg-surface">
      <router-view />
    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import Header from './components/layout/Header.vue';
import Footer from './components/layout/Footer.vue';

/**
 * 메인 App 컴포넌트
 *
 * 템플릿 온보딩을 위한 메인 애플리케이션 컴포넌트입니다.
 * Vue Router를 통해 페이지 라우팅을 처리합니다.
 *
 * @example
 * ```vue
 * <App />
 * ```
 */
// App 컴포넌트 로직
</script>
