import { Component, OnInit, Inject } from '@angular/core';
import { IBook } from '../../core/models/book.model';
import { IBookService } from '../../core/services/ibook.service';
import { CommonModule } from '@angular/common';
import { BookListComponent } from './book-list/book-list.component';
import { InMemoryBookService } from '../../core/services/in-memory-book.service';
import { HttpBookService } from '../../core/services/http-book.service';
import { UtilService } from '../../core/services/util.service';

@Component({
  selector: 'app-library',
  template: `
    <app-book-list [books]="books"></app-book-list>
  `,
  standalone: true,
  imports: [CommonModule, BookListComponent],
  providers: [
    { provide: IBookService, useClass: InMemoryBookService } // InMemoryBookService by default
  ]
})
export class LibraryComponent implements OnInit {
  books: IBook[] = [];

  constructor(
    @Inject(IBookService) private bookService: IBookService, 
    private utilService: UtilService
  ) {}

  ngOnInit() {
    this.bookService.getBooks().subscribe((books: IBook[]) =>{
      this.books = this.utilService.convertObjectToIBookArray(books);
    });
  }

}