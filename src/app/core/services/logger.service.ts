import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoggerService {
  /*
   * Logs a message to the console.
   * @param message The message to log.
   * @param optionalParams Additional parameters to log.
   */
  log(message: any, ...optionalParams: any[]) {
    console.log('[LOG]:', message, ...optionalParams);
  }

  /*
   * Logs an informational message to the console.
   * @param message The message to log.
   * @param optionalParams Additional parameters to log.
   */
  info(message: any, ...optionalParams: any[]) {
    console.info('[INFO]:', message, ...optionalParams);
  }

  /**
   * Logs a warning message to the console.
   * @param message The message to log.
   * @param optionalParams Additional parameters to log.
   */
  warn(message: any, ...optionalParams: any[]) {
    console.warn('[WARN]:', message, ...optionalParams);
  }

  /**
   * Logs an error message to the console.
   * @param message The error message to log.
   * @param optionalParams Additional parameters to log.
   */
  error(message: any, ...optionalParams: any[]) {
    console.error('[ERROR]:', message, ...optionalParams);
  }
}