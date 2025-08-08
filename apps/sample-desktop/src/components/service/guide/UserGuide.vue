<template>
  <div class="gap-size-64 px-padding-36 pt-padding-48 grid grid-cols-2">
    <div class="gap-size-24 flex">
      <div>
        <img
          class="h-[80px] w-auto"
          src="@/assets/image/service/guide-service-signup.png"
          alt="signup"
        />
      </div>
      <div class="gap-size-8 flex flex-col">
        <div>
          <span class="text-font-16 font-semibold">서비스 가입 안내</span>
        </div>
        <ul class="gap-size-8 text-font-14 flex list-disc flex-col pl-4">
          <li>MODA의 모든 서비스는 회원가입 후 이용 가능합니다.</li>
          <li>모바일 앱 또는 웹사이트에서 휴대폰 본인인증을 통해 간편하게 가입할 수 있습니다.</li>
          <li>전문투자자 등록을 원할 경우, 추가 서류 제출이 필요합니다.</li>
        </ul>
      </div>
    </div>
    <div class="gap-size-24 flex">
      <div>
        <img class="h-[80px] w-auto" src="@/assets/image/service/guide-account.png" alt="account" />
      </div>
      <div class="gap-size-8 flex flex-col">
        <div>
          <span class="text-font-16 font-semibold">계좌 개설 방법</span>
        </div>
        <ul class="gap-size-8 text-font-14 flex list-disc flex-col pl-4">
          <li>증권계좌 개설은 영업일 기준 최대 1~2일 소요됩니다.</li>
          <li>
            모바일에서 신분증 촬영 후 비대면으로 신청 가능하며, 계좌 개설 완료 후 거래가 가능합니다.
          </li>
          <li>미성년자는 계좌 개설이 불가능합니다.</li>
        </ul>
      </div>
    </div>
    <div class="gap-size-24 flex">
      <div>
        <img
          class="h-[80px] w-auto"
          src="@/assets/image/service/guide-transaction-tax.png"
          alt="transaction"
        />
      </div>
      <div class="gap-size-8 flex flex-col">
        <div>
          <span class="text-font-16 font-semibold">거래 방법 및 수수료 안내</span>
        </div>
        <ul class="gap-size-8 text-font-14 flex list-disc flex-col pl-4">
          <li>홈 화면 > 거래 > 종목 검색 > LONG/SHORT</li>
          <li>거래시간: 국내 09:00~15:30 / 해외(미국) 23:30~06:00 (KST 기준)</li>
          <li>외환, 지수, 상품 별도의 수수료 정책 적용</li>
          <li>최소 수수료 기준이 있으며 자세한 내용은 [수수료 안내]를 참고하세요.</li>
        </ul>
      </div>
    </div>
    <div class="gap-size-24 flex">
      <div>
        <img class="h-[80px] w-auto" src="@/assets/image/service/guide-faq.png" alt="faq" />
      </div>
      <div class="gap-size-8 flex flex-col">
        <div class="gap-size-8 flex items-center">
          <span class="text-font-16 font-semibold">자주 묻는 질문</span>
          <BaseIcon name="external-link" size="md" />
        </div>
        <ul class="gap-size-8 text-font-14 flex list-disc flex-col pl-4">
          <li>
            <span class="font-semibold">Q 계좌 개설은 얼마나 걸리나요?</span><br />
            A 영업일 기준 1~2일 이내 처리됩니다.
          </li>

          <li>
            <span class="font-semibold">Q 비밀번호를 잊었을 때에는 어떻게 하나요?</span><br />
            A 로그인 화면의 [비밀번호 재설정]을 통해 재설정 가능합니다.
          </li>
        </ul>
      </div>
    </div>
    <div class="gap-size-24 flex">
      <div>
        <img
          class="h-[80px] w-auto"
          src="@/assets/image/service/guide-customer-service.png"
          alt="customer-service"
        />
      </div>
      <div class="gap-size-8 flex flex-col">
        <div>
          <span class="text-font-16 font-semibold">고객센터 안내</span>
        </div>
        <ul class="gap-size-8 text-font-14 flex list-disc flex-col pl-4">
          <li>상담시간: 평일 09:00~18:00 (점심 12:00~13:30)</li>
          <li>고객센터: 1588-1588</li>
          <li>
            이메일: <a class="text-blue cursor-pointer underline">support@modasecurities.com</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { BaseIcon } from '@template/ui';
</script>
