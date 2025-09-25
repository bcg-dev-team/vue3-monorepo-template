import { defineStore } from 'pinia';
import { ref } from 'vue';

/**
 * 주문/체결 검색 조건 스토어
 * 화면의 검색 박스에서 선택/입력한 값을 보관하고 공유합니다.
 */
export const useTradeSearchStore = defineStore('tradeSearch', () => {
  // L/S 구분
  const positionCd = ref<string>('');
  // 매입/청산 구분
  const orderCd = ref<string>('');
  // 기간: 시작일, 종료일 (yyyy-MM-dd 형식 가정)
  const orderStartDate = ref<string>('');
  const orderEndDate = ref<string>('');

  /**
   * L/S 구분값을 설정합니다.
   * @param value - L/S 코드 값
   */
  const setPositionCd = (value: string) => {
    positionCd.value = value;
  };

  /**
   * 매입/청산 구분값을 설정합니다.
   * @param value - 주문 구분 코드 값
   */
  const setOrderCd = (value: string) => {
    orderCd.value = value;
  };

  /**
   * 기간(시작/종료일)을 설정합니다.
   * @param start - 시작일(yyyy-MM-dd)
   * @param end - 종료일(yyyy-MM-dd)
   */
  const setOrderPeriod = (start: string, end: string) => {
    orderStartDate.value = start;
    orderEndDate.value = end;
  };

  /**
   * 검색 조건을 초기화합니다.
   */
  const reset = () => {
    positionCd.value = '';
    orderCd.value = '';
    orderStartDate.value = '';
    orderEndDate.value = '';
  };

  return {
    positionCd,
    orderCd,
    orderStartDate,
    orderEndDate,
    setPositionCd,
    setOrderCd,
    setOrderPeriod,
    reset,
  };
});
