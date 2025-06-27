import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IBook } from '../../models/book.model';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
  ],
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {
  /**
   * The book to display or edit.
   * If `isNew` is true, this will be used to create a new book.
   */
  @Input() book?: IBook;
  /**
   * Flag to indicate if the component is in "new book" mode.
   * If true, the form will be initialized for creating a new book.
   */
  @Input() isNew = false;
  /**
   * Event emitted when the book is saved.
   * The emitted value will be the book details from the form.
   */
  @Output() save = new EventEmitter<IBook>();
  /**
   * Event emitted when the book is deleted.
   * The emitted value will be the ID of the book to delete.
   */
  @Output() delete = new EventEmitter<number>();
  /**
   * Event emitted when the user cancels the editing or creation of a book.
   * This can be used to reset the form or navigate away from the detail view.
   */
  @Output() cancel = new EventEmitter<void>();

  /**
   * The form group that contains the book details.
   * This will be used to manage the form state and validation.
   */
  form!: FormGroup;
  /**
   * Flag to indicate if the component is in editing mode.
   * This will be set to true when the user starts editing a book.
   */
  editing = false;

  constructor(private fb: FormBuilder) {}

  /**
   * Initialize the form group for the book details.
   * This method sets up the form controls with default values if a book is provided,
   * or empty values if creating a new book.
   */
  ngOnInit() {
    this.editing = this.isNew;
    this.form = this.fb.group({
      id: [this.book?.id ?? null],
      title: [this.book?.title ?? '', Validators.required],
      author: [this.book?.author ?? '', Validators.required],
      year: [this.book?.year ?? '', [Validators.required, Validators.pattern(/^\d{4}$/)]],
      genre: [this.book?.genre ?? '', Validators.required],
    });
  }

  /**
   * Start editing the book details.
   * This method sets the editing flag to true and populates the form with the book details
   */
  startEdit() {
    this.editing = true;
    this.form.patchValue(this.book || {});
  }

  /**
   * Save the book details.
   * This method checks if the form is valid and emits the save event with the form values
   */
  onSave() {
    if (this.form.valid) {
      this.save.emit(this.form.value);
      this.editing = false;
    }
  }

  /**
   * Delete the book.
   * This method emits the delete event with the book ID if it exists.
   */
  onDelete() {
    if (this.book && this.book.id != null) {
      this.delete.emit(this.book.id);
    }
  }

  /**
   * Cancel the editing or creation of a book.
   * This method resets the editing flag and emits the cancel event if creating a new book.
   */
  onCancel() {
    this.editing = false;
    if (this.isNew) {
      this.cancel.emit();
    } else {
      this.form.patchValue(this.book || {});
    }
  }
}