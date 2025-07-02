<template>
  <div id="app">
    <header class="app-header">
      <nav class="nav-menu">
        <router-link to="/" class="nav-link">홈</router-link>
        <router-link to="/about" class="nav-link">소개</router-link>
        <router-link to="/form" class="nav-link">폼 검증</router-link>
      </nav>
    </header>

    <main class="app-main">
      <router-view />
    </main>

    <footer class="app-footer">
      <p>&copy; 2024 Vue 3 Monorepo Template</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
// App 컴포넌트 로직
</script>

<style scoped>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-header {
  background-color: #2c3e50;
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.nav-menu {
  display: flex;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.nav-link {
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
}

.nav-link:hover {
  color: #42b883;
}

.nav-link.router-link-active {
  color: #42b883;
}

.app-main {
  flex: 1;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.app-footer {
  background-color: #f8f9fa;
  padding: 1rem 2rem;
  text-align: center;
  border-top: 1px solid #e9ecef;
}

.app-footer p {
  margin: 0;
  color: #6c757d;
}
</style>
