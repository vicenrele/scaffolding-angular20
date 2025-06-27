import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IBook } from '../models/book.model';
import { IBookService } from './ibook.service';
import { Observable } from 'rxjs';

@Injectable()
export class HttpBookService extends IBookService {
  /**
   * The URL of the API endpoint for fetching books.
   * This is the base URL for the Firebase Realtime Database where books are stored.
   */
  private apiUrl = 'https://mybooksapi-74bc9-default-rtdb.europe-west1.firebasedatabase.app/books.json';

  constructor(private http: HttpClient) { super(); }

  /**
   * Fetches the list of books from the API.
   * @returns An observable of the list of books.
   */
  getBooks(): Observable<IBook[]> {
    return this.http.get<IBook[]>(this.apiUrl);
  }

  /**
   * Fetches a book by its ID from the API.
   * @param id The ID of the book to fetch.
   */
  getBook(id: number): Observable<IBook | undefined> {
    return this.http.get<IBook>(`${this.apiUrl}/${id}`);
  }

  /**
   * Adds a new book to the API.
   * @param book The book to add.
   * @returns An observable of the added book.
   */
  addBook(book: IBook): Observable<IBook> {
    return this.http.post<IBook>(this.apiUrl, book);
  }

  /**
   * Updates an existing book in the API.
   * @param book The book to update.
   * @returns An observable of the updated book.
   */
  updateBook(book: IBook): Observable<IBook> {
    return this.http.put<IBook>(`${this.apiUrl}/${book.id}`, book);
  }

  /**
   * Deletes a book from the API.
   * @param id The ID of the book to delete.
   * @returns An observable of the deletion response.
   */
  deleteBook(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}