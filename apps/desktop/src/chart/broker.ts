import {
  AccountId,
  AccountManagerInfo,
  AccountMetainfo,
  ActionMetaInfo,
  DefaultContextMenuActionsParams,
  Execution,
  IBrokerConnectionAdapterHost,
  IBrokerTerminal,
  InstrumentInfo,
  IsTradableResult,
  Order,
  OrderStatus,
  OrderType,
  PlacedOrder,
  PlaceOrderResult,
  Position,
  PreOrder,
  TradeContext,
} from '../../charting_library/charting_library.d.ts';

export declare enum StandardFormatterName {
  Date = 'date',
  DateOrDateTime = 'dateOrDateTime',
  Default = 'default',
  Fixed = 'fixed',
  FixedInCurrency = 'fixedInCurrency',
  VariablePrecision = 'variablePrecision',
  FormatQuantity = 'formatQuantity',
  FormatPrice = 'formatPrice',
  FormatPriceForexSup = 'formatPriceForexSup',
  FormatPriceInCurrency = 'formatPriceInCurrency',
  IntegerSeparated = 'integerSeparated',
  LocalDate = 'localDate',
  LocalDateOrDateTime = 'localDateOrDateTime',
  Percentage = 'percentage',
  Pips = 'pips',
  Profit = 'profit',
  ProfitInInstrumentCurrency = 'profitInInstrumentCurrency',
  Side = 'side',
  PositionSide = 'positionSide',
  Status = 'status',
  Symbol = 'symbol',
  Text = 'text',
  Type = 'type',
  MarginPercent = 'marginPercent',
  Empty = 'empty',
}

export declare enum ConnectionStatus {
  Connected = 1,
  Connecting = 2,
  Disconnected = 3,
  Error = 4,
}

import { IDatafeedQuotesApi } from '../../charting_library/charting_library.d.ts';

export const enum CommonAccountManagerColumnId {
  // You should use this column ID if you want to fix the column in the positions and orders tables.
  Symbol = 'symbol',
}

export abstract class AbstractBrokerMinimal implements IBrokerTerminal {
  protected readonly _host: IBrokerConnectionAdapterHost;
  protected readonly _quotesProvider: IDatafeedQuotesApi;

  constructor(host: IBrokerConnectionAdapterHost, quotesProvider: IDatafeedQuotesApi) {
    this._host = host;
    this._quotesProvider = quotesProvider;
  }

  abstract orders(): Promise<Order[]>;

  abstract positions(): Promise<Position[]>;

  abstract modifyOrder(order: Order, confirmId?: string): Promise<void>;

  abstract cancelOrder(orderId: string): Promise<void>;

  abstract chartContextMenuActions(
    context: TradeContext,
    options?: DefaultContextMenuActionsParams
  ): Promise<ActionMetaInfo[]>;

  abstract isTradable(symbol: string): Promise<boolean | IsTradableResult>;

  abstract connectionStatus(): ConnectionStatus;

  abstract executions(symbol: string): Promise<Execution[]>;

  abstract symbolInfo(symbol: string): Promise<InstrumentInfo>;

  abstract accountManagerInfo(): AccountManagerInfo;

  abstract accountsMetainfo(): Promise<AccountMetainfo[]>;

  abstract currentAccount(): AccountId;

  abstract placeOrder(order: PreOrder): Promise<PlaceOrderResult>;
}

export class BrokerMinimal extends AbstractBrokerMinimal {
  orders(): Promise<Order[]> {
    throw new Error('Method `orders` not implemented.');
  }

  positions(): Promise<Position[]> {
    throw new Error('Method `positions` not implemented.');
  }

  modifyOrder(order: Order, confirmId?: string | undefined): Promise<void> {
    throw new Error('Method `modifyOrder` not implemented.');
  }

  cancelOrder(orderId: string): Promise<void> {
    throw new Error('Method `cancelOrder` not implemented.');
  }

  chartContextMenuActions(
    context: TradeContext,
    options?: DefaultContextMenuActionsParams | undefined
  ): Promise<ActionMetaInfo[]> {
    return this._host.defaultContextMenuActions(context);
  }

  // If not implemented this method will render the Buy/Sell buttons with
  // a white background + tooltip indicating that the symbol cannot be traded.
  async isTradable(symbol: string): Promise<boolean | IsTradableResult> {
    return Promise.resolve(true);
  }

  // If this method is not returning a Connected state, Account Manager will present a continuous loading spinner.
  connectionStatus(): ConnectionStatus {
    return ConnectionStatus.Connected;
  }

  executions(symbol: string): Promise<Execution[]> {
    throw new Error('Method `executions` not implemented.');
  }

  // If this method is not implemented the Buy/Sell buttons in the Legend
  // will display "..." (3 dots) instead of values returned by quotes.
  async symbolInfo(symbol: string): Promise<InstrumentInfo> {
    const mintick = await this._host.getSymbolMinTick(symbol);
    const pipSize = mintick; // Pip size can differ from minTick
    const accountCurrencyRate = 1; // Account currency rate
    const pointValue = 1; // USD value of 1 point of price

    return {
      qty: {
        min: 1,
        max: 1e12,
        step: 1,
      },
      pipValue: pipSize * pointValue * accountCurrencyRate || 1,
      pipSize: pipSize,
      minTick: mintick,
      description: '',
    };
  }

  // If this method is not implemented the Account Manager will be empty with just the "Trade" button displayed.
  accountManagerInfo(): AccountManagerInfo {
    return {
      accountTitle: 'Trading Sample',
      summary: [],
      orderColumns: [
        {
          label: 'Symbol',
          formatter: StandardFormatterName.Symbol,
          id: CommonAccountManagerColumnId.Symbol,
          dataFields: ['symbol', 'symbol', 'message'],
        },
        {
          label: 'Side',
          id: 'side',
          dataFields: ['side'],
          formatter: StandardFormatterName.Side,
        },
        {
          label: 'Type',
          id: 'type',
          dataFields: ['type', 'parentId', 'stopType'],
          formatter: StandardFormatterName.Type,
        },
        {
          label: 'Qty',
          alignment: 'right',
          id: 'qty',
          dataFields: ['qty'],
          formatter: StandardFormatterName.FormatQuantity,
        },
        {
          label: 'Status',
          id: 'status',
          dataFields: ['status'],
          formatter: StandardFormatterName.Status,
        },
        {
          label: 'Order ID',
          id: 'id',
          dataFields: ['id'],
        },
      ],
      positionColumns: [
        {
          label: 'Symbol',
          formatter: StandardFormatterName.Symbol,
          id: CommonAccountManagerColumnId.Symbol,
          dataFields: ['symbol', 'symbol', 'message'],
        },
        {
          label: 'Side',
          id: 'side',
          dataFields: ['side'],
          formatter: StandardFormatterName.Side,
        },
        {
          label: 'Qty',
          alignment: 'right',
          id: 'qty',
          dataFields: ['qty'],
          formatter: StandardFormatterName.FormatQuantity,
        },
      ],
      pages: [],
    };
  }

  async accountsMetainfo(): Promise<AccountMetainfo[]> {
    return [
      {
        id: '1' as AccountId,
        name: 'Test account',
      },
    ];
  }

  currentAccount(): AccountId {
    return '1' as AccountId;
  }

  async placeOrder(order: PreOrder): Promise<PlaceOrderResult> {
    throw new Error('Method `placeOrder` not implemented.');
  }
}
