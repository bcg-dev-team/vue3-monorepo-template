import type { CorporateSignUpInfo, UploadedFile } from '@/types/signup';
import { defineStore } from 'pinia';
import { reactive } from 'vue';

export const useCorporateSignupStore = defineStore('corporateSignup', () => {
  const corporate = reactive<CorporateSignUpInfo>({
    name: '', //이름(한글)
    email: '', //이메일
    phone: '', //휴대폰번호
    birth: '', //생년월일
    password: '', //비밀번호

    corpName: '', //법인명
    corpNumber: '', //법인등록번호
    corpAdminLastName: '', //법인대표 성(영문)
    corpAdminFirstName: '', //법인대표 이름(영문)
    corpAdminBirth: '', //법인대표 생년월일
    corpAddress: '', //법인주소
    corpAddressDetail: '', //법인주소 상세

    businessCertificateDocument: null, //사업자등록증명원
    corpAdminRegistrationDocument: null, //법인대표 초본(영문)
    utilityReceiptDocument: null, //법인명 공과금 납부서
    shareholderListDocument: null, //주주 명부(영문 공증 필요)
    corpAdminPassportCopy: [], //법인대표 여권 사본(2명 이상일 경우 2개 이상상)
  });

  const updateCorporate = (value: CorporateSignUpInfo) => {
    corporate.name = value.name;
    corporate.email = value.email;
    corporate.phone = value.phone;
    corporate.birth = value.birth;
    corporate.password = value.password;
    corporate.corpName = value.corpName;
    corporate.corpNumber = value.corpNumber;
    corporate.corpAdminLastName = value.corpAdminLastName;
    corporate.corpAdminFirstName = value.corpAdminFirstName;
    corporate.corpAdminBirth = value.corpAdminBirth;
    corporate.corpAddress = value.corpAddress;
    corporate.corpAddressDetail = value.corpAddressDetail;
  };

  const uploadCorpInfoDocument = (
    businessCertificateDocument: UploadedFile,
    corpAdminRegistrationDocument: UploadedFile,
    utilityReceiptDocument: UploadedFile
  ) => {
    corporate.businessCertificateDocument = businessCertificateDocument;
    corporate.corpAdminRegistrationDocument = corpAdminRegistrationDocument;
    corporate.utilityReceiptDocument = utilityReceiptDocument;
  };

  const uploadCorpAdminDocument = (corpAdminPassportCopy: UploadedFile[]) => {
    corporate.corpAdminPassportCopy = corpAdminPassportCopy;
  };

  return {
    corporate,
    updateCorporate,
    uploadCorpInfoDocument,
    uploadCorpAdminDocument,
  };
});
