import { Component, Input, OnInit, ViewChild, AfterViewInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { IBook } from '../../models/book.model';
import { MatTableDataSource } from '@angular/material/table';
import { BookDetailComponent } from '../book-detail/book-detail.component';
import { IBookService } from '../../services/ibook.service';
import { NotificationService } from '../../../core/services/notification.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    BookDetailComponent
  ],
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit, AfterViewInit {
  @Input() books: IBook[] = [];

  displayedColumns: string[] = ['id', 'title', 'author', 'year', 'genre'];
  displayedColumnsWithActions: string[] = [...this.displayedColumns, 'actions'];
  dataSource = new MatTableDataSource<IBook>([]);
  addingNew: boolean = false;

  editingBookId: number | null = null;  

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private bookService: IBookService,
    @Inject(NotificationService) private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.dataSource = new MatTableDataSource<IBook>(this.books);
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges() {
    this.dataSource = new MatTableDataSource<IBook>(this.books);
    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  startEdit(bookId: number) {
    this.editingBookId = bookId;
  }

  cancelEdit() {
    this.editingBookId = null;
  }

  onEditSave(book: IBook) {
    this.updateBook(book);
    this.cancelEdit();
  }

  loadBooks() {
    this.bookService.getBooks().subscribe(books => {
      this.books = books;
      this.dataSource.data = books;
    });
  }

  addBook(book: IBook) {
    this.bookService.addBook(book).subscribe({
      next: () => {
        this.notificationService.success('Libro añadido correctamente.'),
        this.addingNew = false;
        this.loadBooks();        
      },
      error: () => this.notificationService.error('Error añadiendo el libro.')
    });
  }

  updateBook(book: IBook) {
    this.bookService.updateBook(book).subscribe({
      next: () => {
        this.notificationService.success('Libro añadido correctamente.'),
        this.loadBooks();        
      },
      error: () => this.notificationService.error('Error añadiendo el libro.')
    });
  }

  async removeBook(id: number) {
    const confirmed = await this.notificationService.confirm('¿Deseas eliminar este libro?');

    if (!confirmed) {
      this.notificationService.info('Eliminación cancelada.');
      return;
    }
    this.bookService.deleteBook(id).subscribe({
      next: () => {
        this.notificationService.success('Libro eliminado correctamente.'),
        this.loadBooks();        
      },
      error: () => this.notificationService.error('Error eliminando el libro.')
    });    
  }

  cancelAdd() {
    this.addingNew = false;
  }  
}