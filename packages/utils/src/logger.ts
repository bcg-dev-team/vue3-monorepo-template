/**
 * 커스텀 로거 유틸리티 모듈
 * 환경 인식 콘솔 로깅과 스타일된 출력을 제공합니다
 * 브라우저와 Node.js 환경 모두를 지원합니다
 *
 * @author ygpark
 * @created-with Cursor AI
 */

import { getEnvironment } from './env.js';

/**
 * 로그 레벨 타입 정의
 */
export type LogLevel = 'log' | 'info' | 'warn' | 'error' | 'debug' | 'trace';

/**
 * 로그 레벨 설정 타입
 */
export interface LogLevels {
  log: boolean;
  info: boolean;
  warn: boolean;
  error: boolean;
  debug: boolean;
  trace: boolean;
  assert: boolean;
  dir: boolean;
  table: boolean;
  group: boolean;
  groupEnd: boolean;
  time: boolean;
  timeEnd: boolean;
  count: boolean;
  clear: boolean;
}

/**
 * 스타일 설정 타입
 */
export interface LogStyle {
  label: string;
  labelStyle: string;
  messageStyle: string;
}

/**
 * 컴포넌트 로거 인터페이스
 */
export interface ComponentLogger {
  log: (message: string, data?: unknown) => void;
  info: (message: string, data?: unknown) => void;
  warn: (message: string, data?: unknown) => void;
  error: (message: string, data?: unknown) => void;
  debug: (message: string, data?: unknown) => void;
  trace: (message: string, data?: unknown) => void;
  time: (label: string) => void;
  timeEnd: (label: string) => void;
  count: (label: string) => void;
  group: (label: string) => void;
  groupEnd: () => void;
}

/**
 * 커스텀 로거 클래스
 */
export class Logger {
  private environment: string;
  private logLevels: LogLevels;
  private counters: Map<string, number>;
  private timers: Map<string, number>;

  // 라벨 상수 정의 (6글자 길이로 통일)
  private readonly LABELS = {
    LOG: '   LOG',
    INFO: '  INFO',
    WARN: '  WARN',
    ERROR: ' ERROR',
    DEBUG: ' DEBUG',
    TRACE: ' TRACE',
  } as const;

  private readonly styles: Record<LogLevel, LogStyle>;

  constructor() {
    this.environment = getEnvironment();
    this.logLevels = this.getLogLevels();
    this.styles = this.getStyles();
    this.counters = new Map();
    this.timers = new Map();
  }

  /**
   * 현재 환경을 가져옵니다
   * @returns {string} 환경 이름
   */
  getEnvironment(): string {
    return this.environment;
  }

  /**
   * 환경에 따른 로그 레벨을 가져옵니다
   * @returns {LogLevels} 로그 레벨 설정
   */
  private getLogLevels(): LogLevels {
    const levels: Record<string, LogLevels> = {
      development: {
        log: true,
        info: true,
        warn: true,
        error: true,
        debug: true,
        trace: true,
        assert: true,
        dir: true,
        table: true,
        group: true,
        groupEnd: true,
        time: true,
        timeEnd: true,
        count: true,
        clear: true,
      },
      production: {
        log: false,
        info: false,
        warn: true,
        error: true,
        debug: false,
        trace: false,
        assert: false,
        dir: false,
        table: false,
        group: false,
        groupEnd: false,
        time: false,
        timeEnd: false,
        count: false,
        clear: false,
      },
    };
    return levels[this.environment] || levels.development;
  }

