import {
  AgreementInfo,
  CorporateSignUpInfo,
  IndividualSignUpInfo,
  UploadedFile,
  UserInfo,
} from '@/types/store/signup.types';
import { defineStore } from 'pinia';
import { reactive } from 'vue';

export const useSignupStore = defineStore('signup', () => {
  const terms = reactive<AgreementInfo>({
    serviceUseNotificationYn: false,
    personalInfoCollectionYn: false,
    marketingUseAndAdvertiseInfoYn: false,
  });

  const userInfo = reactive<UserInfo>({
    name: '', //이름(한글)
    email: '', //이메일
    phone: '', //휴대폰번호
    birth: '', //생년월일
    password: '', //비밀번호
  });

  const individualInfo = reactive<IndividualSignUpInfo>({
    lastName: '', //성(영문)
    firstName: '', //이름(영문)
    address: '', //주소(한글)
    addressDetail: '', //상세주소(한글)
    addressEn: '', //주소(영문)
    addressDetailEn: '', //상세주소(영문)

    identityDocument: null, //신분증(주민등록증 또는 운전면허증)
    identityCertificateDocument: null, //신분증 초본(영문)
  });

  const corporateInfo = reactive<CorporateSignUpInfo>({
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

  /**
   *
   * @param value 약관 동의 내용
   * - serviceUseNotificationYn: 서비스 이용 약관 동의 여부(필수)
   * - personalInfoCollectionYn: 개인정보 수집 및 이용 동의 여부(필수)
   * - marketingUseAndAdvertiseInfoYn: 마케팅 활용 및 광고성 정보 수신 동의 여부(선택)
   *
   * @description 약관 동의 내용을 업데이트 합니다.
   */
  const updateTerms = (value: AgreementInfo) => {
    terms.serviceUseNotificationYn = value.serviceUseNotificationYn;
    terms.personalInfoCollectionYn = value.personalInfoCollectionYn;
    terms.marketingUseAndAdvertiseInfoYn = value.marketingUseAndAdvertiseInfoYn;
  };

  /**
   *
   * @param value 사용자 정보
   *
   * @description 휴대폰인증(PASS) 후 얻은 사용자 정보를 업데이트합니다.
   */
  const updateUserInfo = (value: UserInfo) => {
    userInfo.name = value.name;
    userInfo.phone = value.phone;
    userInfo.birth = value.birth;
  };

  /**
   *
   * @param value 이메일
   *
   * @description 이메일 검증 후 이메일 정보를 업데이트합니다.
   */
  const updateUserEmail = (value: string) => {
    userInfo.email = value;
  };

  /**
   *
   * @param value 비밀번호
   *
   * @description 비밀번호 유효성검사 후 비밀번호 정보를 업데이트합니다.
   */
  const updateUserPassword = (value: string) => {
    userInfo.password = value;
  };

  /**
   *
   * @param value 개인 회원가입 정보
   *
   * @description 개인 회원가입 시 필요한 정보를 업데이트합니다.
   */
  const updateIndividual = (value: IndividualSignUpInfo) => {
    individualInfo.lastName = value.lastName;
    individualInfo.firstName = value.firstName;
    individualInfo.address = value.address;
    individualInfo.addressDetail = value.addressDetail;
    individualInfo.addressEn = value.addressEn;
    individualInfo.addressDetailEn = value.addressDetailEn;
  };

  /**
   *
   * @param value 개인 회원가입 정보
   *
   * @description 개인 회원가입 시 필요한 파일을 업데이트합니다.
   */
  const uploadIndividualDocument = (
    individualDocument: UploadedFile,
    identityCertificateDocument: UploadedFile
  ) => {
    individualInfo.identityDocument = individualDocument;
    individualInfo.identityCertificateDocument = identityCertificateDocument;
  };

  /**
   *
   * @param value 법인 회원가입 정보
   *
   * @description 법인 회원가입 시 필요한 정보를 업데이트합니다.
   */
  const updateCorporate = (value: CorporateSignUpInfo) => {
    corporateInfo.corpName = value.corpName;
    corporateInfo.corpNumber = value.corpNumber;
    corporateInfo.corpAdminLastName = value.corpAdminLastName;
    corporateInfo.corpAdminFirstName = value.corpAdminFirstName;
    corporateInfo.corpAdminBirth = value.corpAdminBirth;
    corporateInfo.corpAddress = value.corpAddress;
    corporateInfo.corpAddressDetail = value.corpAddressDetail;
  };

  /**
   *
   * @param value 법인 회원가입 정보
   *
   * @description 법인 회원가입 시 필요한 파일을 업데이트합니다.
   */
  const uploadCorpInfoDocument = (
    businessCertificateDocument: UploadedFile,
    corpAdminRegistrationDocument: UploadedFile,
    utilityReceiptDocument: UploadedFile
  ) => {
    corporateInfo.businessCertificateDocument = businessCertificateDocument;
    corporateInfo.corpAdminRegistrationDocument = corpAdminRegistrationDocument;
    corporateInfo.utilityReceiptDocument = utilityReceiptDocument;
  };

  /**
   *
   * @param value 법인 대표 여권 사본 (1개 이상)
   *
   * @description 법인 회원가입 시 필요한 법인대표 관련 파일을 업데이트합니다.
   */
  const uploadCorpAdminDocument = (corpAdminPassportCopy: UploadedFile[]) => {
    corporateInfo.corpAdminPassportCopy = corpAdminPassportCopy;
  };

  return {
    terms,
    userInfo,
    individualInfo,
    corporateInfo,

    updateTerms,
    updateUserInfo,
    updateUserEmail,
    updateUserPassword,
    updateIndividual,
    uploadIndividualDocument,
    updateCorporate,
    uploadCorpInfoDocument,
    uploadCorpAdminDocument,
  };
});
