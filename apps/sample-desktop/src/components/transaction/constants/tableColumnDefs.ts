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
