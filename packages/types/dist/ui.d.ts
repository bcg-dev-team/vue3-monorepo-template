export type ButtonVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonType = 'button' | 'submit' | 'reset';
export type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
export type InputSize = 'sm' | 'md' | 'lg';
export type AlertVariant = 'success' | 'info' | 'warning' | 'error';
export interface ModalProps {
    isOpen: boolean;
    title?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    closeOnOverlayClick?: boolean;
    closeOnEscape?: boolean;
}
export interface TableColumn<T = any> {
    key: string;
    label: string;
    sortable?: boolean;
    width?: string | number;
    align?: 'left' | 'center' | 'right';
    render?: (value: any, row: T) => string | any;
}
export type Theme = 'light' | 'dark' | 'auto';
export type ToastType = 'success' | 'error' | 'warning' | 'info';
export interface ToastProps {
    id: string;
    type: ToastType;
    title: string;
    message?: string;
    duration?: number;
    closable?: boolean;
}
export interface FormField {
    name: string;
    label: string;
    type: InputType;
    required?: boolean;
    placeholder?: string;
    validation?: {
        min?: number;
        max?: number;
        pattern?: string;
        message?: string;
    };
}
export interface DropdownOption {
    label: string;
    value: string | number;
    disabled?: boolean;
    icon?: string;
}
export interface CardProps {
    title?: string;
    subtitle?: string;
    image?: string;
    actions?: any[];
    loading?: boolean;
}
export type LoadingSpinnerSize = 'sm' | 'md' | 'lg';
export type LoadingSpinnerColor = 'primary' | 'secondary' | 'white';
export interface IconProps {
    name: string;
    size?: number;
    color?: string;
    className?: string;
}
//# sourceMappingURL=ui.d.ts.map