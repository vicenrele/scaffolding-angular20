import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibraryRoutingModule } from './library-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
// import { IBookService } from '../core/services/ibook.service';
// import { HttpBookService } from '../core/services/http-book.service';
// import { InMemoryBookService } from '../core/services/in-memory-book.service';
import { CoreModule } from '../core/core.module';

@NgModule({
  imports: [
    CommonModule,
    LibraryRoutingModule,
    CoreModule.forRoot(false), // Use InMemoryBookService by default
    MatTableModule,
    MatPaginatorModule
  ],
  // providers: [
  //   { provide: IBookService, useClass: InMemoryBookService },
  //   { provide: IBookService, useClass: HttpBookService }
  // ]  
})
export class LibraryModule {}