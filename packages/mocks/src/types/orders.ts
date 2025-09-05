/**
 * 주문 관련 타입 정의
 */

// 주문 데이터 타입
export interface OrderData {
  id: number;
  symbol: string;
  type: 'Buy' | 'Sell';
  price: number;
  quantity: number;
  status: 'Open' | 'Closed' | 'Pending' | 'Cancelled';
  time: string;
  createdAt: number;
}

// 주문 검색 파라미터
export interface OrderSearchParams {
  symbol?: string;
  type?: 'Buy' | 'Sell';
  status?: 'Open' | 'Closed' | 'Pending' | 'Cancelled';
  limit?: number;
  offset?: number;
}

// 주문 통계
export interface OrderStats {
  total: number;
  open: number;
  closed: number;
  pending: number;
  cancelled: number;
  totalValue: number;
}
