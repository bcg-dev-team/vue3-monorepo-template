import type { ColDef } from 'ag-grid-community';

/**
 * 주문 상세 내역 테이블 컬럼 정의
 */
export const orderDetailColumns: ColDef[] = [
  {
    headerName: '주문일자',
    field: 'orderDate',
    width: 120,
    pinned: 'left',
    cellStyle: { textAlign: 'center' },
    filter: false,
  },
  {
    headerName: '주문번호',
    field: 'orderNo',
    width: 120,
    cellStyle: { textAlign: 'center' },
  },
  {
    headerName: '체결일자',
    field: 'executionDate',
    width: 80,
    cellStyle: { textAlign: 'center' },
  },
  {
    headerName: '체결번호',
    field: 'executionNo',
    width: 120,
    cellStyle: { textAlign: 'center' },
  },
  {
    headerName: '종목코드',
    field: 'stockCd',
    width: 100,
    cellStyle: { textAlign: 'center' },
  },
  {
    headerName: 'L / S',
    field: 'positionCd',
    width: 80,
    cellStyle: { textAlign: 'center' },
  },
  {
    headerName: '유형',
    field: 'orderTypeCd',
    width: 140,
    cellStyle: { textAlign: 'center' },
  },
  {
    headerName: '구분',
    field: 'sideCd',
    width: 60,
    cellStyle: { textAlign: 'center' },
  },
  {
    headerName: '주문수량',
    field: 'orderQuantity',
    width: 80,
    cellStyle: { textAlign: 'right' },
  },
  {
    headerName: '배리어가격',
    field: 'barrierPrice',
    cellStyle: { textAlign: 'right' },
  },
  {
    headerName: '주문가격',
    field: 'orderPrice',
    cellStyle: { textAlign: 'right' },
  },
  {
    headerName: '이익실현배리어가격',
    field: 'profitRealizationBarrierPrice',
    cellStyle: { textAlign: 'right' },
  },
  {
    headerName: '손실제한배리어가격',
    field: 'lossCutBarrierPrice',
    cellStyle: { textAlign: 'right' },
  },
  {
    headerName: '체결수량',
    field: 'executionQuantity',
    width: 80,
    cellStyle: { textAlign: 'right' },
  },
  {
    headerName: '체결가격',
    field: 'executionPrice',
    cellStyle: { textAlign: 'right' },
  },
  {
    headerName: '주문잔량',
    field: 'orderBalance',
    cellStyle: { textAlign: 'right' },
  },
  {
    headerName: '주문상태코드',
    field: 'orderStatusCd',
    cellStyle: { textAlign: 'center' },
  },
  {
    headerName: '접수일시',
    field: 'receptionDate',
    cellStyle: { textAlign: 'center' },
  },
  {
    headerName: '거부사유명',
    field: 'rejectReason',
    cellStyle: { textAlign: 'center' },
  },
];

/**
 * 주문 요약 테이블 컬럼 정의
 */
export const orderSummaryColumns: ColDef[] = [
  {
    headerName: '통화',
    field: 'tradeCurrencyCd',
    width: 120,
    pinned: 'left',
    cellStyle: { textAlign: 'center', fontWeight: 'bold' },
    headerClass: 'summary-header',
    rowDrag: false,
  },
  {
    headerName: '매수',
    headerClass: 'buy-header',
    children: [
      {
        headerName: '매입수량',
        field: 'longExecutionQuantity',
        cellStyle: { textAlign: 'right' },
        headerClass: 'buy-header',
      },
      {
        headerName: '매입금액',
        field: 'longExecutionPrice',
        cellStyle: { textAlign: 'right' },
        headerClass: 'buy-header',
      },
      {
        headerName: '청산수량',
        field: 'reShortExecutionQuantity',
        cellStyle: { textAlign: 'right' },
        headerClass: 'buy-header',
      },
      {
        headerName: '청산금액',
        field: 'reShortExecutionPrice',
        cellStyle: { textAlign: 'right' },
        headerClass: 'buy-header',
      },
    ],
  } as any,
  {
    headerName: '매도',
    headerClass: 'sell-header',
    children: [
      {
        headerName: '매입수량',
        field: 'shortExecutionQuantity',
        cellStyle: { textAlign: 'right' },
        headerClass: 'sell-header',
      },
      {
        headerName: '매입금액',
        field: 'shortExecutionPrice',
        cellStyle: { textAlign: 'right' },
        headerClass: 'sell-header',
      },
      {
        headerName: '청산수량',
        field: 'reLongExecutionQuantity',
        cellStyle: { textAlign: 'right' },
        headerClass: 'sell-header',
      },
      {
        headerName: '청산금액',
        field: 'reLongExecutionPrice',
        cellStyle: { textAlign: 'right' },
        headerClass: 'sell-header',
      },
    ],
  } as any,
];

