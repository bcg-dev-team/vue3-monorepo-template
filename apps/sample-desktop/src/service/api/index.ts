import { TradeService } from './trade.service';
import { TermsService } from './terms.service';
import { UserService } from './user.service';
import api from '@/modules/axios';

export const userService = new UserService(api);
export const termsService = new TermsService(api);
export const tradeService = new TradeService(api);
