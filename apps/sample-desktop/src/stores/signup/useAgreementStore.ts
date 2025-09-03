import type { AgreementInfo } from '@/types/signup';
import { defineStore } from 'pinia';
import { reactive } from 'vue';

export const useAgreementStore = defineStore('agreement', () => {
  const agreements = reactive<AgreementInfo>({
    serviceUseNotificationYn: false, // 서비스 이용 약관 동의
    personalInfoCollectionYn: false, // 개인정보 수집 및 이용 동의
    marketingUseAndAdvertiseInfoYn: false, // 마케팅 활용 및 광고성 정보 수신 동의
  });

  const updateAgreements = (value: AgreementInfo) => {
    agreements.serviceUseNotificationYn = value.serviceUseNotificationYn;
    agreements.personalInfoCollectionYn = value.personalInfoCollectionYn;
    agreements.marketingUseAndAdvertiseInfoYn = value.marketingUseAndAdvertiseInfoYn;
  };

  return {
    agreements,
    updateAgreements,
  };
});
