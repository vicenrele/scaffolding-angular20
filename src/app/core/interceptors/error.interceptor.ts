import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoggerService } from '../services/logger.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  /**
   * ErrorInterceptor is an HTTP interceptor that handles errors globally.
   * It logs the error details using the LoggerService and rethrows the error.
   * This interceptor should be provided in the AppModule to handle all HTTP errors.
   */
  constructor(private logger: LoggerService) {}

  /**
   * Intercepts HTTP requests and handles errors globally.
   * @param req The HTTP request to intercept.
   * This method intercepts HTTP requests and handles errors globally.
   * @param next  The next handler in the chain.
   * @returns  An observable of the HTTP event.
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        this.logger.error('HTTP Error:', {
          url: req.url,
          status: error.status,
          message: error.message,
          error: error.error
        });


        return throwError(() => error);
      })
    );
  }
}