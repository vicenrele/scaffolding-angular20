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
  @Input() book?: IBook;
  @Input() isNew = false;
  @Output() save = new EventEmitter<IBook>();
  @Output() delete = new EventEmitter<number>();
  @Output() cancel = new EventEmitter<void>();

  form!: FormGroup;
  editing = false;

  constructor(private fb: FormBuilder) {}

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

  startEdit() {
    this.editing = true;
    this.form.patchValue(this.book || {});
  }

  onSave() {
    if (this.form.valid) {
      this.save.emit(this.form.value);
      this.editing = false;
    }
  }

  onDelete() {
    if (this.book && this.book.id != null) {
      this.delete.emit(this.book.id);
    }
  }

  onCancel() {
    this.editing = false;
    if (this.isNew) {
      this.cancel.emit();
    } else {
      this.form.patchValue(this.book || {});
    }
  }
}