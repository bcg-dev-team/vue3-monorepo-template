<template>
  <div id="app" class="min-h-screen flex flex-col font-sans bg-bg-surface text-primary">
    <header class="app-header sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-8 flex justify-between items-center">
        <div class="flex items-baseline gap-2">
          <h1 class="text-2xl font-bold text-text-primary m-0">Vue 3 Monorepo Template</h1>
          <span class="text-sm font-medium text-text-secondary">v1.0.0</span>
        </div>
        <nav class="flex gap-6">
          <router-link
            to="/"
            class="text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200 hover:bg-surface-muted hover:-translate-y-0.5"
            :class="{ 'bg-primary-light text-primary': $route.path === '/' }"
          >
            시작하기
          </router-link>
          <router-link
            to="/packages"
            class="text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200 hover:bg-surface-muted hover:-translate-y-0.5"
            :class="{ 'bg-primary-light text-primary': $route.path === '/packages' }"
          >
            패키지 구조
          </router-link>
          <router-link
            to="/development"
            class="text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200 hover:bg-surface-muted hover:-translate-y-0.5"
            :class="{ 'bg-primary-light text-primary': $route.path === '/development' }"
          >
            개발 가이드
          </router-link>
          <router-link
            to="/components"
            class="text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200 hover:bg-surface-muted hover:-translate-y-0.5"
            :class="{ 'bg-primary-light text-primary': $route.path === '/components' }"
          >
            컴포넌트
          </router-link>
          <router-link
            to="/api-examples"
            class="text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200 hover:bg-surface-muted hover:-translate-y-0.5"
            :class="{ 'bg-primary-light text-primary': $route.path === '/api-examples' }"
          >
            API 예제
          </router-link>
          <router-link
            to="/theme-test"
            class="text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200 hover:bg-surface-muted hover:-translate-y-0.5"
            :class="{ 'bg-primary-light text-primary': $route.path === '/theme-test' }"
          >
            테마 테스트
          </router-link>
        </nav>
      </div>
    </header>

    <main class="flex-1 p-8 max-w-7xl mx-auto w-full bg-bg-surface">
      <router-view />
    </main>

    <footer class="app-footer mt-auto">
      <div class="max-w-7xl mx-auto px-8 flex justify-between items-center">
        <p class="m-0 text-sm text-text-footer">
          &copy; 2024 Vue 3 Monorepo Template - TypeScript, Vite, Performance Optimized
        </p>
        <div class="flex gap-6">
          <a
            href="https://github.com/your-username/vue3-monorepo-template"
            target="_blank"
            rel="noopener"
            class="text-sm text-text-footer hover:text-text-primary transition-colors duration-200"
          >
            GitHub
          </a>
          <a
            href="https://vuejs.org"
            target="_blank"
            rel="noopener"
            class="text-sm text-text-footer hover:text-text-primary transition-colors duration-200"
          >
            Vue.js
          </a>
          <a
            href="https://vitejs.dev"
            target="_blank"
            rel="noopener"
            class="text-sm text-text-footer hover:text-text-primary transition-colors duration-200"
          >
            Vite
          </a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
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
