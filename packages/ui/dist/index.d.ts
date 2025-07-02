import { App } from 'vue';
import { ComponentOptionsMixin } from 'vue';
import { ComponentProvideOptions } from 'vue';
import { DefineComponent } from 'vue';
import { PublicProps } from 'vue';

declare const __VLS_component: DefineComponent<Props, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {
click: (event: MouseEvent) => any;
}, string, PublicProps, Readonly<Props> & Readonly<{
onClick?: ((event: MouseEvent) => any) | undefined;
}>, {
variant: ButtonVariant;
size: ButtonSize;
type: ButtonType;
disabled: boolean;
loading: boolean;
fullWidth: boolean;
}, {}, {}, {}, string, ComponentProvideOptions, false, {}, HTMLButtonElement>;

declare const __VLS_component_2: DefineComponent<Props_2, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {
submit: (values: Record<string, any>) => any;
error: (errors: Record<string, any>) => any;
}, string, PublicProps, Readonly<Props_2> & Readonly<{
onSubmit?: ((values: Record<string, any>) => any) | undefined;
onError?: ((errors: Record<string, any>) => any) | undefined;
}>, {
onSubmit: (values: Record<string, any>) => void | Promise<void>;
initialValues: Record<string, any>;
validationSchema: any;
}, {}, {}, {}, string, ComponentProvideOptions, false, {}, HTMLFormElement>;

declare function __VLS_template(): {
    attrs: Partial<{}>;
    slots: {
        default?(_: {}): any;
    };
    refs: {};
    rootEl: HTMLButtonElement;
};

declare function __VLS_template_2(): {
    attrs: Partial<{}>;
    slots: {
        default?(_: {}): any;
    };
    refs: {};
    rootEl: HTMLFormElement;
};

declare type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;

declare type __VLS_TemplateResult_2 = ReturnType<typeof __VLS_template_2>;

declare type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};

declare type __VLS_WithTemplateSlots_2<T, S> = T & {
    new (): {
        $slots: S;
    };
};

export declare const BaseButton: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;

export declare const BaseForm: __VLS_WithTemplateSlots_2<typeof __VLS_component_2, __VLS_TemplateResult_2["slots"]>;

export declare const BaseInput: DefineComponent<Props_3, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {
"update:modelValue": (value: string) => any;
}, string, PublicProps, Readonly<Props_3> & Readonly<{
"onUpdate:modelValue"?: ((value: string) => any) | undefined;
}>, {
type: string;
disabled: boolean;
required: boolean;
id: string;
}, {}, {}, {}, string, ComponentProvideOptions, false, {}, HTMLDivElement>;

declare type ButtonSize = 'sm' | 'md' | 'lg';

declare type ButtonType = 'button' | 'submit' | 'reset';

declare type ButtonVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';

declare const _default: {
    install: typeof install;
};
export default _default;

/**
 * UI 라이브러리 설치 함수
 * @param app - Vue 앱 인스턴스
 */
export declare function install(app: App): void;

declare interface Props {
    variant?: ButtonVariant;
    size?: ButtonSize;
    type?: ButtonType;
    disabled?: boolean;
    loading?: boolean;
    fullWidth?: boolean;
}

declare interface Props_2 {
    initialValues?: Record<string, any>;
    validationSchema?: any;
    onSubmit?: (values: Record<string, any>) => void | Promise<void>;
}

declare interface Props_3 {
    name: string;
    modelValue?: string;
    label?: string;
    type?: string;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    id?: string;
}

export { }
