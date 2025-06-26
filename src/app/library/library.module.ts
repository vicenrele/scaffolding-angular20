import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibraryRoutingModule } from './library-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CoreModule } from '../core/core.module';
import { LoggerService } from '../core/services/logger.service';
import { ErrorInterceptor } from '../core/interceptors/error.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    LibraryRoutingModule,
    CoreModule.forRoot(), // Use InMemoryBookService by default
    MatTableModule,
    MatPaginatorModule
  ], 
  providers: [
    LoggerService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],  
})
export class LibraryModule {}