  /**
   * 스타일된 출력 설정을 가져옵니다
   * @returns {Record<LogLevel, LogStyle>} 스타일 설정
   */
  private getStyles(): Record<LogLevel, LogStyle> {
    return {
      log: {
        label: this.LABELS.LOG,
        labelStyle:
          'color: white; background: #6c757d; padding: 2px 6px; border-radius: 3px; font-weight: bold;',
        messageStyle: 'color: #212529;',
      },
      info: {
        label: this.LABELS.INFO,
        labelStyle:
          'color: white; background: #17a2b8; padding: 2px 6px; border-radius: 3px; font-weight: bold;',
        messageStyle: 'color: #0c5460;',
      },
      warn: {
        label: this.LABELS.WARN,
        labelStyle:
          'color: white; background: #ffc107; padding: 2px 6px; border-radius: 3px; font-weight: bold;',
        messageStyle: 'color: #856404;',
      },
      error: {
        label: this.LABELS.ERROR,
        labelStyle:
          'color: white; background: #dc3545; padding: 2px 6px; border-radius: 3px; font-weight: bold;',
        messageStyle: 'color: #721c24;',
      },
      debug: {
        label: this.LABELS.DEBUG,
        labelStyle:
          'color: white; background: #6f42c1; padding: 2px 6px; border-radius: 3px; font-weight: bold;',
        messageStyle: 'color: #4a148c;',
      },
      trace: {
        label: this.LABELS.TRACE,
        labelStyle:
          'color: white; background: #fd7e14; padding: 2px 6px; border-radius: 3px; font-weight: bold;',
        messageStyle: 'color: #8b4513;',
      },
    };
  }

  /**
   * 스타일된 출력으로 메시지를 포맷합니다
   * @param {LogLevel} level - 로그 레벨
   * @param {string} message - 로그 메시지
   * @param {unknown} data - 추가 데이터
   * @returns {unknown[]} 콘솔용 포맷된 인수들
   */
  private formatMessage(level: LogLevel, message: string, data?: unknown): unknown[] {
    const style = this.styles[level];
    if (!style) {
      return [message, data].filter(Boolean);
    }

    const formattedMessage = `%c ${style.label} %c ${message}`;
    const args: unknown[] = [formattedMessage, style.labelStyle, style.messageStyle];

    if (data !== undefined) {
      args.push(data);
    }

    return args;
  }

  /**
   * 주어진 레벨의 로깅이 활성화되어 있는지 확인합니다
   * @param {string} level - 로그 레벨
   * @returns {boolean} 로깅이 활성화되어 있는지 여부
   */
  private isEnabled(level: keyof LogLevels): boolean {
    return this.logLevels[level] === true;
  }

  // Core logging methods
  /**
   * 일반 로그 메시지를 출력합니다
   * @param {string} message - 로그 메시지
   * @param {unknown} data - 추가 데이터
   */
  log(message: string, data?: unknown): void {
    if (!this.isEnabled('log')) return;
    const args = this.formatMessage('log', message, data);
    console.log(...args);
  }

  /**
   * 정보 메시지를 출력합니다
   * @param {string} message - 로그 메시지
   * @param {unknown} data - 추가 데이터
   */
  info(message: string, data?: unknown): void {
    if (!this.isEnabled('info')) return;
    const args = this.formatMessage('info', message, data);
    console.info(...args);
  }

  /**
   * 경고 메시지를 출력합니다
   *
   * ⚠️ 주의: 프로덕션 환경에서도 활성화되므로 주의해서 사용해주세요.
   * 특히, 민감한 정보나 과도한 로그는 피하세요.
   *
   * @param {string} message - 경고 메시지
   * @param {unknown} data - 추가 데이터
   */
  warn(message: string, data?: unknown): void {
    if (!this.isEnabled('warn')) return;
    const args = this.formatMessage('warn', message, data);
    console.warn(...args);
  }

  /**
   * 에러 메시지를 출력합니다
   *
   * ⚠️ 주의: 프로덕션 환경에서도 활성화되므로 주의해서 사용해주세요.
   * 특히, 민감한 정보나 과도한 로그는 피하세요.
   *
   * @param {string} message - 에러 메시지
   * @param {unknown} data - 추가 데이터 (Error 객체 권장)
   */
  error(message: string, data?: unknown): void {
    if (!this.isEnabled('error')) return;
    const args = this.formatMessage('error', message, data);
    console.error(...args);
  }

  /**
   * 디버그 메시지를 출력합니다
   * @param {string} message - 로그 메시지
   * @param {unknown} data - 추가 데이터
   */
  debug(message: string, data?: unknown): void {
    if (!this.isEnabled('debug')) return;
    const args = this.formatMessage('debug', message, data);
    console.debug(...args);
  }

  /**
   * 스택 트레이스와 함께 메시지를 출력합니다
   * @param {string} message - 로그 메시지
   * @param {unknown} data - 추가 데이터
   */
  trace(message: string, data?: unknown): void {
    if (!this.isEnabled('trace')) return;
    const args = this.formatMessage('trace', message, data);
    console.trace(...args);
  }

