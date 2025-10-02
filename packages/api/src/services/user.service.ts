import {
  MemberType,
  MemberApprovalRequest,
  MemberApprovalResponse,
  IndividualMemberJoinRequest,
  IndividualMemberJoinResponse,
  CorporateMemberJoinRequest,
  CorporateMemberJoinResponse,
  FindIdRequest,
  FindIdResponse,
} from '../types/user.types';
import { CustomAxiosInstance } from '../types';

export class UserService {
  private axios: CustomAxiosInstance;

  constructor(axiosInstance: CustomAxiosInstance) {
    this.axios = axiosInstance;
  }

  /**
   * 회원승인 (추후 BO로 이동)
   * 회원가입된 아이디의 승인을 처리합니다. 개인회원(INDIVIDUAL)과 법인회원(CORPORATE)을 모두 지원합니다.
   * @param email - 승인할 회원의 이메일
   * @param memberType - 회원 타입 (INDIVIDUAL | CORPORATE)
   * @param approvedAdminUser - 승인하는 관리자 사용자 이메일
   * @returns 승인 결과
   */
  approveMember(email: string, memberType: MemberType, approvedAdminUser: string) {
    const requestBody: MemberApprovalRequest = {
      memberType,
      approvedAdminUser,
    };

    return this.axios.post<MemberApprovalResponse>(
      `/main/v1/members/${email}/approve`,
      requestBody
    ); // 제네릭 타입 추가
  }

  /**
   * 아이디 찾기
   * SMS 인증이 완료된 사용자의 마스킹된 이메일을 반환합니다. SMS 인증이 완료되지 않은 경우 오류를 반환합니다.
   * @param name - 사용자 이름
   * @param phoneNo - 휴대폰 번호
   * @returns 마스킹된 이메일 정보
   */
  findId(name: string, phoneNo: string) {
    const requestBody: FindIdRequest = {
      name,
      phoneNo,
    };

    return this.axios.post<FindIdResponse>('/main/v1/members/find-id', requestBody);
  }

  /**
   * 개인회원 가입
   * 새로운 개인회원을 등록합니다. 개인정보와 신분증, 추가 신분증명서(선택사항)를 업로드하여 가입을 진행합니다.
   * @param individualMember - 개인회원 가입 요청 데이터 (개인정보 및 신분증 파일)
   * @returns 개인회원 가입 결과 (생성된 회원 ID 포함)
   */
  joinIndividualMember(individualMember: IndividualMemberJoinRequest) {
    const formData = new FormData();

    // 개인정보 객체를 JSON으로 직렬화하여 individualMember 키로 추가
    const individualMemberData = {
      ci: individualMember.ci,
      email: individualMember.email,
      password: individualMember.password,
      name: individualMember.name,
      phoneNo: individualMember.phoneNo,
      birth: individualMember.birth,
      firstNameEn: individualMember.firstNameEn,
      lastNameEn: individualMember.lastNameEn,
      address: individualMember.address,
      addressEn: individualMember.addressEn,
      detailAddress: individualMember.detailAddress,
      detailAddressEn: individualMember.detailAddressEn,
      zipCode: individualMember.zipCode,
    };

    formData.append('individualMember', JSON.stringify(individualMemberData));

    // 필수 파일: 신분증
    formData.append('idCard', individualMember.idCard);

    // 선택 파일: 추가 신분증명서
    if (individualMember.additionalIdDocument) {
      formData.append('additionalIdDocument', individualMember.additionalIdDocument);
    }

    return this.axios.post<IndividualMemberJoinResponse>(
      '/main/v1/members/join/individual',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
  }

  /**
   * 법인회원 가입
   * 새로운 법인회원을 등록합니다. 법인정보와 필수 서류들을 업로드하여 가입을 진행합니다.
   * @param corporateMember - 법인회원 가입 요청 데이터 (법인정보 및 필수 서류 파일들)
   * @returns 법인회원 가입 결과 (생성된 회원 ID 포함)
   */
  joinCorporateMember(corporateMember: CorporateMemberJoinRequest) {
    const formData = new FormData();

    // 법인정보 객체를 JSON으로 직렬화하여 corporateMember 키로 추가
    const corporateMemberData = {
      ci: corporateMember.ci,
      email: corporateMember.email,
      password: corporateMember.password,
      name: corporateMember.name,
      phoneNo: corporateMember.phoneNo,
      companyName: corporateMember.companyName,
      businessNumber: corporateMember.businessNumber,
      address: corporateMember.address,
      addressEn: corporateMember.addressEn,
      detailAddress: corporateMember.detailAddress,
      detailAddressEn: corporateMember.detailAddressEn,
      zipCode: corporateMember.zipCode,
      representativeFirstName: corporateMember.representativeFirstName,
      representativeLastName: corporateMember.representativeLastName,
      representativeBirth: corporateMember.representativeBirth,
    };

    formData.append('corporateMember', JSON.stringify(corporateMemberData));

    // 필수 파일들 추가
    formData.append('businessRegistration', corporateMember.businessRegistration);
    formData.append('corporateRepresentative', corporateMember.corporateRepresentative);
    formData.append('billPaymentCorporate', corporateMember.billPaymentCorporate);
    formData.append('shareholderRegister', corporateMember.shareholderRegister);
    formData.append(
      'corporateRepresentativePassport',
      corporateMember.corporateRepresentativePassport
    );

    if (corporateMember.additionalCorporateRepresentativePassport) {
      corporateMember.additionalCorporateRepresentativePassport.forEach((file) => {
        formData.append('additionalCorporateRepresentativePassport', file);
      });
    }

    return this.axios.post<CorporateMemberJoinResponse>(
      '/main/v1/members/join/corporate',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
  }
}
