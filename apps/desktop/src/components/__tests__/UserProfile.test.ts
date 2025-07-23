import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { http, HttpResponse } from 'msw';
import { server } from '../../mocks/node';
import UserProfile from '../UserProfile.vue';

/**
 * UserProfile 컴포넌트 테스트
 * MSW를 사용하여 API 응답을 모킹합니다.
 */
describe('UserProfile', () => {
  beforeEach(() => {
    // 각 테스트마다 핸들러 리셋
    server.resetHandlers();
  });

  it('사용자 정보를 성공적으로 불러와서 표시한다', async () => {
    const wrapper = mount(UserProfile, {
      props: {
        userId: '123',
      },
    });

    // 로딩 상태 확인
    expect(wrapper.text()).toContain('사용자 정보를 불러오는 중...');

    // API 응답 대기
    await new Promise((resolve) => setTimeout(resolve, 100));

    // 사용자 정보가 표시되는지 확인
    expect(wrapper.text()).toContain('User Name');
    expect(wrapper.text()).toContain('사용자 ID: 123');
  });

  it('API 오류 시 에러 메시지를 표시한다', async () => {
    // 특정 테스트를 위해 에러 응답으로 오버라이드
    server.use(
      http.get('/api/user/:user_id', () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    const wrapper = mount(UserProfile, {
      props: {
        userId: '456',
      },
    });

    // API 응답 대기
    await new Promise((resolve) => setTimeout(resolve, 100));

    // 에러 메시지가 표시되는지 확인
    expect(wrapper.text()).toContain('HTTP error! status: 500');
  });

  it('사용자별로 다른 데이터를 반환한다', async () => {
    // 특정 사용자를 위한 커스텀 응답
    server.use(
      http.get('/api/user/999', () => {
        return HttpResponse.json({
          user_id: '999',
          user_name: '테스트 사용자',
        });
      })
    );

    const wrapper = mount(UserProfile, {
      props: {
        userId: '999',
      },
    });

    // API 응답 대기
    await new Promise((resolve) => setTimeout(resolve, 100));

    // 커스텀 데이터가 표시되는지 확인
    expect(wrapper.text()).toContain('테스트 사용자');
    expect(wrapper.text()).toContain('사용자 ID: 999');
  });
});
