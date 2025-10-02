/**
 * 심볼 가시성 관리 Composable
 * Intersection Observer를 사용한 가시성 감지 및 관리
 */

import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue';

/**
 * 심볼 가시성 관리 Composable
 * @param addVisibleSymbols - 가시성 심볼 추가 함수
 * @param filteredSymbols - 필터링된 심볼 배열
 */
export function useSymbolVisibility(
  addVisibleSymbols: (source: string, symbols: string[]) => void,
  filteredSymbols: { value: Array<{ ticker: string }> }
) {
  const symbolListRef = ref<HTMLElement>();
  const visibleSymbols = ref<Set<string>>(new Set());
  let intersectionObserver: IntersectionObserver | null = null;
  let debounceTimer: NodeJS.Timeout | null = null;

  // 디바운스 함수 (스크롤이 멈춘 후 300ms 후에 실행)
  const debouncedUpdateVisibility = () => {
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    debounceTimer = setTimeout(() => {
      const visibleArray = Array.from(visibleSymbols.value);
      if (visibleArray.length > 0) {
        addVisibleSymbols('SymbolList', visibleArray);
        console.log(`[SymbolList] 가시성 업데이트: ${visibleArray.length}개 종목`, visibleArray);
      }
      debounceTimer = null;
    }, 300); // 300ms 디바운스
  };

  // Intersection Observer 설정
  const setupVisibilityObserver = () => {
    if (!symbolListRef.value) {
      console.error('[SymbolList] symbolListRef 없음 - Observer 설정 불가');
      return;
    }

    try {
      // 기존 Observer 정리
      if (intersectionObserver) {
        intersectionObserver.disconnect();
      }

      // 새로운 Observer 생성
      intersectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const ticker = entry.target.getAttribute('data-ticker');
            if (!ticker) return;

            if (entry.isIntersecting) {
              // 종목 추가
              visibleSymbols.value.add(ticker);
            } else {
              // 종목 제외
              visibleSymbols.value.delete(ticker);
            }
          });

          // 디바운스된 가시성 상태 업데이트 (스크롤이 멈춘 후에만 실행)
          debouncedUpdateVisibility();
        },
        {
          root: symbolListRef.value,
          rootMargin: '50px', // 50px 여유를 두고 감지
          threshold: 0.1, // 10% 이상 보이면 감지
        }
      );

      // 모든 종목 요소 관찰 시작
      const symbolElements = symbolListRef.value.querySelectorAll('.symbol-item');
      symbolElements.forEach((element) => {
        intersectionObserver!.observe(element);
      });

      console.error(`[SymbolList] Observer 설정 완료: ${symbolElements.length}개 종목 관찰 시작`);
    } catch (error) {
      console.error('[SymbolList] Observer 설정 실패:', error);
      // 폴백: 전체 종목 등록
      const allSymbols = filteredSymbols.value.map((s) => s.ticker);
      addVisibleSymbols('SymbolList', allSymbols);
      console.error('[SymbolList] 폴백으로 전체 종목 등록:', allSymbols);
    }
  };

  // filteredSymbols가 변경될 때마다 Observer 재설정
  watch(
    filteredSymbols,
    async () => {
      try {
        console.error(`[SymbolList] filteredSymbols 변경: ${filteredSymbols.value.length}개`);
        await nextTick(); // DOM 업데이트 대기
        setTimeout(setupVisibilityObserver, 100);
      } catch (error) {
        console.error('[SymbolList] filteredSymbols 변경 처리 실패:', error);
        // 폴백: 전체 종목 등록
        const allSymbols = filteredSymbols.value.map((s) => s.ticker);
        addVisibleSymbols('SymbolList', allSymbols);
        console.error('[SymbolList] 폴백으로 전체 종목 등록:', allSymbols);
      }
    },
    { deep: true }
  );

  // 컴포넌트 마운트 시 Observer 설정
  onMounted(() => {
    try {
      console.error('[SymbolList] 컴포넌트 마운트됨 - Observer 설정 시작');
      // 약간의 지연을 두고 Observer 설정 (DOM이 완전히 렌더링된 후)
      setTimeout(setupVisibilityObserver, 100);
    } catch (error) {
      console.error('[SymbolList] 마운트 시 Observer 설정 실패:', error);
      // 폴백: 전체 종목 등록
      const allSymbols = filteredSymbols.value.map((s) => s.ticker);
      addVisibleSymbols('SymbolList', allSymbols);
      console.error('[SymbolList] 폴백으로 전체 종목 등록:', allSymbols);
    }
  });

  // 컴포넌트 언마운트 시 Observer 정리
  onUnmounted(() => {
    try {
      console.error('[SymbolList] 컴포넌트 언마운트 - Observer 정리');

      // 디바운스 타이머 정리
      if (debounceTimer) {
        clearTimeout(debounceTimer);
        debounceTimer = null;
      }

      // Intersection Observer 정리
      if (intersectionObserver) {
        intersectionObserver.disconnect();
        intersectionObserver = null;
      }

      // 가시성 상태 초기화
      visibleSymbols.value.clear();
    } catch (error) {
      console.error('[SymbolList] 언마운트 시 정리 실패:', error);
    }
  });

  return {
    symbolListRef,
    visibleSymbols,
  };
}
