import type { IndividualSignUpInfo, UploadedFile } from '@/types/signup';
import { defineStore } from 'pinia';
import { reactive } from 'vue';

export const useIndividualSignupStore = defineStore('individualSignup', () => {
  const individual = reactive<IndividualSignUpInfo>({
    name: '', //이름(한글)
    email: '', //이메일
    phone: '', //휴대폰번호
    birth: '', //생년월일
    password: '', //비밀번호

    lastName: '', //성(영문)
    firstName: '', //이름(영문)
    address: '', //주소(한글)
    addressDetail: '', //상세주소(한글)
    addressEn: '', //주소(영문)
    addressDetailEn: '', //상세주소(영문)

    identityDocument: null, //신분증(주민등록증 또는 운전면허증)
    identityCertificateDocument: null, //신분증 초본(영문)
  });

  const updateIndividual = (value: IndividualSignUpInfo) => {
    individual.name = value.name;
    individual.email = value.email;
    individual.phone = value.phone;
    individual.birth = value.birth;
    individual.password = value.password;
    individual.lastName = value.lastName;
    individual.firstName = value.firstName;
    individual.address = value.address;
    individual.addressDetail = value.addressDetail;
    individual.addressEn = value.addressEn;
    individual.addressDetailEn = value.addressDetailEn;
  };

  const uploadIndividualDocument = (
    individualDocument: UploadedFile,
    identityCertificateDocument: UploadedFile
  ) => {
    individual.identityDocument = individualDocument;
    individual.identityCertificateDocument = identityCertificateDocument;
  };

  return {
    individual,
    updateIndividual,
    uploadIndividualDocument,
  };
});
