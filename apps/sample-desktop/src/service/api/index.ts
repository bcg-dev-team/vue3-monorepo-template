import {
  StockService,
  TermsService,
  TradeService,
  UserService,
  AccountService,
  AuthService,
} from '@template/api';
import api from '@/modules/axios';

export const userService = new UserService(api);
export const termsService = new TermsService(api);
export const tradeService = new TradeService(api);
export const accountService = new AccountService(api);
export const authService = new AuthService(api);
export const stockService = new StockService(api);
