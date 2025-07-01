// UI 관련 타입 정의
export type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonType = 'button' | 'submit' | 'reset';

export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  type?: ButtonType;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  icon?: string;
  iconPosition?: 'left' | 'right';
}

export type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
export type InputSize = 'small' | 'medium' | 'large';

export interface InputProps {
  type?: InputType;
  size?: InputSize;
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  autocomplete?: string;
}

export type AlertVariant = 'success' | 'info' | 'warning' | 'error';
export type AlertSize = 'small' | 'medium' | 'large';

export interface AlertProps {
  variant?: AlertVariant;
  size?: AlertSize;
  dismissible?: boolean;
  autoDismiss?: boolean;
  dismissDelay?: number;
}

export type ModalSize = 'small' | 'medium' | 'large' | 'fullscreen';

export interface ModalProps {
  size?: ModalSize;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  showCloseButton?: boolean;
  persistent?: boolean;
}

export interface TableColumn<T = unknown> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  width?: string | number;
  align?: 'left' | 'center' | 'right';

  render?: (_value: unknown, _row: T) => string | unknown;
}

export interface TableProps<T = unknown> {
  columns: TableColumn<T>[];
  data: T[];
  loading?: boolean;
  sortable?: boolean;
  selectable?: boolean;
  pagination?: boolean;
  pageSize?: number;
  pageSizes?: number[];
}

export type Theme = 'light' | 'dark' | 'auto';
export type ColorScheme = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';

export interface ThemeConfig {
  theme: Theme;
  primaryColor: string;
  borderRadius: number;
  fontSize: number;
  spacing: number;
}
