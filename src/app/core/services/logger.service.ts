import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoggerService {
  log(message: any, ...optionalParams: any[]) {
    console.log('[LOG]:', message, ...optionalParams);
  }

  info(message: any, ...optionalParams: any[]) {
    console.info('[INFO]:', message, ...optionalParams);
  }

  warn(message: any, ...optionalParams: any[]) {
    console.warn('[WARN]:', message, ...optionalParams);
  }

  error(message: any, ...optionalParams: any[]) {
    console.error('[ERROR]:', message, ...optionalParams);
  }
}