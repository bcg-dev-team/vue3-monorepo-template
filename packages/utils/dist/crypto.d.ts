/**
 * 문자열을 SHA-256 해시로 변환
 */
export declare function sha256(message: string): Promise<string>;
/**
 * 문자열을 MD5 해시로 변환 (간단한 구현)
 */
export declare function md5(message: string): string;
/**
 * 랜덤 문자열 생성
 */
export declare function generateRandomString(length: number): string;
/**
 * 랜덤 숫자 생성
 */
export declare function generateRandomNumber(min: number, max: number): number;
/**
 * UUID v4 생성
 */
export declare function generateUUID(): string;
/**
 * Base64 인코딩
 */
export declare function encodeBase64(str: string): string;
/**
 * Base64 디코딩
 */
export declare function decodeBase64(str: string): string;
/**
 * URL 안전한 Base64 인코딩
 */
export declare function encodeBase64URL(str: string): string;
/**
 * URL 안전한 Base64 디코딩
 */
export declare function decodeBase64URL(str: string): string;
/**
 * 간단한 문자열 암호화 (실제 프로덕션에서는 더 강력한 암호화 사용 권장)
 */
export declare function simpleEncrypt(text: string, key: string): string;
/**
 * 간단한 문자열 복호화
 */
export declare function simpleDecrypt(encryptedText: string, key: string): string;
/**
 * 비밀번호 해시 생성 (간단한 구현)
 */
export declare function hashPassword(password: string, salt?: string): Promise<{
    hash: string;
    salt: string;
}>;
/**
 * 비밀번호 검증
 */
export declare function verifyPassword(password: string, hash: string, salt: string): Promise<boolean>;
/**
 * JWT 토큰 생성 (간단한 구현)
 */
export declare function generateJWT(payload: Record<string, unknown>, secret: string): string;
/**
 * JWT 토큰 검증 (간단한 구현)
 */
export declare function verifyJWT(token: string, secret: string): Record<string, unknown> | null;
//# sourceMappingURL=crypto.d.ts.map