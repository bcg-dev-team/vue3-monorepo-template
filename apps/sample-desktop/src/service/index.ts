import { TermsService } from './terms.service';
import { UserService } from './user.service';
import api from './axios';

export const userService = new UserService(api);
export const termsService = new TermsService(api);
