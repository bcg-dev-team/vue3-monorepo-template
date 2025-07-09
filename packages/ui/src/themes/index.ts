import { GlobalThemeOverrides } from 'naive-ui';
import {
  baseColorsPrimaryPrimary800 as lightPrimary800,
  baseColorsNeutralNeutral800 as lightNeutral800,
} from '../styles/_tokens-light';
import {
  baseColorsPrimaryPrimary800 as darkPrimary800,
  baseColorsNeutralNeutral800 as darkNeutral800,
} from '../styles/_tokens-dark';
import { createNaiveTheme } from './naive-theme';

/**
 * 디자인 토큰을 기반으로 한 Naive UI 테마 오버라이드
 * Light 모드용 테마
 */
export const lightThemeOverrides: GlobalThemeOverrides = {
  common: {
    // Primary 색상
    primaryColor: lightPrimary800,
    primaryColorHover: '#ffd91d',
    primaryColorPressed: '#ffaa00',
    primaryColorSuppl: '#ffe357',

    // Neutral 색상
    baseColor: '#ffffff',

    // Text 색상
    textColorBase: lightNeutral800,
    textColor1: '#131313',
    textColor2: '#333740',
    textColor3: '#5a5c5e',
    textColorDisabled: '#8f9299',

    // Border 색상
    borderColor: '#dadbdd',

    // Background 색상
    bodyColor: '#ffffff',
    cardColor: '#ffffff',
    modalColor: '#ffffff',
    popoverColor: '#ffffff',
    dividerColor: '#dadbdd',
  },

  Button: {
    // Primary 버튼
    colorPrimary: lightPrimary800,
    colorPrimaryHover: '#ffd91d',
    colorPrimaryPressed: '#ffaa00',
    textColorPrimary: '#131313',
    borderPrimary: lightPrimary800,

    // Default 버튼
    color: '#ffffff',
    colorHover: '#f5f6f6',
    colorPressed: '#ecedee',
    textColor: '#131313',
    border: '#dadbdd',
  },

  Input: {
    color: '#ffffff',
    colorFocus: '#ffffff',
    border: '#dadbdd',
    textColor: '#131313',
    placeholderColor: '#8f9299',
  },

  Card: {
    color: '#ffffff',
    colorModal: '#ffffff',
    textColor: '#131313',
  },

  Dialog: {
    color: '#ffffff',
    textColor: '#131313',
  },

  Drawer: {
    color: '#ffffff',
    textColor: '#131313',
  },

  Modal: {
    color: '#ffffff',
    textColor: '#131313',
  },

  Popover: {
    color: '#ffffff',
    textColor: '#131313',
  },

  Tooltip: {
    color: '#333740',
    textColor: '#ffffff',
  },

  Notification: {
    color: '#ffffff',
    textColor: '#131313',
  },

  Message: {
    color: '#ffffff',
    textColor: '#131313',
  },

  LoadingBar: {
    colorLoading: lightPrimary800,
  },

  Progress: {
    color: lightPrimary800,
    railColor: '#ecedee',
  },

  Tag: {
    color: lightPrimary800,
    textColor: '#131313',
  },

  Switch: {
    color: lightPrimary800,
    colorChecked: lightPrimary800,
  },

  Checkbox: {
    color: lightPrimary800,
    colorChecked: lightPrimary800,
  },

  Radio: {
    color: lightPrimary800,
    colorChecked: lightPrimary800,
  },

  Slider: {
    color: lightPrimary800,
    railColor: '#ecedee',
  },

  Menu: {
    color: '#ffffff',
    textColor: '#131313',
    textColorHover: lightPrimary800,
    textColorActive: lightPrimary800,
  },

  Tabs: {
    tabTextColor: '#5a5c5e',
    tabTextColorHover: '#131313',
    tabTextColorActive: lightPrimary800,
    barColor: lightPrimary800,
  },

  Table: {
    color: '#ffffff',
    textColor: '#131313',
    thColor: '#f5f6f6',
    thTextColor: '#131313',
    tdColor: '#ffffff',
    tdTextColor: '#131313',
    borderColor: '#dadbdd',
  },
};

