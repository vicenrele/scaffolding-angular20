import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibraryRoutingModule } from './library-routing.module';
import { IBookService } from '../core/services/ibook.service';
import { HttpBookService } from '../core/services/http-book.service';
import { InMemoryBookService } from '../core/services/in-memory-book.service';

@NgModule({
  imports: [
    CommonModule,
    LibraryRoutingModule
  ],
  providers: [
    { provide: IBookService, useClass: InMemoryBookService },
    { provide: IBookService, useClass: HttpBookService }
  ]  
})
export class LibraryModule {}