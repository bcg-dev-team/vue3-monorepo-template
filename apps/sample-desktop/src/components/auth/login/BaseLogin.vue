<template>
  <form @submit.prevent name="login" class="gap-size-16 mt-4 flex flex-col">
    <div class="bg-bg-bg-innerframe flex h-[46px] items-center justify-center">
      <!-- 실거래, 모의거래 RadioGroup -->
      <!-- [FIXME]: BaseRadioGroup 컴포넌트로 대체될 영역-->
      <RadioGroup v-model="model" class="space-y-2">
        <div :class="containerClasses">
          <RadioGroupOption
            v-for="option in options"
            :key="option.value"
            :value="option.value"
            as="template"
            v-slot="{ checked, active, disabled: optionDisabled }"
          >
            <button
              :class="getRadioOptionClasses(checked, active, optionDisabled)"
              :disabled="optionDisabled"
              type="button"
            >
              <!-- 라디오 버튼 원형 인디케이터 -->
              <div
                :class="[
                  'h-4 w-4 rounded-full border-2 transition-colors duration-200',
                  checked ? 'border-yellow-400 bg-transparent' : 'border-gray-300 bg-transparent',
                ]"
              >
                <!-- 선택된 상태일 때 내부 원 -->
                <div v-if="checked" class="m-0.5 h-2 w-2 rounded-full bg-yellow-400"></div>
              </div>
              <!-- 옵션 라벨 -->
              <span class="text-sm">{{ option.label }}</span>
            </button>
          </RadioGroupOption>
        </div>
      </RadioGroup>
    </div>
    <FormField label="이메일주소(ID)">
      <BaseInput
        size="md"
        placeholder="example@email.com"
        v-model="email"
        autocomplete="username"
      />
    </FormField>
    <FormField label="비밀번호">
      <BaseInput
        size="md"
        variant="password"
        placeholder="영문+숫자, 8~16자리 이상"
        v-model="password"
      />
    </FormField>
    <div class="flex items-center justify-between">
      <div>
        <BaseCheckbox v-model="isChecked">
          <span class="text-font-13">아이디 저장</span>
        </BaseCheckbox>
      </div>
      <div class="gap-size-12 flex items-center">
        <Anchor size="sm" to="find-id">아이디 찾기</Anchor>
        <span class="text-font-12 text-default-muted">|</span>
        <Anchor size="sm" to="reset-password">비밀번호 재설정</Anchor>
      </div>
    </div>
  </form>
  <div class="mt-[33px]">
    <BaseButton
      size="lg"
      label="로그인"
      variant="contained"
      color="primary"
      full-width
      @click="handleLogin"
    />
  </div>
  <div class="mt-6 flex justify-center">
    <Anchor size="sm" to="sign-up">가입하기</Anchor>
  </div>
</template>

<script lang="ts" setup>
import LocalStorageService from '@/service/localStorage/local-storage.service';
import LocalStorageKey from '@/service/localStorage/local-storage-key';
import { BaseInput, BaseButton, BaseCheckbox } from '@template/ui';
import FormField from '@/components/auth/common/FormField.vue';
import { RadioGroup, RadioGroupOption } from '@headlessui/vue';
import Anchor from '@/components/common/Anchor.vue';
import { userService } from '@/service/api';
import { MemberType } from '@template/api';
import { useRouter } from 'vue-router';
import { ref, computed } from 'vue';
const router = useRouter();

interface Props {
  selectedTabKey: MemberType;
}

const email = ref('');
const password = ref('');

const props = defineProps<Props>();

const options = [
  { value: 'live', label: '실거래' },
  { value: 'demo', label: '모의거래' },
];

const containerClasses = computed(() => {
  return `flex gap-x-6 items-center justify-center`;
});

const model = ref('live');

const getRadioOptionClasses = (
  checked: boolean,
  active: boolean = false,
  disabled: boolean = false
): string => {
  const baseClasses = `flex items-center gap-x-2 cursor-pointer transition-colors duration-200`;

  // 비활성화 상태
  if (disabled) {
    return [baseClasses, 'opacity-50 cursor-not-allowed'].join(' ');
  }

  // 기본 상태 (라디오 버튼 스타일)
  return baseClasses;
};

const isChecked = ref<boolean>(false);

const handleLogin = async () => {
  try {
    const response = await userService.webLogin(email.value, password.value);
    if (response.status === 'success') {
      LocalStorageService.setItem(LocalStorageKey.ACCESS_TOKEN, 'Authorized Token');
      router.push({ name: 'home' });
    }
  } catch (error) {
    console.error(error);
  }
};
</script>
