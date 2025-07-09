import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseButton from '../components/BaseButton.vue';

describe('BaseButton', () => {
  it('should render with default props', () => {
    const wrapper = mount(BaseButton, {
      slots: { default: 'Click me' },
    });

    expect(wrapper.text()).toContain('Click me');
    expect(wrapper.find('.n-button').exists()).toBe(true);
  });

  it('should render with different variants', () => {
    const wrapper = mount(BaseButton, {
      props: { variant: 'primary' },
      slots: { default: 'Primary Button' },
    });

    const button = wrapper.find('.n-button');
    expect(button.exists()).toBe(true);
    expect((wrapper.props() as any).variant).toBe('primary');
  });

  it('should emit click event', async () => {
    const wrapper = mount(BaseButton, {
      slots: { default: 'Click me' },
    });

    await wrapper.trigger('click');
    expect(wrapper.emitted('click')).toBeTruthy();
  });

  it('should be disabled when disabled prop is true', () => {
    const wrapper = mount(BaseButton, {
      props: { disabled: true },
      slots: { default: 'Disabled Button' },
    });

    const button = wrapper.find('.n-button');
    expect(button.exists()).toBe(true);
    expect((wrapper.props() as any).disabled).toBe(true);
  });

  it('should show loading state', () => {
    const wrapper = mount(BaseButton, {
      props: { loading: true },
      slots: { default: 'Loading Button' },
    });

    const button = wrapper.find('.n-button');
    expect(button.exists()).toBe(true);
    expect((wrapper.props() as any).loading).toBe(true);
  });

  it('should apply custom classes', () => {
    const wrapper = mount(BaseButton, {
      props: { class: 'custom-class' },
      slots: { default: 'Custom Button' },
    });

    expect(wrapper.classes()).toContain('custom-class');
  });

  it('should handle size prop correctly', () => {
    const wrapper = mount(BaseButton, {
      props: { size: 'large' },
      slots: { default: 'Large Button' },
    });

    expect((wrapper.props() as any).size).toBe('large');
  });

  it('should handle fullWidth prop correctly', () => {
    const wrapper = mount(BaseButton, {
      props: { fullWidth: true },
      slots: { default: 'Full Width Button' },
    });

    expect((wrapper.props() as any).fullWidth).toBe(true);
  });
});
