import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibraryRoutingModule } from './library-routing.module';
import { LibraryComponent } from './components/library.component';
import { IBookService } from '../core/services/ibook.service';
import { HttpBookService } from '../core/services/http-book.service';

@NgModule({
  // declarations: [LibraryComponent],
  imports: [
    CommonModule,
    LibraryRoutingModule
  ],
  providers: [
    // Cambia aquí entre InMemoryBookService y HttpBookService según lo necesites
    // { provide: IBookService, useClass: InMemoryBookService },
    { provide: IBookService, useClass: HttpBookService }
  ]  
})
export class LibraryModule {}