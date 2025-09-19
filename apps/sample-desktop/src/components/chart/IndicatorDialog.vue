<!--
  Figma 컴포넌트: 지표 선택 패널
  지표 선택 다이얼로그 컴포넌트
-->
<template>
  <div class="indicator-dialog-overlay" @click="handleOverlayClick">
    <div class="indicator-dialog" @click.stop>
      <!-- 헤더 -->
      <div class="dialog-header">
        <h3 class="dialog-title">지표</h3>
        <button class="close-button" @click="handleClose">
          <BaseIcon name="cert" :size="24" />
        </button>
      </div>

      <!-- 검색 입력 -->
      <div class="search-container">
        <div class="search-input">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="검색"
            class="search-field"
            @input="handleSearch"
          />
          <BaseIcon name="cert" :size="20" />
        </div>
      </div>

      <!-- 지표 목록 -->
      <div class="indicator-content">
        <div class="indicator-list">
          <div
            v-for="category in filteredCategories"
            :key="category.name"
            class="indicator-category"
          >
            <!-- 카테고리 헤더 -->
            <div
              class="category-header"
              :class="{ expanded: category.expanded }"
              @click="toggleCategory(category.name)"
            >
              <BaseIcon name="cert" :size="24" />
              <span class="category-name">{{ category.name }}</span>
            </div>

            <!-- 카테고리 지표 목록 -->
            <div v-if="category.expanded" class="category-indicators">
              <div
                v-for="indicator in category.indicators"
                :key="indicator.id"
                class="indicator-item"
                :class="{ selected: selectedIndicator?.id === indicator.id }"
                @click="handleIndicatorSelect(indicator)"
              >
                <span class="indicator-name">{{ indicator.name }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 스크롤바 -->
        <div class="scrollbar"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { BaseIcon } from '@template/ui';
import './IndicatorDialog.scss';

// 지표 타입 정의
interface Indicator {
  id: string;
  name: string;
  category: string;
  description?: string;
}

// 카테고리 타입 정의
interface IndicatorCategory {
  name: string;
  expanded: boolean;
  indicators: Indicator[];
}

// Props 정의
interface Props {
  selectedChartId?: string | null;
}

const props = defineProps<Props>();

// Emits 정의
interface Emits {
  (e: 'close'): void;
  (e: 'indicator-select', indicator: Indicator): void;
}

const emit = defineEmits<Emits>();

// 상태
const searchQuery = ref('');
const selectedIndicator = ref<Indicator | null>(null);

// 지표 데이터 (실제로는 API에서 가져와야 함)
const indicators: Indicator[] = [
  // 기술적 지표
  { id: 'volume-24h', name: '24시간 거래량', category: '기술적 지표' },
  { id: 'bb-trend', name: 'BBTrend', category: '기술적 지표' },
  { id: 'ma-cross', name: 'MA 크로스(MA Cross)', category: '기술적 지표' },
  { id: 'price-target', name: '가격 목표', category: '기술적 지표' },
  { id: 'wma', name: '가중 이동 평균(Moving Average Weighted)', category: '기술적 지표' },
  { id: 'sma', name: '단순 이동 평균', category: '기술적 지표' },
  { id: 'momentum', name: '모멘텀(Momentum)', category: '기술적 지표' },
  { id: 'bollinger-bar', name: '볼린저 바', category: '기술적 지표' },
  { id: 'bollinger-band', name: '볼랜저 밴드', category: '기술적 지표' },
  { id: 'bollinger-width', name: '볼린저 밴드폭', category: '기술적 지표' },

  // 추세 지표
  { id: 'macd', name: 'MACD', category: '추세 지표' },
  { id: 'rsi', name: 'RSI', category: '추세 지표' },
  { id: 'stochastic', name: '스토캐스틱', category: '추세 지표' },

  // 오실레이터
  { id: 'williams-r', name: 'Williams %R', category: '오실레이터' },
  { id: 'cci', name: 'CCI', category: '오실레이터' },
];

// 카테고리별로 그룹화
const categories = computed(() => {
  const categoryMap = new Map<string, IndicatorCategory>();

  indicators.forEach((indicator) => {
    if (!categoryMap.has(indicator.category)) {
      categoryMap.set(indicator.category, {
        name: indicator.category,
        expanded: true,
        indicators: [],
      });
    }
    categoryMap.get(indicator.category)!.indicators.push(indicator);
  });

  return Array.from(categoryMap.values());
});

// 검색 필터링
const filteredCategories = computed(() => {
  if (!searchQuery.value) {
    return categories.value;
  }

  const query = searchQuery.value.toLowerCase();
  return categories.value
    .map((category) => ({
      ...category,
      indicators: category.indicators.filter((indicator) =>
        indicator.name.toLowerCase().includes(query)
      ),
    }))
    .filter((category) => category.indicators.length > 0);
});

// 이벤트 핸들러
const handleClose = () => {
  emit('close');
};

const handleOverlayClick = () => {
  handleClose();
};

const handleSearch = () => {
  // 검색 로직은 computed에서 처리됨
};

const toggleCategory = (categoryName: string) => {
  const category = categories.value.find((c) => c.name === categoryName);
  if (category) {
    category.expanded = !category.expanded;
  }
};

const handleIndicatorSelect = (indicator: Indicator) => {
  selectedIndicator.value = indicator;
  emit('indicator-select', indicator);
  handleClose();
};

// ESC 키로 닫기
onMounted(() => {
  const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      handleClose();
    }
  };

  document.addEventListener('keydown', handleKeydown);

  // 컴포넌트 언마운트 시 이벤트 리스너 제거
  return () => {
    document.removeEventListener('keydown', handleKeydown);
  };
});
</script>
