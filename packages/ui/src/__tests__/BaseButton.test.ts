import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseButton from '../components/BaseButton/BaseButton.vue';

describe('BaseButton', () => {
  it('should render with default props', () => {
    const wrapper = mount(BaseButton, {
      props: { label: 'Click me' },
    });

    expect(wrapper.text()).toContain('Click me');
    expect(wrapper.find('button').exists()).toBe(true);
  });

  it('should render with different variants', () => {
    const wrapper = mount(BaseButton, {
      props: { variant: 'primary', label: 'Primary Button' },
    });

    const button = wrapper.find('button');
    expect(button.exists()).toBe(true);
    expect(wrapper.props('variant')).toBe('primary');
  });

  it('should emit click event', async () => {
    const wrapper = mount(BaseButton, {
      props: { label: 'Click me' },
    });

    await wrapper.trigger('click');
    expect(wrapper.emitted('click')).toBeTruthy();
  });

  it('should be disabled when disabled prop is true', () => {
    const wrapper = mount(BaseButton, {
      props: { disabled: true, label: 'Disabled Button' },
    });

    const button = wrapper.find('button');
    expect(button.exists()).toBe(true);
    expect(wrapper.props('disabled')).toBe(true);
  });

  it('should apply custom classes', () => {
    const wrapper = mount(BaseButton, {
      props: { label: 'Custom Button', class: 'custom-class' },
    });

    expect(wrapper.classes()).toContain('custom-class');
  });

  it('should handle size prop correctly', () => {
    const wrapper = mount(BaseButton, {
      props: { size: 'small', label: 'Small Button' },
    });

    expect(wrapper.props('size')).toBe('small');
  });

  it('should render with left icon', () => {
    const wrapper = mount(BaseButton, {
      props: {
        label: 'Button with Icon',
        leftIcon: { name: 'plus', size: 'sm' },
      },
    });

    expect(wrapper.find('button').exists()).toBe(true);
    expect(wrapper.props('leftIcon')).toEqual({ name: 'plus', size: 'sm' });
  });

  it('should render with sub label', () => {
    const wrapper = mount(BaseButton, {
      props: {
        label: 'Main Label',
        subLabel: 'Sub Label',
      },
    });

    expect(wrapper.text()).toContain('Main Label');
    expect(wrapper.text()).toContain('Sub Label');
  });
});