/**
 * Dark 모드용 테마 (기본값에서 색상만 반전)
 */
export const darkThemeOverrides: GlobalThemeOverrides = {
  common: {
    // Primary 색상 (동일)
    primaryColor: darkPrimary800,
    primaryColorHover: '#ffd91d',
    primaryColorPressed: '#ffaa00',
    primaryColorSuppl: '#ffe357',

    // Neutral 색상 (반전)
    baseColor: '#131313',

    // Text 색상 (반전)
    textColorBase: '#ffffff',
    textColor1: '#ffffff',
    textColor2: '#ecedee',
    textColor3: '#b4b6bb',
    textColorDisabled: '#8f9299',

    // Border 색상 (반전)
    borderColor: '#333740',

    // Background 색상 (반전)
    bodyColor: '#131313',
    cardColor: '#1a1a1a',
    modalColor: '#1a1a1a',
    popoverColor: '#1a1a1a',
    dividerColor: '#333740',
  },

  Button: {
    // Primary 버튼 (동일)
    colorPrimary: darkPrimary800,
    colorPrimaryHover: '#ffd91d',
    colorPrimaryPressed: '#ffaa00',
    textColorPrimary: '#131313',
    borderPrimary: darkPrimary800,

    // Default 버튼 (반전)
    color: '#1a1a1a',
    colorHover: '#242424',
    colorPressed: '#333740',
    textColor: '#ffffff',
    border: '#333740',
  },

  Input: {
    color: '#1a1a1a',
    colorFocus: '#1a1a1a',
    border: '#333740',
    textColor: '#ffffff',
    placeholderColor: '#8f9299',
  },

  Card: {
    color: '#1a1a1a',
    colorModal: '#1a1a1a',
    textColor: '#ffffff',
  },

  Dialog: {
    color: '#1a1a1a',
    textColor: '#ffffff',
  },

  Drawer: {
    color: '#1a1a1a',
    textColor: '#ffffff',
  },

  Modal: {
    color: '#1a1a1a',
    textColor: '#ffffff',
  },

  Popover: {
    color: '#1a1a1a',
    textColor: '#ffffff',
  },

  Tooltip: {
    color: '#333740',
    textColor: '#ffffff',
  },

  Notification: {
    color: '#1a1a1a',
    textColor: '#ffffff',
  },

  Message: {
    color: '#1a1a1a',
    textColor: '#ffffff',
  },

  LoadingBar: {
    colorLoading: darkPrimary800,
  },

  Progress: {
    color: darkPrimary800,
    railColor: '#333740',
  },

  Tag: {
    color: darkPrimary800,
    textColor: '#131313',
  },

  Switch: {
    color: darkPrimary800,
    colorChecked: darkPrimary800,
  },

  Checkbox: {
    color: darkPrimary800,
    colorChecked: darkPrimary800,
  },

  Radio: {
    color: darkPrimary800,
    colorChecked: darkPrimary800,
  },

  Slider: {
    color: darkPrimary800,
    railColor: '#333740',
  },

  Menu: {
    color: '#1a1a1a',
    textColor: '#ffffff',
    textColorHover: darkPrimary800,
    textColorActive: darkPrimary800,
  },

  Tabs: {
    tabTextColor: '#b4b6bb',
    tabTextColorHover: '#ffffff',
    tabTextColorActive: darkPrimary800,
    barColor: darkPrimary800,
  },

  Table: {
    color: '#1a1a1a',
    textColor: '#ffffff',
    thColor: '#242424',
    thTextColor: '#ffffff',
    tdColor: '#1a1a1a',
    tdTextColor: '#ffffff',
    borderColor: '#333740',
  },
};

/**
 * 디자인 토큰 기반 Naive UI 테마 생성 함수
 * 기존 디자인 토큰을 활용하여 동적으로 테마를 생성합니다.
 */
export { createNaiveTheme };
