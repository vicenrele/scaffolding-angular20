import { Component, Input, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { IBook } from '../../../core/models/book.model';
import { MatTableDataSource } from '@angular/material/table';
import { BookDetailComponent } from '../book-detail/book-detail.component';
import { InMemoryBookService } from '../../../core/services/in-memory-book.service';
import { IBookService } from '../../../core/services/ibook.service';

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

  constructor(private bookService: InMemoryBookService) {}

  ngOnInit() {
    this.bookService.getBooks().subscribe(books => {
      this.books = books;
      this.dataSource.data = books;
      // Si usas paginador
      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
      }
    });    
    // this.loadBooks();
    // this.dataSource = new MatTableDataSource<IBook>(this.books);
  }

  ngOnChanges() {
    this.dataSource = new MatTableDataSource<IBook>(this.books);
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadBooks() {
    this.bookService.getBooks().subscribe(books => {
      this.books = books;
    });
  }

  // Métodos para manejar añadir, editar y eliminar
  addBook(book: IBook) {
    // Llama al servicio para guardar, luego refresca el listado
    this.bookService.addBook(book).subscribe(() => {
      this.addingNew = false;
      this.loadBooks();
    });
  }

  updateBook(book: IBook) {
    // Llama al servicio para actualizar, luego refresca el listado
    this.bookService.updateBook(book).subscribe(() => {
      this.loadBooks();
    });
  }

  removeBook(id: number) {
    // Llama al servicio para eliminar, luego refresca el listado
    this.bookService.deleteBook(id).subscribe(() => {
      this.loadBooks();
    });
  }

  cancelAdd() {
    this.addingNew = false;
  }  
}