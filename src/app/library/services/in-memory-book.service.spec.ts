import { InMemoryBookService } from './in-memory-book.service';
import { IBook } from '../models/book.model';

describe('InMemoryBookService', () => {
  let service: InMemoryBookService;

  beforeEach(() => {
    service = new InMemoryBookService();
  });

  it('should retrieve all books', (done) => {
    service.getBooks().subscribe(books => {
      expect(Array.isArray(books)).toBeTrue();
      expect(books.length).toBeGreaterThan(0);
      done();
    });
  });

  it('should retrieve a book by id', (done) => {
    service.getBook(2).subscribe(book => {
      expect(book?.title).toBe('To Kill a Mockingbird');
      done();
    });
  });

  it('should add a new book', (done) => {
    const newBook: IBook = { id: 0, title: 'Test', author: 'X', year: 1999, genre: 'Test' };
    service.addBook(newBook).subscribe(book => {
      expect(book.title).toBe('Test');
      service.getBooks().subscribe(books => {
        expect(books.some(b => b.title === 'Test')).toBeTrue();
        done();
      });
    });
  });

  it('should delete a book', (done) => {
    service.deleteBook(2).subscribe(() => {
      service.getBook(2).subscribe(book => {
        expect(book).toBeUndefined();
        done();
      });
    });
  });
});