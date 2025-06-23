import { Component, Input, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { IBook } from '../../../core/models/book.model';
import { MatTableDataSource } from '@angular/material/table';
import { BookDetailComponent } from '../book-detail/book-detail.component';
import { IBookService } from '../../../core/services/ibook.service';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatDividerModule,
    BookDetailComponent
  ],
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit, AfterViewInit {
  @Input() books: IBook[] = [];

  displayedColumns: string[] = ['id', 'title', 'author', 'year', 'genre'];
  dataSource = new MatTableDataSource<IBook>([]);
  addingNew: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private bookService: IBookService, 
    private cdRef: ChangeDetectorRef,
    @Inject(NotificationService) private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.bookService.getBooks().subscribe(books => {
      this.books = books;
      this.dataSource.data = books;
      // Vuelve a asignar el paginador tras actualizar los datos
      // if (this.paginator) {
      //   this.dataSource.paginator = this.paginator;
      //   // Opcional: volver a la primera página al actualizar la lista
      //   this.paginator.firstPage();
      // }      
    });
  }

  ngOnChanges() {
    this.dataSource = new MatTableDataSource<IBook>(this.books);
    // this.cdRef.detectChanges();
    // if (this.paginator) {
    //   this.dataSource.paginator = this.paginator;
    // }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    // this.cdRef.detectChanges();
  }

  loadBooks() {
    this.bookService.getBooks().subscribe(books => {
      this.books = books;
    });
  }

  // Métodos para manejar añadir, editar y eliminar
  addBook(book: IBook) {
    // Llama al servicio para guardar, luego refresca el listado
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
        this.notificationService.success('Libro añadido correctamente.'),
        this.loadBooks();        
      },
      error: () => this.notificationService.error('Error eliminando el libro.')
    });    
  }

  cancelAdd() {
    this.addingNew = false;
  }  
}