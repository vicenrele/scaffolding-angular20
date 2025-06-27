// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { BookListComponent } from './book-list.component';
// import { BookDetailComponent } from '../book-detail/book-detail.component';
// import { MatTableModule } from '@angular/material/table';
// import { MatPaginatorModule } from '@angular/material/paginator';
// import { MatCardModule } from '@angular/material/card';
// import { MatDividerModule } from '@angular/material/divider';
// import { MatIconModule } from '@angular/material/icon';
// import { IBookService } from '../../services/ibook.service';
// import { NotificationService } from '../../../core/services/notification.service';
// import { of } from 'rxjs';
// import { IBook } from '../../models/book.model';

// describe('BookListComponent', () => {
//   let component: BookListComponent;
//   let fixture: ComponentFixture<BookListComponent>;
//   let mockBookService: jasmine.SpyObj<IBookService>;
//   let mockNotificationService: jasmine.SpyObj<NotificationService>;

//   const books: IBook[] = [
//     { id: 1, title: 'A', author: 'B', year: 2020, genre: 'Fiction' }
//   ];

//   beforeEach(async () => {
//     mockBookService = jasmine.createSpyObj('IBookService', [
//       'getBooks', 'addBook', 'updateBook', 'deleteBook'
//     ]);
//     mockNotificationService = jasmine.createSpyObj('NotificationService', [
//       'success', 'error', 'confirm', 'info'
//     ]);
//     mockBookService.getBooks.and.returnValue(of(books));
//     mockBookService.addBook.and.returnValue(of(books[0]));
//     mockBookService.updateBook.and.returnValue(of(books[0]));
//     mockBookService.deleteBook.and.returnValue(of(void 0));
//     mockNotificationService.confirm.and.returnValue(Promise.resolve(true));

//     await TestBed.configureTestingModule({
//       imports: [
//         BookListComponent,
//         MatTableModule,
//         MatPaginatorModule,
//         MatCardModule,
//         MatDividerModule,
//         MatIconModule,
//         BookDetailComponent
//       ],
//       providers: [
//         { provide: IBookService, useValue: mockBookService },
//         { provide: NotificationService, useValue: mockNotificationService }
//       ]
//     }).compileComponents();

//     fixture = TestBed.createComponent(BookListComponent);
//     component = fixture.componentInstance;
//     component.books = books;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should load books on loadBooks()', () => {
//     component.loadBooks();
//     expect(component.books.length).toBe(1);
//     expect(component.dataSource.data.length).toBe(1);
//   });

//   it('should add a book', () => {
//     component.addBook(books[0]);
//     expect(mockBookService.addBook).toHaveBeenCalled();
//     expect(mockNotificationService.success).toHaveBeenCalled();
//   });

//   it('should update a book', () => {
//     component.updateBook(books[0]);
//     expect(mockBookService.updateBook).toHaveBeenCalled();
//     expect(mockNotificationService.success).toHaveBeenCalled();
//   });

//   it('should delete a book after confirmation', async () => {
//     await component.removeBook(1);
//     expect(mockBookService.deleteBook).toHaveBeenCalledWith(1);
//     expect(mockNotificationService.success).toHaveBeenCalled();
//   });

//   it('should cancel deletion if not confirmed', async () => {
//     mockNotificationService.confirm.and.returnValue(Promise.resolve(false));
//     await component.removeBook(1);
//     expect(mockNotificationService.info).toHaveBeenCalled();
//     expect(mockBookService.deleteBook).not.toHaveBeenCalled();
//   });
// });