<template>
  <div class="gap-size-16 flex flex-col">
    <FormField label="이름(한글)">
      <BaseInput size="md" disabled v />
    </FormField>
    <FormField label="휴대폰번호">
      <BaseInput size="md" disabled />
    </FormField>
    <FormField label="생년월일">
      <BaseInput size="md" disabled />
    </FormField>
    <div class="gap-size-8 flex items-center">
      <FormField label="이름(영문)">
        <BaseInput size="md" placeholder="예) GILDONG" v-model="state.firstNameEn" />
      </FormField>
      <FormField label="성(영문)">
        <BaseInput size="md" placeholder="예) HONG" v-model="state.lastNameEn" />
      </FormField>
    </div>
    <FormField label="거주지 주소(한글)">
      <div class="gap-size-8 flex flex-col">
        <!-- [TODO] : type=search , @onSearch emit 받는거로 리팩토링 예정 -->
        <BaseInput
          size="md"
          placeholder="주소 검색"
          v-model="state.address"
          variant="search"
          @onSearch="openDaumPostcode('korean')"
          @click="openDaumPostcode('korean')"
          readonly
        />

        <BaseInput size="md" placeholder="상세주소" v-model="state.detailAddress" />
      </div>
    </FormField>
    <FormField label="거주지 주소(영문)">
      <div class="gap-size-8 flex flex-col">
        <!-- [TODO]: type=search , @onSearch emit 받는거로 리팩토링 예정 -->
        <BaseInput
          size="md"
          placeholder="주소 검색"
          v-model="state.addressEn"
          @click="openDaumPostcode('english')"
          variant="search"
          disabled
        />
        <BaseInput size="md" placeholder="상세주소" v-model="state.detailAddressEn" />
      </div>
    </FormField>
  </div>
  <div class="mt-[33px] w-[360px]">
    <BaseButton
      size="lg"
      label="다음"
      variant="contained"
      color="primary"
      full-width
      @click="handleSubmit"
    />
  </div>
</template>
<script lang="ts" setup>
import FormField from '@/components/auth/common/FormField.vue';
import { useSignupStore } from '@/stores/useSignupStore';
import { BaseButton, BaseInput } from '@template/ui';
import { reactive, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

// 다음 우편번호 API 타입 정의
declare global {
  interface Window {
    daum: {
      Postcode: new (options: {
        oncomplete: (data: any) => void;
        onclose: () => void;
        width: string;
        height: string;
      }) => {
        embed: (element: HTMLElement | null) => void;
        open: () => void;
      };
    };
  }
}

const signupStore = useSignupStore();
const router = useRouter();

// 주소 검색 관련 상태
const currentAddressType = ref<'korean' | 'english'>('korean');

const state = reactive({
  lastNameEn: '',
  firstNameEn: '',
  address: '',
  detailAddress: '',
  addressEn: '',
  detailAddressEn: '',
  postNo: '',
  postNoEn: '',
});

// 다음 우편번호 API 스크립트 로드
onMounted(() => {
  const script = document.createElement('script');
  script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
  document.head.appendChild(script);
});

// 주소 검색 열기 (새 창 방식)
const openDaumPostcode = (type: 'korean' | 'english') => {
  if (!window.daum?.Postcode) return;

  currentAddressType.value = type;

  new window.daum.Postcode({
    oncomplete: (data: any) => {
      state.address = data.address;
      state.addressEn = data.addressEnglish;
      state.postNo = data.zonecode;
    },
    onclose: () => {
      // 새 창이 닫힐 때의 처리 (필요시)
    },
    width: '100%',
    height: '100%',
  }).open();
};

const handleSubmit = () => {
  signupStore.updateIndividual({
    lastNameEn: state.lastNameEn,
    firstNameEn: state.firstNameEn,
    address: state.address,
    detailAddress: state.detailAddress,
    addressEn: state.addressEn,
    detailAddressEn: state.detailAddressEn,
    idCard: null,
    additionalIdDocument: null,
  });
  router.push({ query: { step: 6 } });
};
</script>
