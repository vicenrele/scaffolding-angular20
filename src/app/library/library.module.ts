import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibraryRoutingModule } from './library-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CoreModule } from '../core/core.module';

@NgModule({
  imports: [
    CommonModule,
    LibraryRoutingModule,
    CoreModule.forRoot(false), // Use InMemoryBookService by default
    MatTableModule,
    MatPaginatorModule
  ]
})
export class LibraryModule {}