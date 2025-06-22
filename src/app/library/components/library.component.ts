import { Component, OnInit, Inject } from '@angular/core';
import { IBook } from '../../core/models/book.model';
import { IBookService } from '../../core/services/ibook.service';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-library',
  template: `
    <h2>Library works!</h2>
    <ul>
      <li *ngFor="let book of books">{{ book.title }} - {{ book.author }}</li>
    </ul>
  `,
  imports: [CommonModule]
})
export class LibraryComponent implements OnInit {
  books: IBook[] = [];

  constructor(
    // @Inject(IBookService) private bookService: IBookService
  ) {}

  ngOnInit() {
    // this.bookService.getBooks().subscribe((books: IBook[]) => this.books = books);
  }
}