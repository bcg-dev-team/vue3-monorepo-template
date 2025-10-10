import LocalStorageService from './localStorage/local-storage.service';
import LocalStorageKey from './localStorage/local-storage-key';
import router from '@/router';

export const Logout = () => {
  LocalStorageService.removeItem(LocalStorageKey.ACCESS_TOKEN);
  router.push({ name: 'login' });
};
