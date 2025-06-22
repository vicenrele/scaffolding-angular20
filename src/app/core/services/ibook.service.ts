import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBook } from '../models/book.model';

@Injectable()
export abstract class IBookService {
  abstract getBooks(): Observable<IBook[]>;
  abstract getBook(id: number): Observable<IBook | undefined>;
  abstract addBook(book: IBook): Observable<IBook>;
  abstract updateBook(book: IBook): Observable<IBook>;
  abstract deleteBook(id: number): Observable<void>;
}