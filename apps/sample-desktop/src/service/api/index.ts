import { TermsService } from '@template/api';
import { UserService } from '@template/api';
import api from '@/modules/axios';

export const userService = new UserService(api);
export const termsService = new TermsService(api);
