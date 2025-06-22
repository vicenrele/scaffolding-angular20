import { Component, OnInit, Inject } from '@angular/core';
import { IBook } from '../../core/models/book.model';
import { IBookService } from '../../core/services/ibook.service';
import { CommonModule } from '@angular/common';
import { BookListComponent } from './book-list/book-list.component';

@Component({
  selector: 'app-library',
  template: `
    <h2>Library works!</h2>
    <app-book-list [books]="books"></app-book-list>
  `,
  standalone: true,
  imports: [CommonModule, BookListComponent]
})
export class LibraryComponent implements OnInit {
  books: IBook[] = [];

  constructor(
    @Inject(IBookService) private bookService: IBookService
  ) {}

  ngOnInit() {
    this.bookService.getBooks().subscribe((books: IBook[]) => this.books = books);
  }
}