import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseButton from '../components/BaseButton.vue';

describe('BaseButton', () => {
  it('should render with default props', () => {
    const wrapper = mount(BaseButton, {
      slots: { default: 'Click me' },
    });

    expect(wrapper.text()).toContain('Click me');
    expect(wrapper.classes()).toContain('base-button');
  });

  it('should render with different variants', () => {
    const wrapper = mount(BaseButton, {
      props: { variant: 'primary' },
      slots: { default: 'Primary Button' },
    });

    expect(wrapper.classes()).toContain('base-button--primary');
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

    expect(wrapper.attributes('disabled')).toBeDefined();
    expect(wrapper.classes()).toContain('base-button--disabled');
  });

  it('should show loading state', () => {
    const wrapper = mount(BaseButton, {
      props: { loading: true },
      slots: { default: 'Loading Button' },
    });

    expect(wrapper.classes()).toContain('base-button--loading');
    expect(wrapper.find('.loading-spinner').exists()).toBe(true);
  });

  it('should apply custom classes', () => {
    const wrapper = mount(BaseButton, {
      props: { class: 'custom-class' },
      slots: { default: 'Custom Button' },
    });

    expect(wrapper.classes()).toContain('custom-class');
  });
});