/**
 * 거래내역 청산손익 요약 테이블 컬럼 정의
 */
export const profitAndLossSummaryColumns: ColDef[] = [
  {
    headerName: '구분',
    field: 'type',
    width: 120,
  },
  {
    headerName: '매입금액',
    field: 'purchaseAmount',
    width: 120,
  },
  {
    headerName: '청산금액',
    field: 'liquidationAmount',
    width: 120,
  },
  {
    headerName: '청산손익',
    field: 'liquidationPnL',
    width: 120,
  },
  {
    headerName: '수익률',
    field: 'returnRate',
    width: 120,
  },
  {
    headerName: '수수료',
    field: 'commission',
    width: 120,
  },
  {
    headerName: '스왑',
    field: 'swap',
    width: 120,
  },
  {
    headerName: '순손익',
    field: 'netPnL',
    width: 120,
  },
  {
    headerName: '순수익률',
    field: 'netReturnRate',
    width: 120,
  },
];

/**
 * 거래내역 청산손익 상세 테이블 컬럼 정의
 */
export const profitAndLossDetailColumns: ColDef[] = [
  {
    headerName: '청산일자',
    field: 'liquidationDate',
    width: 120,
  },
  {
    headerName: '종목코드',
    field: 'itemCode',
    width: 120,
  },
  {
    headerName: '구분',
    field: 'type',
    width: 120,
  },
  {
    headerName: '매입가격',
    field: 'purchasePrice',
    width: 120,
  },
  {
    headerName: '청산가격',
    field: 'liquidationPrice',
    width: 120,
  },
  {
    headerName: '청산수량',
    field: 'liquidationQuantity',
    width: 120,
  },
  {
    headerName: '청산손익',
    field: 'liquidationPnL',
    width: 120,
  },
  {
    headerName: '스왑수수료',
    field: 'swap',
    width: 120,
  },
  {
    headerName: '체결수수료',
    field: 'tradeCharge',
    width: 120,
  },
  {
    headerName: '청산산순손익',
    field: 'netPnL',
    width: 120,
  },
  {
    headerName: '매입일시',
    field: 'purchaseDate',
    width: 120,
  },
  {
    headerName: '청산일시',
    field: 'liquidationDate',
    width: 120,
  },
];

/**
 * 거래내역 결제내역 상세 테이블 컬럼 정의
 */
export const paymentDetailColumns: ColDef[] = [
  {
    headerName: '결제일자',
    field: 'paymentDate',
    width: 120,
  },
  {
    headerName: '종목코드',
    field: 'itemCode',
    width: 120,
  },
  { headerName: '적요명', field: 'description', width: 120 },
  {
    headerName: '통화',
    field: 'currency',
    width: 120,
  },
  {
    headerName: '구분',
    field: 'type',
    width: 120,
  },
  { headerName: '유형', field: 'type2', width: 120 },

  {
    headerName: '체결수량',
    field: 'executedQuantity',
    width: 120,
  },

  {
    headerName: '체결가격',
    field: 'executedPrice',
    width: 120,
  },
  {
    headerName: '체결금액',
    field: 'executedAmount',
    width: 120,
  },
  {
    headerName: '결제금액',
    field: 'settlementAmount',
    width: 120,
  },
  {
    headerName: '잔고수량',
    children: [
      {
        headerName: '이전',
        field: 'balanceQuantityBefore',
        width: 120,
      },
      {
        headerName: '이후',
        field: 'balanceQuantityAfter',
        width: 120,
      },
    ],
  } as any,
  {
    headerName: '잔고수량 ',
    children: [
      {
        headerName: '이전',
        field: 'balanceQuantityBefore',
        width: 120,
      },
      {
        headerName: '이후',
        field: 'balanceQuantityAfter',
        width: 120,
      },
    ],
  } as any,
];