  // Advanced console methods
  /**
   * 조건 검증을 수행합니다
   * @param {boolean} condition - 검증할 조건
   * @param {string} message - 메시지
   * @param {unknown} data - 추가 데이터
   */
  assert(condition: boolean, message: string, data?: unknown): void {
    if (!this.isEnabled('assert')) return;
    if (data !== undefined) {
      console.assert(condition, message, data);
    } else {
      console.assert(condition, message);
    }
  }

  /**
   * 객체를 검사합니다
   * @param {unknown} obj - 검사할 객체
   * @param {object} options - 옵션
   */
  dir(obj: unknown, options?: object): void {
    if (!this.isEnabled('dir')) return;
    console.dir(obj, options);
  }

  /**
   * 테이블 형식으로 데이터를 표시합니다
   * @param {unknown} data - 표시할 데이터
   * @param {string[]} columns - 컬럼 목록
   */
  table(data: unknown, columns?: string[]): void {
    if (!this.isEnabled('table')) return;
    console.table(data, columns);
  }

  /**
   * 관련 로그들을 그룹화합니다
   * @param {string} label - 그룹 라벨
   */
  group(label: string): void {
    if (!this.isEnabled('group')) return;
    console.group(label);
  }

  /**
   * 로그 그룹을 종료합니다
   */
  groupEnd(): void {
    if (!this.isEnabled('groupEnd')) return;
    console.groupEnd();
  }

  // Timing methods
  /**
   * 타이머를 시작합니다
   * @param {string} label - 타이머 라벨
   */
  time(label: string): void {
    if (!this.isEnabled('time')) return;
    this.timers.set(label, Date.now());
    console.time(label);
  }

  /**
   * 타이머를 종료하고 경과 시간을 출력합니다
   * @param {string} label - 타이머 라벨
   */
  timeEnd(label: string): void {
    if (!this.isEnabled('timeEnd')) return;
    const startTime = this.timers.get(label);
    if (startTime) {
      const duration = Date.now() - startTime;
      console.log(
        `%c ${this.LABELS.LOG} %c Timer '${label}' completed in ${duration}ms`,
        this.styles.log.labelStyle,
        ''
      );
      this.timers.delete(label);
    }
    console.timeEnd(label);
  }

  // Counting methods
  /**
   * 발생 횟수를 카운트합니다
   * @param {string} label - 카운터 라벨
   */
  count(label = 'default'): void {
    if (!this.isEnabled('count')) return;
    const currentCount = this.counters.get(label) || 0;
    const newCount = currentCount + 1;
    this.counters.set(label, newCount);
    console.log(
      `%c ${this.LABELS.LOG} %c Count '${label}': ${newCount}`,
      this.styles.log.labelStyle,
      ''
    );
    console.count(label);
  }

  /**
   * 카운터를 초기화합니다
   * @param {string} label - 카운터 라벨
   */
  countReset(label = 'default'): void {
    if (!this.isEnabled('count')) return;
    this.counters.delete(label);
    console.countReset(label);
  }

  // Utility methods
  /**
   * 콘솔을 지웁니다
   */
  clear(): void {
    if (!this.isEnabled('clear')) return;
    console.clear();
  }

