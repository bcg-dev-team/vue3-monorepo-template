import LocalStorageService from './localStorage/local-storage.service';
import LocalStorageKey from './localStorage/local-storage-key';
import router from '@/router';

export const Logout = () => {
  LocalStorageService.removeItem(LocalStorageKey.ACCESS_TOKEN);

  //FIXME: 임시 alert 처리
  alert('세션이 만료 되었습니다. \n 다시 로그인 해주세요.');
  router.push({ name: 'login' });
};
