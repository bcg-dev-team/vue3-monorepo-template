<template>
  <div id="app" class="h-screen">
    <!-- 상단 네비게이션 -->
    <nav class="bg-white shadow-md border-b">
      <div class="max-w-7xl mx-auto px-4">
        <div class="flex justify-between h-16">
          <div class="flex items-center space-x-8">
            <h1 class="text-xl font-bold">Vue3 모노레포 템플릿</h1>
            <div class="flex flex-col space-x-4">
              <router-link
                v-for="route in navRoutes"
                :key="route.name"
                :to="route.path"
                class="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100 transition-colors"
                active-class="bg-blue-100 text-blue-700"
              >
                {{ route.label }}
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- 메인 콘텐츠 -->
    <main class="flex-1 overflow-auto">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
/**
 * 메인 App 컴포넌트
 *
 * 템플릿 온보딩을 위한 메인 애플리케이션 컴포넌트입니다.
 * Vue Router를 통해 페이지 라우팅을 처리합니다.
 */

// 네비게이션 라우트 정의
const navRoutes = [
  { name: 'TradingPlatform', path: '/trading-platform', label: '트레이딩 플랫폼' },
  { name: 'TradingViewTest', path: '/trading-view-test', label: 'TradingView 테스트 ' },
  { name: 'LightChartTest', path: '/light-chart-test', label: 'LightChart 테스트' },
];
</script>

<style>
/* 전역 스타일 */
#app {
  font-family: 'Inter', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
