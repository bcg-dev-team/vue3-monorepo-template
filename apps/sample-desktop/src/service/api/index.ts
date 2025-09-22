import { TermsService, TradeService, UserService, AccountService } from '@template/api';
import api from '@/modules/axios';

export const userService = new UserService(api);
export const termsService = new TermsService(api);
export const tradeService = new TradeService(api);
export const accountService = new AccountService(api);
