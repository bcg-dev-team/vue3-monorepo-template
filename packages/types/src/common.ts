// 공통 타입 정의
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

export type Nullable<T> = T | null;

export type Undefinable<T> = T | undefined;

export type NonNullable<T> = T extends null | undefined ? never : T;

export type AsyncReturnType<T extends (..._args: unknown[]) => Promise<unknown>> = T extends (
  ..._args: unknown[]
) => Promise<infer R>
  ? R
  : unknown;

export type EventHandler<T = Event> = (_event: T) => void;

export type VoidFunction = () => void;

export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface LoadingStateData<T = unknown> {
  state: LoadingState;
  data?: T;
  error?: string;
}

export type SortOrder = 'asc' | 'desc';

export interface SortConfig {
  field: string;
  order: SortOrder;
}

export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

export interface ResponsiveConfig<T> {
  xs?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
  xxl?: T;
}

export type Locale = 'ko' | 'en' | 'ja' | 'zh';

export interface LocalizationConfig {
  locale: Locale;
  fallbackLocale: Locale;
  messages: Record<string, Record<string, string>>;
}

export type Environment = 'development' | 'staging' | 'production';

export interface EnvironmentConfig {
  environment: Environment;
  apiUrl: string;
  appUrl: string;
  debug: boolean;
}
