// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { BookDetailComponent } from './book-detail.component';
// import { ReactiveFormsModule } from '@angular/forms';
// import { IBook } from '../../models/book.model';
// import { By } from '@angular/platform-browser';

// describe('BookDetailComponent', () => {
//   let component: BookDetailComponent;
//   let fixture: ComponentFixture<BookDetailComponent>;
//   const book: IBook = { id: 1, title: 'Book', author: 'Author', year: 2020, genre: 'Genre' };

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [BookDetailComponent, ReactiveFormsModule]
//     }).compileComponents();

//     fixture = TestBed.createComponent(BookDetailComponent);
//     component = fixture.componentInstance;
//     component.book = book;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should emit save event when onSave is called and form is valid', () => {
//     spyOn(component.save, 'emit');
//     component.form.setValue(book);
//     component.onSave();
//     expect(component.save.emit).toHaveBeenCalledWith(book);
//   });

//   it('should emit delete event when onDelete is called', () => {
//     spyOn(component.delete, 'emit');
//     component.onDelete();
//     expect(component.delete.emit).toHaveBeenCalledWith(book.id);
//   });

//   it('should emit cancel event when onCancel is called in new mode', () => {
//     component.isNew = true;
//     spyOn(component.cancel, 'emit');
//     component.onCancel();
//     expect(component.cancel.emit).toHaveBeenCalled();
//   });

//   it('should patch form with book when startEdit is called', () => {
//     component.startEdit();
//     expect(component.editing).toBeTrue();
//     expect(component.form.value.title).toBe(book.title);
//   });
// });