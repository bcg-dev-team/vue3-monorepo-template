import { z } from 'zod';
export declare const emailSchema: z.ZodString;
export declare const passwordSchema: z.ZodString;
export declare const phoneSchema: z.ZodEffects<z.ZodEffects<z.ZodString, string, string>, string, string>;
export declare const urlSchema: z.ZodString;
export declare const requiredStringSchema: z.ZodString;
export declare const numberRangeSchema: (min: number, max: number) => z.ZodNumber;
export declare const stringLengthSchema: (min: number, max: number) => z.ZodString;
export declare const koreanSSNSchema: z.ZodEffects<z.ZodString, string, string>;
export declare const creditCardSchema: z.ZodEffects<z.ZodString, string, string>;
export declare const fileSizeSchema: (maxSizeInMB: number) => z.ZodEffects<z.ZodType<File, z.ZodTypeDef, File>, File, File>;
export declare const fileTypeSchema: (allowedTypes: string[]) => z.ZodEffects<z.ZodType<File, z.ZodTypeDef, File>, File, File>;
export declare const loginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export declare const registerSchema: z.ZodEffects<z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    confirmPassword: z.ZodString;
    firstName: z.ZodString;
    lastName: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
}, {
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
}>, {
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
}, {
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
}>;
export declare const userProfileSchema: z.ZodObject<{
    firstName: z.ZodString;
    lastName: z.ZodString;
    email: z.ZodString;
    phone: z.ZodOptional<z.ZodEffects<z.ZodEffects<z.ZodString, string, string>, string, string>>;
    bio: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    email: string;
    firstName: string;
    lastName: string;
    phone?: string | undefined;
    bio?: string | undefined;
}, {
    email: string;
    firstName: string;
    lastName: string;
    phone?: string | undefined;
    bio?: string | undefined;
}>;
export declare const emailValidationSchema: any;
export declare const passwordValidationSchema: any;
export declare const phoneValidationSchema: any;
export declare const urlValidationSchema: any;
export declare const loginValidationSchema: any;
export declare const registerValidationSchema: any;
export declare const userProfileValidationSchema: any;
export declare function validateEmail(email: string): boolean;
export declare function validatePassword(password: string): {
    isValid: boolean;
    score: number;
    feedback: string[];
};
export declare function validatePhone(phone: string): boolean;
export declare function validateUrl(url: string): boolean;
export declare function validateRequired(value: unknown): boolean;
//# sourceMappingURL=validation.d.ts.map