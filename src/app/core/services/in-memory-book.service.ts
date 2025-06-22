import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { IBook } from '../models/book.model';
import { IBookService } from './ibook.service';
import { map } from 'rxjs/operators';

@Injectable()
export class InMemoryBookService extends IBookService {
  private books$ = new BehaviorSubject<IBook[]>([
    { id: 1, title: '1984', author: 'George Orwell', year: 1949, genre: 'Dystopia' }
  ]);

  getBooks(): Observable<IBook[]> {
    return this.books$.asObservable();
  }

  getBook(id: number): Observable<IBook | undefined> {
    return this.books$.pipe(map(books => books.find(b => b.id === id)));
  }

  addBook(book: IBook): Observable<IBook> {
    const current = this.books$.value;
    const newBook = { ...book, id: Date.now() };
    this.books$.next([...current, newBook]);
    return of(newBook);
  }

  updateBook(book: IBook): Observable<IBook> {
    const current = this.books$.value;
    const idx = current.findIndex(b => b.id === book.id);
    if (idx > -1) {
      current[idx] = book;
      this.books$.next([...current]);
    }
    return of(book);
  }

  deleteBook(id: number): Observable<void> {
    this.books$.next(this.books$.value.filter(b => b.id !== id));
    return of(void 0);
  }
}