<template>
  <div class="form-view">
    <h1>폼 검증 예시</h1>

    <div class="form-container">
      <h2>로그인 폼</h2>
      <Form :validation-schema="loginValidationSchema" class="form" @submit="handleLoginSubmit">
        <BaseInput
          name="email"
          label="이메일"
          type="email"
          placeholder="이메일을 입력하세요"
          required
        />
        <BaseInput
          name="password"
          label="비밀번호"
          type="password"
          placeholder="비밀번호를 입력하세요"
          required
        />
        <BaseButton type="submit" :loading="loading"> 로그인 </BaseButton>
      </Form>
    </div>

    <div class="form-container">
      <h2>회원가입 폼</h2>
      <Form
        :validation-schema="registerValidationSchema"
        class="form"
        @submit="handleRegisterSubmit"
      >
        <BaseInput
          name="email"
          label="이메일"
          type="email"
          placeholder="이메일을 입력하세요"
          required
        />
        <BaseInput
          name="password"
          label="비밀번호"
          type="password"
          placeholder="비밀번호를 입력하세요"
          required
        />
        <BaseInput
          name="confirmPassword"
          label="비밀번호 확인"
          type="password"
          placeholder="비밀번호를 다시 입력하세요"
          required
        />
        <BaseInput name="firstName" label="이름" placeholder="이름을 입력하세요" required />
        <BaseInput name="lastName" label="성" placeholder="성을 입력하세요" required />
        <BaseButton type="submit" :loading="loading"> 회원가입 </BaseButton>
      </Form>
    </div>

    <div class="form-container">
      <h2>사용자 프로필 폼</h2>
      <Form
        :validation-schema="userProfileValidationSchema"
        class="form"
        @submit="handleProfileSubmit"
      >
        <BaseInput name="firstName" label="이름" placeholder="이름을 입력하세요" required />
        <BaseInput name="lastName" label="성" placeholder="성을 입력하세요" required />
        <BaseInput
          name="email"
          label="이메일"
          type="email"
          placeholder="이메일을 입력하세요"
          required
        />
        <BaseInput
          name="phone"
          label="전화번호"
          type="tel"
          placeholder="전화번호를 입력하세요 (예: 010-1234-5678)"
        />
        <div class="form-group">
          <label class="form-label">자기소개</label>
          <textarea
            v-model="profileForm.bio"
            placeholder="자기소개를 입력하세요 (최대 500자)"
            maxlength="500"
            class="form-textarea"
          />
          <span class="char-count">{{ profileForm.bio?.length || 0 }}/500</span>
        </div>
        <BaseButton type="submit" :loading="loading"> 프로필 저장 </BaseButton>
      </Form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Form } from 'vee-validate';
import { BaseButton, BaseInput } from '@template/ui';
import {
  loginValidationSchema,
  registerValidationSchema,
  userProfileValidationSchema,
} from '@template/utils';

const loading = ref(false);

const profileForm = ref({
  bio: '',
});

const handleLoginSubmit = async (values: any) => {
  loading.value = true;
  try {
    console.log('로그인 데이터:', values);
    // 실제 로그인 로직 구현
    await new Promise((resolve) => setTimeout(resolve, 1000));
    alert('로그인 성공!');
  } catch (error) {
    console.error('로그인 실패:', error);
    alert('로그인에 실패했습니다.');
  } finally {
    loading.value = false;
  }
};

const handleRegisterSubmit = async (values: any) => {
  loading.value = true;
  try {
    console.log('회원가입 데이터:', values);
    // 실제 회원가입 로직 구현
    await new Promise((resolve) => setTimeout(resolve, 1000));
    alert('회원가입 성공!');
  } catch (error) {
    console.error('회원가입 실패:', error);
    alert('회원가입에 실패했습니다.');
  } finally {
    loading.value = false;
  }
};

const handleProfileSubmit = async (values: any) => {
  loading.value = true;
  try {
    const profileData = { ...values, bio: profileForm.value.bio };
    console.log('프로필 데이터:', profileData);
    // 실제 프로필 저장 로직 구현
    await new Promise((resolve) => setTimeout(resolve, 1000));
    alert('프로필 저장 성공!');
  } catch (error) {
    console.error('프로필 저장 실패:', error);
    alert('프로필 저장에 실패했습니다.');
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.form-view {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.form-view h1 {
  text-align: center;
  margin-bottom: 2rem;
  color: #1f2937;
}

.form-container {
  background: white;
  border-radius: 0.5rem;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
}

.form-container h2 {
  margin-bottom: 1.5rem;
  color: #374151;
  font-size: 1.25rem;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
}

.form-textarea {
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  resize: vertical;
  min-height: 100px;
  font-family: inherit;
}

.form-textarea:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.char-count {
  font-size: 0.75rem;
  color: #6b7280;
  text-align: right;
}
</style>
