import type { GlobalThemeOverrides } from 'naive-ui';
import { getToken } from '../utils/tokens';

/**
 * Naive UI 테마 설정
 * 기존 디자인 토큰을 기반으로 구성
 */
export const createNaiveTheme = (): GlobalThemeOverrides => {
  return {
    common: {
      // 기본 색상
      primaryColor: getToken('Base-Colors.Primary.primary800'),
      primaryColorHover: getToken('Base-Colors.Primary.primary700'),
      primaryColorPressed: getToken('Base-Colors.Primary.primary-deep'),
      primaryColorSuppl: getToken('Base-Colors.Primary.primary100'),

      // 텍스트 색상
      textColorBase: getToken('Font.Color.Default'),
      textColor1: getToken('Font.Color.Default'),
      textColor2: getToken('Font.Color.Default-muted'),
      textColor3: getToken('Font.Color.Default-muted-dark'),
      textColorDisabled: getToken('Input.Color.text-disable'),

      // 배경 색상
      bodyColor: getToken('Background.bg-default'),
      cardColor: getToken('Background.bg-default'),
      modalColor: getToken('Background.bg-default'),
      popoverColor: getToken('Background.bg-default'),

      // 테두리 색상
      borderColor: getToken('Background.bg-outline'),

      // 그림자
      boxShadow1: getToken('ShadowSm'),
      boxShadow2: getToken('ShadowBase'),
      boxShadow3: getToken('ShadowMd'),

      // 반지름
      borderRadius: getToken('Radius.default'),

      // 간격
      fontSize: getToken('Font.Size.font-16'),
      fontSizeSmall: getToken('Font.Size.font-14'),
      fontSizeMedium: getToken('Font.Size.font-16'),
      fontSizeLarge: getToken('Font.Size.font-18'),
      fontSizeHuge: getToken('Font.Size.font-20'),

      // 폰트
      fontFamily: getToken('TypographyFontFamilySans'),
      fontFamilyMono: getToken('TypographyFontFamilyMono'),

      // 높이
      heightTiny: getToken('Base-Size.size-24'),
      heightSmall: getToken('Base-Size.size-32'),
      heightMedium: getToken('Base-Size.size-40'),
      heightLarge: getToken('Base-Size.size-48'),
      heightHuge: getToken('Base-Size.size-56'),
    },

    Button: {
      // 버튼 색상
      colorPrimary: getToken('Button.Primary.background'),
      colorPrimaryHover: getToken('Base-Colors.Primary.primary700'),
      colorPrimaryPressed: getToken('Base-Colors.Primary.primary-deep'),
      colorPrimarySuppl: getToken('Button.Primary.background'),

      // 아웃라인 버튼
      colorOutline: getToken('Button.Outline.background'),
      colorOutlineHover: getToken('Button.Outline.background'),
      colorOutlinePressed: getToken('Button.Outline.background'),
      colorOutlineSuppl: getToken('Button.Outline.background'),

      // 텍스트 색상
      textColorPrimary: getToken('Button.Primary.text'),
      textColorOutline: getToken('Button.Outline.text'),
      textColorDisabled: getToken('Button.Disabled.text'),

      // 테두리
      borderPrimary: getToken('Button.Primary.border'),
      borderOutline: getToken('Button.Outline.border'),
      borderDisabled: getToken('Button.Disabled.border'),

      // 높이
      heightTiny: getToken('Base-Size.size-24'),
      heightSmall: getToken('Base-Size.size-32'),
      heightMedium: getToken('Base-Size.size-40'),
      heightLarge: getToken('Base-Size.size-48'),
      heightHuge: getToken('Base-Size.size-56'),

      // 패딩
      paddingTiny: `${getToken('Padding.Padding-4')} ${getToken('Padding.Padding-8')}`,
      paddingSmall: `${getToken('Padding.Padding-8')} ${getToken('Padding.Padding-12')}`,
      paddingMedium: `${getToken('Padding.Padding-12')} ${getToken('Padding.Padding-16')}`,
      paddingLarge: `${getToken('Padding.Padding-16')} ${getToken('Padding.Padding-24')}`,
      paddingHuge: `${getToken('Padding.Padding-20')} ${getToken('Padding.Padding-32')}`,

      // 폰트 크기
      fontSizeTiny: getToken('Font.Size.font-12'),
      fontSizeSmall: getToken('Font.Size.font-14'),
      fontSizeMedium: getToken('Font.Size.font-16'),
      fontSizeLarge: getToken('Font.Size.font-18'),
      fontSizeHuge: getToken('Font.Size.font-20'),

      // 반지름
      borderRadiusTiny: getToken('Radius.sm'),
      borderRadiusSmall: getToken('Radius.sm'),
      borderRadiusMedium: getToken('Radius.default'),
      borderRadiusLarge: getToken('Radius.md'),
      borderRadiusHuge: getToken('Radius.lg'),
    },

    Input: {
      // 색상
      color: getToken('Input.Color.surface'),
      colorFocus: getToken('Input.Color.surface'),
      colorDisabled: getToken('Input.Color.bg-disabled'),

      // 테두리
      border: getToken('Input.Color.border-static'),
      borderHover: getToken('Input.Color.border-static'),
      borderFocus: getToken('Input.Color.border-focus'),
      borderDisabled: getToken('Input.Color.border-disabled'),
      borderError: getToken('Input.Color.border-error'),

      // 텍스트
      textColor: getToken('Input.Color.text-static'),
      textColorDisabled: getToken('Input.Color.text-disable'),
      placeholderColor: getToken('Input.Color.text-placeholder'),

      // 높이
      heightTiny: getToken('Base-Size.size-24'),
      heightSmall: getToken('Base-Size.size-32'),
      heightMedium: getToken('Base-Size.size-40'),
      heightLarge: getToken('Base-Size.size-48'),
      heightHuge: getToken('Base-Size.size-56'),

      // 패딩
      paddingTiny: getToken('Padding.Padding-4'),
      paddingSmall: getToken('Padding.Padding-8'),
      paddingMedium: getToken('Padding.Padding-12'),
      paddingLarge: getToken('Padding.Padding-16'),
      paddingHuge: getToken('Padding.Padding-20'),

      // 폰트 크기
      fontSizeTiny: getToken('Font.Size.font-12'),
      fontSizeSmall: getToken('Font.Size.font-14'),
      fontSizeMedium: getToken('Font.Size.font-16'),
      fontSizeLarge: getToken('Font.Size.font-18'),
      fontSizeHuge: getToken('Font.Size.font-20'),

      // 반지름
      borderRadiusTiny: getToken('Radius.sm'),
      borderRadiusSmall: getToken('Radius.sm'),
      borderRadiusMedium: getToken('Radius.default'),
      borderRadiusLarge: getToken('Radius.md'),
      borderRadiusHuge: getToken('Radius.lg'),
    },

    Card: {
      // 색상
      color: getToken('Background.bg-default'),
      colorModal: getToken('Background.bg-default'),
      colorTarget: getToken('Background.bg-default'),

      // 테두리
      borderColor: getToken('Background.bg-outline'),
      borderColorModal: getToken('Background.bg-outline'),
      borderColorTarget: getToken('Background.bg-outline'),

      // 그림자
      boxShadow: getToken('ShadowBase'),
      boxShadowModal: getToken('ShadowLg'),
      boxShadowTarget: getToken('ShadowMd'),

      // 반지름
      borderRadius: getToken('Radius.default'),
      borderRadiusModal: getToken('Radius.md'),
      borderRadiusTarget: getToken('Radius.sm'),

      // 패딩
      paddingSmall: getToken('Padding.Padding-12'),
      paddingMedium: getToken('Padding.Padding-16'),
      paddingLarge: getToken('Padding.Padding-24'),
      paddingHuge: getToken('Padding.Padding-32'),
    },

    DataTable: {
      // 색상
      color: getToken('Table.Type1.body-bg'),
      colorHover: getToken('Table.Type1.body-bg-select'),
      colorStriped: getToken('Table.Type1.body-bg-row'),

      // 헤더
      thColor: getToken('Table.Type1.Header-bg'),
      thColorHover: getToken('Table.Type1.Header-bg'),
      thTextColor: getToken('Font.Color.Default'),
      thFontWeight: getToken('TypographyFontWeightMedium'),

      // 테두리
      borderColor: getToken('Table.Type1.body-border'),
      thBorderColor: getToken('Table.Type1.Header-underline'),
      tdBorderColor: getToken('Table.Type1.body-border'),

      // 패딩
      thPaddingSmall: getToken('Padding.Padding-8'),
      thPaddingMedium: getToken('Padding.Padding-12'),
      thPaddingLarge: getToken('Padding.Padding-16'),
      tdPaddingSmall: getToken('Padding.Padding-8'),
      tdPaddingMedium: getToken('Padding.Padding-12'),
      tdPaddingLarge: getToken('Padding.Padding-16'),

      // 폰트 크기
      fontSizeSmall: getToken('Font.Size.font-14'),
      fontSizeMedium: getToken('Font.Size.font-16'),
      fontSizeLarge: getToken('Font.Size.font-18'),
    },

    Modal: {
      // 색상
      color: getToken('Popup.background'),
      colorMask: 'rgba(0, 0, 0, 0.45)',

      // 테두리
      borderColor: getToken('Popup.border'),

      // 그림자
      boxShadow: getToken('ShadowXl'),

      // 반지름
      borderRadius: getToken('Radius.md'),

      // 패딩
      paddingSmall: getToken('Padding.Padding-16'),
      paddingMedium: getToken('Padding.Padding-24'),
      paddingLarge: getToken('Padding.Padding-32'),
      paddingHuge: getToken('Padding.Padding-48'),
    },

    Message: {
      // 색상
      color: getToken('Background.bg-default'),
      colorSuccess: getToken('Trade.Correct.background'),
      colorError: getToken('Trade.Long.background'),
      colorWarning: getToken('ColorWarning50'),
      colorInfo: getToken('Base-Colors.Blue.blue050'),

      // 테두리
      borderColor: getToken('Background.bg-outline'),
      borderColorSuccess: getToken('Trade.Correct.border'),
      borderColorError: getToken('Trade.Long.border'),
      borderColorWarning: getToken('ColorWarning200'),
      borderColorInfo: getToken('Base-Colors.Blue.blue200'),

      // 텍스트
      textColor: getToken('Font.Color.Default'),
      textColorSuccess: getToken('Trade.Correct.text'),
      textColorError: getToken('Trade.Long.text'),
      textColorWarning: getToken('ColorWarning800'),
      textColorInfo: getToken('Base-Colors.Blue.blue800'),

      // 그림자
      boxShadow: getToken('ShadowMd'),

      // 반지름
      borderRadius: getToken('Radius.default'),

      // 패딩
      padding: getToken('Padding.Padding-12'),
    },

    Notification: {
      // 색상
      color: getToken('Background.bg-default'),
      colorSuccess: getToken('Trade.Correct.background'),
      colorError: getToken('Trade.Long.background'),
      colorWarning: getToken('ColorWarning50'),
      colorInfo: getToken('Base-Colors.Blue.blue050'),

      // 테두리
      borderColor: getToken('Background.bg-outline'),
      borderColorSuccess: getToken('Trade.Correct.border'),
      borderColorError: getToken('Trade.Long.border'),
      borderColorWarning: getToken('ColorWarning200'),
      borderColorInfo: getToken('Base-Colors.Blue.blue200'),

      // 텍스트
      textColor: getToken('Font.Color.Default'),
      textColorSuccess: getToken('Trade.Correct.text'),
      textColorError: getToken('Trade.Long.text'),
      textColorWarning: getToken('ColorWarning800'),
      textColorInfo: getToken('Base-Colors.Blue.blue800'),

      // 그림자
      boxShadow: getToken('ShadowLg'),

      // 반지름
      borderRadius: getToken('Radius.default'),

      // 패딩
      padding: getToken('Padding.Padding-16'),
    },

    Select: {
      // 색상
      color: getToken('Input.Color.surface'),
      colorFocus: getToken('Input.Color.surface'),
      colorDisabled: getToken('Input.Color.bg-disabled'),

      // 테두리
      border: getToken('Input.Color.border-static'),
      borderHover: getToken('Input.Color.border-static'),
      borderFocus: getToken('Input.Color.border-focus'),
      borderDisabled: getToken('Input.Color.border-disabled'),
      borderError: getToken('Input.Color.border-error'),

      // 텍스트
      textColor: getToken('Input.Color.text-static'),
      textColorDisabled: getToken('Input.Color.text-disable'),
      placeholderColor: getToken('Input.Color.text-placeholder'),

      // 높이
      heightTiny: getToken('Base-Size.size-24'),
      heightSmall: getToken('Base-Size.size-32'),
      heightMedium: getToken('Base-Size.size-40'),
      heightLarge: getToken('Base-Size.size-48'),
      heightHuge: getToken('Base-Size.size-56'),

      // 패딩
      paddingTiny: getToken('Padding.Padding-4'),
      paddingSmall: getToken('Padding.Padding-8'),
      paddingMedium: getToken('Padding.Padding-12'),
      paddingLarge: getToken('Padding.Padding-16'),
      paddingHuge: getToken('Padding.Padding-20'),

      // 폰트 크기
      fontSizeTiny: getToken('Font.Size.font-12'),
      fontSizeSmall: getToken('Font.Size.font-14'),
      fontSizeMedium: getToken('Font.Size.font-16'),
      fontSizeLarge: getToken('Font.Size.font-18'),
      fontSizeHuge: getToken('Font.Size.font-20'),

      // 반지름
      borderRadiusTiny: getToken('Radius.sm'),
      borderRadiusSmall: getToken('Radius.sm'),
      borderRadiusMedium: getToken('Radius.default'),
      borderRadiusLarge: getToken('Radius.md'),
      borderRadiusHuge: getToken('Radius.lg'),
    },

    Switch: {
      // 색상
      color: getToken('Input.Check & Radio.inactive-disable-bg'),
      colorChecked: getToken('Input.Check & Radio.selected-bg'),
      colorDisabled: getToken('Input.Check & Radio.disable-bg'),
      colorDisabledChecked: getToken('Input.Check & Radio.disable-bg'),

      // 테두리
      borderColor: getToken('Input.Check & Radio.active-border'),
      borderColorChecked: getToken('Input.Check & Radio.selected-bg'),
      borderColorDisabled: getToken('Input.Check & Radio.disable-border'),
      borderColorDisabledChecked: getToken('Input.Check & Radio.disable-border'),

      // 크기
      width: getToken('Base-Size.size-44'),
      height: getToken('Base-Size.size-24'),
    },

    Checkbox: {
      // 색상
      color: getToken('Input.Check & Radio.active-bg'),
      colorChecked: getToken('Input.Check & Radio.selected-bg'),
      colorDisabled: getToken('Input.Check & Radio.disable-bg'),
      colorDisabledChecked: getToken('Input.Check & Radio.disable-bg'),

      // 테두리
      borderColor: getToken('Input.Check & Radio.active-border'),
      borderColorChecked: getToken('Input.Check & Radio.selected-bg'),
      borderColorDisabled: getToken('Input.Check & Radio.disable-border'),
      borderColorDisabledChecked: getToken('Input.Check & Radio.disable-border'),

      // 크기
      sizeSmall: getToken('Base-Size.size-16'),
      sizeMedium: getToken('Base-Size.size-18'),
      sizeLarge: getToken('Base-Size.size-20'),
    },

    Radio: {
      // 색상
      color: getToken('Input.Check & Radio.active-bg'),
      colorChecked: getToken('Input.Check & Radio.selected-bg'),
      colorDisabled: getToken('Input.Check & Radio.disable-bg'),
      colorDisabledChecked: getToken('Input.Check & Radio.disable-bg'),

      // 테두리
      borderColor: getToken('Input.Check & Radio.active-border'),
      borderColorChecked: getToken('Input.Check & Radio.selected-bg'),
      borderColorDisabled: getToken('Input.Check & Radio.disable-border'),
      borderColorDisabledChecked: getToken('Input.Check & Radio.disable-border'),

      // 크기
      sizeSmall: getToken('Base-Size.size-16'),
      sizeMedium: getToken('Base-Size.size-18'),
      sizeLarge: getToken('Base-Size.size-20'),
    },
  };
};
