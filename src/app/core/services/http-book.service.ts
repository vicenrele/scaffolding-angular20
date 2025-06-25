import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IBook } from '../models/book.model';
import { IBookService } from './ibook.service';
import { Observable } from 'rxjs';

@Injectable()
export class HttpBookService extends IBookService {
  private apiUrl = 'https://mybooksapi-74bc9-default-rtdb.europe-west1.firebasedatabase.app/books.json';

  constructor(private http: HttpClient) { super(); }

  getBooks(): Observable<IBook[]> {
    return this.http.get<IBook[]>(this.apiUrl);
  }

  getBook(id: number): Observable<IBook | undefined> {
    return this.http.get<IBook>(`${this.apiUrl}/${id}`);
  }

  addBook(book: IBook): Observable<IBook> {
    return this.http.post<IBook>(this.apiUrl, book);
  }

  updateBook(book: IBook): Observable<IBook> {
    return this.http.put<IBook>(`${this.apiUrl}/${book.id}`, book);
  }

  deleteBook(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}