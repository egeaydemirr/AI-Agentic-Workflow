/**
 * Logger utility
 * Centralized logging for debugging
 */

import CONFIG from '../../config';

class Logger {
  private readonly enabled: boolean;

  constructor() {
    this.enabled = CONFIG.ENABLE_LOGS;
  }

  log(...args: any[]): void {
    if (this.enabled) {
      console.log('[LOG]', ...args);
    }
  }

  error(...args: any[]): void {
    if (this.enabled) {
      console.error('[ERROR]', ...args);
    }
  }

  warn(...args: any[]): void {
    if (this.enabled) {
      console.warn('[WARN]', ...args);
    }
  }

  info(...args: any[]): void {
    if (this.enabled) {
      console.info('[INFO]', ...args);
    }
  }
}

export const logger = new Logger();
export default logger;
