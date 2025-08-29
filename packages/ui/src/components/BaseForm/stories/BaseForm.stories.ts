import type { FormData, FormValidationRules } from '../types';
import { BaseInput, BaseCheckbox, BaseButton } from '../..';
import { validationHelpers } from '../validationHelpers';
import type { Meta, StoryObj } from '@storybook/vue3';
import BaseForm from '../BaseForm.vue';
import { ref } from 'vue';

const meta: Meta<typeof BaseForm> = {
  title: 'Components/BaseForm',
  component: BaseForm,
  parameters: {
    docs: {
      description: {
        component: `
재사용 가능한 폼 컴포넌트입니다.

## 주요 기능
- 자동 유효성 검사
- 커스터마이징 가능한 버튼
- 슬롯 기반 유연한 레이아웃
- TypeScript 지원

 ## 사용법
 \`\`\`vue
 <BaseForm
   v-model="formData"
   :validation-rules="validationRules"
   @submit="handleSubmit"
 >
   <template #default="{ formData, errors, validateField, submit, isValid, isSubmitting }">
     <BaseInput 
       v-model="formData.email" 
       @blur="validateField('email')"
     />
     <p v-if="errors.email">{{ errors.email }}</p>
     
     <BaseButton @click="submit" :disabled="!isValid || isSubmitting">
       제출
     </BaseButton>
   </template>
 </BaseForm>
 \`\`\`
        `,
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    validateOnBlur: {
      control: 'boolean',
    },
    validateOnInput: {
      control: 'boolean',
    },
    validateOnMount: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 폼 스토리
export const Default: Story = {
  render: (args) => ({
    components: { BaseForm, BaseInput, BaseButton },
    setup() {
      const formData = ref<FormData>({
        name: '',
        email: '',
      });

      const validationRules: FormValidationRules = {
        name: validationHelpers.required('이름을 입력해주세요.'),
        email: validationHelpers.combine(
          validationHelpers.required('이메일을 입력해주세요.'),
          validationHelpers.email()
        ),
      };

      const handleSubmit = (data: FormData) => {
        console.log('Form submitted:', data);
        alert(`폼 제출됨: ${JSON.stringify(data, null, 2)}`);
      };

      return {
        args,
        formData,
        validationRules,
        handleSubmit,
      };
    },
    template: `
      <BaseForm
        v-model="formData"
        :validation-rules="validationRules"
        v-bind="args"
        @submit="handleSubmit"
      >
        <template #default="{ formData, errors, validateField, submit, isValid, isSubmitting, reset }">
          <div style="display: flex; flex-direction: column; gap: 1rem;">
            <div>
              <BaseInput
                v-model="formData.name"
                label="이름"
                placeholder="이름을 입력하세요"
                @blur="validateField('name')"
              />
              <p v-if="errors.name" style="color: red; font-size: 0.875rem; margin: 0.25rem 0 0 0;">
                {{ errors.name }}
              </p>
            </div>
            
            <div>
              <BaseInput
                v-model="formData.email"
                label="이메일"
                type="email"
                placeholder="이메일을 입력하세요"
                @blur="validateField('email')"
              />
              <p v-if="errors.email" style="color: red; font-size: 0.875rem; margin: 0.25rem 0 0 0;">
                {{ errors.email }}
              </p>
            </div>
            
            <div style="display: flex; gap: 0.75rem; justify-content: flex-end; margin-top: 1rem;">
              <BaseButton
                variant="outlined"
                @click="reset"
                :disabled="isSubmitting"
              >
                초기화
              </BaseButton>
              <BaseButton
                @click="submit"
                :disabled="!isValid || isSubmitting"
                :loading="isSubmitting"
              >
                제출하기
              </BaseButton>
            </div>
          </div>
        </template>
      </BaseForm>
    `,
  }),
  args: {
    validateOnBlur: true,
  },
};

// 회원가입 폼 스토리
export const SignUpForm: Story = {
  render: (args) => ({
    components: { BaseForm, BaseInput, BaseCheckbox, BaseButton },
    setup() {
      const formData = ref<FormData>({
        email: '',
        password: '',
        confirmPassword: '',
        terms: false,
        marketing: false,
      });

      const validationRules: FormValidationRules = {
        email: validationHelpers.combine(
          validationHelpers.required('이메일을 입력해주세요.'),
          validationHelpers.email()
        ),
        password: validationHelpers.combine(
          validationHelpers.required('비밀번호를 입력해주세요.'),
          validationHelpers.passwordStrength()
        ),
        confirmPassword: validationHelpers.combine(
          validationHelpers.required('비밀번호 확인을 입력해주세요.'),
          validationHelpers.confirm('password')
        ),
        terms: validationHelpers.required('서비스 이용약관에 동의해주세요.'),
      };

      const handleSubmit = (data: FormData) => {
        console.log('Sign up data:', data);
        alert('회원가입이 완료되었습니다!');
      };

      return {
        args,
        formData,
        validationRules,
        handleSubmit,
      };
    },
    template: `
      <BaseForm
        v-model="formData"
        :validation-rules="validationRules"
        v-bind="args"
        @submit="handleSubmit"
      >
        <template #default="{ formData, errors, validateField, submit, isValid, isSubmitting }">
          <div style="display: flex; flex-direction: column; gap: 1.5rem; max-width: 400px;">
            <h2 style="margin: 0; text-align: center;">회원가입</h2>
            
            <div>
              <BaseInput
                v-model="formData.email"
                label="이메일"
                type="email"
                placeholder="이메일을 입력하세요"
                @blur="validateField('email')"
              />
              <p v-if="errors.email" style="color: red; font-size: 0.875rem; margin: 0.25rem 0 0 0;">
                {{ errors.email }}
              </p>
            </div>
            
            <div>
              <BaseInput
                v-model="formData.password"
                label="비밀번호"
                type="password"
                placeholder="비밀번호를 입력하세요"
                @blur="validateField('password')"
              />
              <p v-if="errors.password" style="color: red; font-size: 0.875rem; margin: 0.25rem 0 0 0;">
                {{ errors.password }}
              </p>
            </div>
            
            <div>
              <BaseInput
                v-model="formData.confirmPassword"
                label="비밀번호 확인"
                type="password"
                placeholder="비밀번호를 다시 입력하세요"
                @blur="validateField('confirmPassword')"
              />
              <p v-if="errors.confirmPassword" style="color: red; font-size: 0.875rem; margin: 0.25rem 0 0 0;">
                {{ errors.confirmPassword }}
              </p>
            </div>
            
            <div style="border-top: 1px solid #e0e0e0; padding-top: 1rem;">
              <div style="margin-bottom: 0.5rem;">
                <BaseCheckbox
                  v-model="formData.terms"
                  @change="validateField('terms')"
                >
                  서비스 이용약관에 동의합니다. (필수)
                </BaseCheckbox>
                <p v-if="errors.terms" style="color: red; font-size: 0.875rem; margin: 0.25rem 0 0 0;">
                  {{ errors.terms }}
                </p>
              </div>
              
              <BaseCheckbox v-model="formData.marketing">
                마케팅 정보 수신에 동의합니다. (선택)
              </BaseCheckbox>
            </div>
            
            <BaseButton
              @click="submit"
              :disabled="!isValid || isSubmitting"
              :loading="isSubmitting"
              full-width
            >
              회원가입
            </BaseButton>
          </div>
        </template>
      </BaseForm>
    `,
  }),
};

// 커스텀 액션 버튼 스토리
export const CustomActions: Story = {
  render: (args) => ({
    components: { BaseForm, BaseInput, BaseButton },
    setup() {
      const formData = ref<FormData>({
        message: '',
      });

      const validationRules: FormValidationRules = {
        message: validationHelpers.combine(
          validationHelpers.required('메시지를 입력해주세요.'),
          validationHelpers.maxLength(100, '메시지는 100자 이하로 입력해주세요.')
        ),
      };

      const handleSubmit = (data: FormData) => {
        console.log('Message:', data.message);
        alert(`메시지 전송: ${data.message}`);
      };

      const handleDraft = () => {
        alert('임시저장 되었습니다.');
      };

      return {
        args,
        formData,
        validationRules,
        handleSubmit,
        handleDraft,
      };
    },
    template: `
      <BaseForm
        v-model="formData"
        :validation-rules="validationRules"
        v-bind="args"
        @submit="handleSubmit"
      >
        <template #default="{ formData, errors, validateField, submit, isValid, isSubmitting }">
          <div>
            <BaseInput
              v-model="formData.message"
              label="메시지"
              type="textarea"
              placeholder="메시지를 입력하세요"
              @blur="validateField('message')"
            />
            <p v-if="errors.message" style="color: red; font-size: 0.875rem; margin: 0.25rem 0 0 0;">
              {{ errors.message }}
            </p>
            
            <div style="display: flex; gap: 0.75rem; justify-content: flex-end; margin-top: 1rem;">
              <BaseButton
                variant="outlined"
                @click="handleDraft"
                :disabled="isSubmitting"
              >
                임시저장
              </BaseButton>
              <BaseButton
                @click="submit"
                :disabled="!isValid || isSubmitting"
                :loading="isSubmitting"
              >
                전송
              </BaseButton>
            </div>
          </div>
        </template>
      </BaseForm>
    `,
  }),
};

// 비활성화된 폼 스토리
export const Disabled: Story = {
  render: (args) => ({
    components: { BaseForm, BaseInput, BaseButton },
    setup() {
      const formData = ref<FormData>({
        name: '홍길동',
        email: 'hong@example.com',
      });

      return {
        args,
        formData,
      };
    },
    template: `
      <BaseForm
        v-model="formData"
        disabled
        v-bind="args"
      >
        <template #default="{ formData, submit, isValid, isSubmitting }">
          <div style="display: flex; flex-direction: column; gap: 1rem;">
            <BaseInput
              v-model="formData.name"
              label="이름"
              disabled
            />
            <BaseInput
              v-model="formData.email"
              label="이메일"
              disabled
            />
            
            <BaseButton
              @click="submit"
              :disabled="!isValid || isSubmitting"
              full-width
            >
              수정 불가
            </BaseButton>
          </div>
        </template>
      </BaseForm>
    `,
  }),
};