  /**
   * 사용 가능한 메서드에 대한 도움말 정보를 표시합니다
   */
  help(): void {
    const helpText = `
%c LOGGER HELP %c 사용 가능한 메서드:

%c 기본 메서드: %c
- Logger.log(message, data)                일반 로깅
- Logger.info(message, data)               정보 메시지
- Logger.warn(message, data)               경고 메시지
- Logger.error(message, data)              에러 메시지
- Logger.debug(message, data)              디버그 메시지
- Logger.trace(message, data)              스택 트레이스

%c 고급 메서드: %c
- Logger.assert(condition, message, data)  조건 검증
- Logger.dir(obj, options)                 객체 검사
- Logger.table(data, columns)              테이블 형식 데이터 표시
- Logger.group(label)                      관련 로그 그룹화
- Logger.groupEnd()                        로그 그룹 종료

%c 타이밍 메서드: %c
- Logger.time(label)                       타이머 시작
- Logger.timeEnd(label)                    타이머 종료

%c 카운팅 메서드: %c
- Logger.count(label)                      발생 횟수 카운트
- Logger.countReset(label)                 카운터 초기화

%c 유틸리티 메서드: %c
- Logger.clear()                           콘솔 지우기
- Logger.help()                            도움말 표시
- Logger.demo()                            예제 실행

%c Environment: %c${this.environment}
%c Log Levels Enabled: %c${Object.keys(this.logLevels)
      .filter((key) => this.logLevels[key as keyof LogLevels])
      .join(', ')}
        `;

    const styles = [
      'color: white; background: #007bff; padding: 4px 8px; border-radius: 4px; font-weight: bold;', // LOGGER HELP
      'color: #495057;', // Available Methods
      'color: #28a745; font-weight: bold;', // Core Methods
      'color: #6c757d;', // Core Methods content
      'color: #17a2b8; font-weight: bold;', // Advanced Methods
      'color: #6c757d;', // Advanced Methods content
      'color: #ffc107; font-weight: bold;', // Timing Methods
      'color: #6c757d;', // Timing Methods content
      'color: #dc3545; font-weight: bold;', // Counting Methods
      'color: #6c757d;', // Counting Methods content
      'color: #6f42c1; font-weight: bold;', // Utility Methods
      'color: #6c757d;', // Utility Methods content
      'color: #20c997; font-weight: bold;', // Environment
      'color: #6c757d;', // Environment value
      'color: #e83e8c; font-weight: bold;', // Log Levels
      'color: #6c757d;', // Log Levels value
    ];

    console.log(helpText, ...styles);
  }

  /**
   * 모든 로깅 메서드의 예제를 실행합니다
   */
  demo(): void {
    this.group('Logger Demo Examples');

    this.log('This is a regular log message');
    this.info('This is an info message with data', { user: 'John', age: 30 });
    this.warn('This is a warning message');
    this.error('This is an error message', new Error('Demo error'));
    this.debug('This is a debug message (development only)');

    this.group('Advanced Examples');
    this.assert(2 + 2 === 4, 'Math assertion passed');
    this.assert(2 + 2 === 5, 'Math assertion failed');

    const sampleData = [
      { name: 'Alice', age: 25, city: 'New York' },
      { name: 'Bob', age: 30, city: 'Los Angeles' },
      { name: 'Charlie', age: 35, city: 'Chicago' },
    ];
    this.table(sampleData);

    this.dir({ complex: 'object', with: 'nested', data: { level: 1, level2: { level: 3 } } });
    this.groupEnd();

    this.group('Timing Examples');
    this.time('demo-timer');
    setTimeout(() => {
      this.timeEnd('demo-timer');
    }, 1000);
    this.groupEnd();

    this.group('Counting Examples');
    this.count('demo-counter');
    this.count('demo-counter');
    this.count('demo-counter');
    this.countReset('demo-counter');
    this.count('demo-counter');
    this.groupEnd();

    this.groupEnd();
  }

  /**
   * 컴포넌트별 로거를 생성합니다
   * @param {string} componentName - 컴포넌트 이름
   * @returns {ComponentLogger} 컴포넌트 로거 인스턴스
   */
  createComponentLogger(componentName: string): ComponentLogger {
    return {
      log: (message: string, data?: unknown) => this.log(`[${componentName}] ${message}`, data),
      info: (message: string, data?: unknown) => this.info(`[${componentName}] ${message}`, data),
      warn: (message: string, data?: unknown) => this.warn(`[${componentName}] ${message}`, data),
      error: (message: string, data?: unknown) => this.error(`[${componentName}] ${message}`, data),
      debug: (message: string, data?: unknown) => this.debug(`[${componentName}] ${message}`, data),
      trace: (message: string, data?: unknown) => this.trace(`[${componentName}] ${message}`, data),
      time: (label: string) => this.time(`${componentName}-${label}`),
      timeEnd: (label: string) => this.timeEnd(`${componentName}-${label}`),
      count: (label: string) => this.count(`${componentName}-${label}`),
      group: (label: string) => this.group(`[${componentName}] ${label}`),
      groupEnd: () => this.groupEnd(),
    };
  }
}

// Create singleton instance
const logger = new Logger();

// Export both the class and the singleton instance
export { logger as default };
