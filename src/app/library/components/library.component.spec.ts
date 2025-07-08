// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { LibraryComponent } from './library.component';
// import { IBookService } from '../services/ibook.service';
// import { of } from 'rxjs';
// import { IBook } from '../models/book.model';
// import { BookListComponent } from './book-list/book-list.component';
// import { CommonModule } from '@angular/common';

// describe('LibraryComponent', () => {
//   let component: LibraryComponent;
//   let fixture: ComponentFixture<LibraryComponent>;
//   let mockBookService: jasmine.SpyObj<IBookService>;

//   const books: IBook[] = [
//     { id: 1, title: 'Book', author: 'Author', year: 2020, genre: 'Genre' }
//   ];

//   beforeEach(async () => {
//     mockBookService = jasmine.createSpyObj('IBookService', ['getBooks']);
//     mockBookService.getBooks.and.returnValue(of(books));

//     await TestBed.configureTestingModule({
//       imports: [LibraryComponent, BookListComponent, CommonModule],
//       providers: [
//         { provide: IBookService, useValue: mockBookService }
//       ]
//     }).compileComponents();

//     fixture = TestBed.createComponent(LibraryComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should load books on init', () => {
//     expect(component.books.length).toBe(1);
//     expect(component.books[0].title).toBe('Book');
//   });

//   it('should convert object to book array', () => {
//     const obj = { a: books[0] };
//     expect(component.convertObjectToIBookArray(obj).length).toBe(1);
//     expect(component.convertObjectToIBookArray(books).length).toBe(1);
//   });
// });