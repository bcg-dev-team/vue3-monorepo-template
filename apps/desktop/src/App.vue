<template>
  <div id="app">
    <header class="app-header">
      <div class="header-content">
        <div class="logo">
          <h1>Vue 3 Monorepo Template</h1>
          <span class="version">v1.0.0</span>
        </div>
        <nav class="nav-menu">
          <router-link to="/" class="nav-link">시작하기</router-link>
          <router-link to="/packages" class="nav-link">패키지 구조</router-link>
          <router-link to="/development" class="nav-link">개발 가이드</router-link>
          <router-link to="/components" class="nav-link">컴포넌트</router-link>
          <router-link to="/api-examples" class="nav-link">API 예제</router-link>
          <router-link to="/theme-test" class="nav-link">테마 테스트</router-link>
        </nav>
      </div>
    </header>

    <main class="app-main">
      <router-view />
    </main>

    <footer class="app-footer">
      <div class="footer-content">
        <p>&copy; 2024 Vue 3 Monorepo Template - TypeScript, Vite, Performance Optimized</p>
        <div class="footer-links">
          <a
            href="https://github.com/your-username/vue3-monorepo-template"
            target="_blank"
            rel="noopener"
            >GitHub</a
          >
          <a href="https://vuejs.org" target="_blank" rel="noopener">Vue.js</a>
          <a href="https://vitejs.dev" target="_blank" rel="noopener">Vite</a>
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

<style scoped>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family:
    'Inter',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    sans-serif;
  background-color: var(--background-bg-default);
  color: var(--font-color-default);
}

.app-header {
  background: var(--background-bg-default);
  border-bottom: 1px solid var(--background-divider);
  padding: 1rem 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
}

.logo h1 {
  color: var(--font-color-default);
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
}

.version {
  color: var(--font-color-default-muted);
  font-size: 0.875rem;
  font-weight: 500;
}

.nav-menu {
  display: flex;
  gap: 1.5rem;
}

.nav-link {
  color: var(--font-color-default);
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
  font-size: 0.875rem;
}

.nav-link:hover {
  background-color: var(--background-bg-surface);
  transform: translateY(-1px);
}

.nav-link.router-link-active {
  background-color: var(--background-primary-light);
  color: var(--font-color-primary);
}

.app-main {
  flex: 1;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  background-color: var(--background-bg-default);
}

.app-footer {
  background-color: var(--background-bg-surface);
  border-top: 1px solid var(--background-divider);
  padding: 2rem 0;
  margin-top: auto;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-content p {
  margin: 0;
  color: var(--font-color-footer);
  font-size: 0.875rem;
}

.footer-links {
  display: flex;
  gap: 1.5rem;
}

.footer-links a {
  color: var(--font-color-footer);
  text-decoration: none;
  font-size: 0.875rem;
  transition: color 0.2s ease;
}

.footer-links a:hover {
  color: var(--font-color-default);
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    gap: 1rem;
  }

  .nav-menu {
    flex-wrap: wrap;
    justify-content: center;
  }

  .footer-content {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
}
</style>
