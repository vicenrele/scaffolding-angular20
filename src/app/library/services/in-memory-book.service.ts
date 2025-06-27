import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { IBook } from '../models/book.model';
import { IBookService } from './ibook.service';
import { map } from 'rxjs/operators';

@Injectable()
export class InMemoryBookService extends IBookService {
  /**
   * In-memory book data source.
   * This is a mock data source that simulates a book database.
   * It is used for development and testing purposes.
   * In a real application, this would be replaced with a service that interacts with a backend API.
   */
  private books$ = new BehaviorSubject<IBook[]>([
    { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', year: 1960, genre: 'Fiction' },
    { id: 3, title: 'Brave New World', author: 'Aldous Huxley', year: 1932, genre: 'Science Fiction' },
    { id: 4, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', year: 1925, genre: 'Classic' },
    { id: 5, title: 'One Hundred Years of Solitude', author: 'Gabriel García Márquez', year: 1967, genre: 'Magic Realism' },
    { id: 6, title: 'Moby-Dick', author: 'Herman Melville', year: 1851, genre: 'Adventure' },
    { id: 7, title: 'Pride and Prejudice', author: 'Jane Austen', year: 1813, genre: 'Romance' },
    { id: 8, title: 'The Catcher in the Rye', author: 'J.D. Salinger', year: 1951, genre: 'Coming-of-Age' },
    { id: 9, title: 'The Hobbit', author: 'J.R.R. Tolkien', year: 1937, genre: 'Fantasy' },
    { id: 10, title: 'Fahrenheit 451', author: 'Ray Bradbury', year: 1953, genre: 'Dystopia' },
    { id: 11, title: 'Crime and Punishment', author: 'Fyodor Dostoevsky', year: 1866, genre: 'Psychological Fiction' },
    { id: 12, title: 'The Brothers Karamazov', author: 'Fyodor Dostoevsky', year: 1880, genre: 'Philosophical Fiction' },
    { id: 13, title: 'Frankenstein', author: 'Mary Shelley', year: 1818, genre: 'Gothic' },
    { id: 14, title: 'Don Quixote', author: 'Miguel de Cervantes', year: 1605, genre: 'Satire' },
    { id: 15, title: 'The Stranger', author: 'Albert Camus', year: 1942, genre: 'Existentialism' }
  ]);

  /**
   * Retrieves the list of books as an observable.
   * @returns An observable of the list of books.
   */
  getBooks(): Observable<IBook[]> {
    return this.books$.asObservable();
  }

  /**
   * Retrieves a book by its ID.
   * @param id The ID of the book to retrieve.
   * @returns An observable of the book, or undefined if not found.
   */
  getBook(id: number): Observable<IBook | undefined> {
    return this.books$.pipe(map(books => books.find(b => b.id === id)));
  }

  /**
   * Adds a new book to the collection.
   * @param book The book to add.
   * @returns An observable of the added book.
   */
  addBook(book: IBook): Observable<IBook> {
    const current = this.books$.value;
    const newBook = { ...book, id: Date.now() };
    this.books$.next([...current, newBook]);
    return of(newBook);
  }

  /**
   * Updates an existing book in the collection.
   * @param book The book to update.
   * @returns An observable of the updated book.
   */
  updateBook(book: IBook): Observable<IBook> {
    const current = this.books$.value;
    const idx = current.findIndex(b => b.id === book.id);
    if (idx > -1) {
      current[idx] = book;
      this.books$.next([...current]);
    }
    return of(book);
  }

  /**
   * Deletes a book from the collection.
   * @param id The ID of the book to delete.
   * @returns An observable of the deletion response.
   */
  deleteBook(id: number): Observable<void> {
    this.books$.next(this.books$.value.filter(b => b.id !== id));
    return of(void 0);
  }
}