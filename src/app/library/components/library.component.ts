import { Component, OnInit, Inject } from '@angular/core';
import { IBook } from '../models/book.model';
import { IBookService } from '../services/ibook.service';
import { CommonModule } from '@angular/common';
import { BookListComponent } from './book-list/book-list.component';
import { InMemoryBookService } from '../services/in-memory-book.service';
import { HttpBookService } from '../services/http-book.service';

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
  /**
   * The list of books to display in the library.
   * This will be populated by the book service when the component initializes.
   */
  books: IBook[] = [];

  constructor(
    @Inject(IBookService) private bookService: IBookService,
  ) {}

  /**
   * Initialize the component and load books from the book service.
   * This method subscribes to the book service to get the list of books
   * and converts the data to an array of IBook objects.
   */
  ngOnInit() {
    this.bookService.getBooks().subscribe((books: IBook[]) =>{
      this.books = this.convertObjectToIBookArray(books);
    });
  }

  /**
   * @param data The data to convert, which can be an object or an array.
   * @returns An array of IBook objects.
   */
  convertObjectToIBookArray(data: any): IBook[] {
    if (data !== null && typeof data === 'object' && !Array.isArray(data)) {
      return Object.values(data) as IBook[];
    }
    else {
      return data as IBook[];
    }
  }    

}