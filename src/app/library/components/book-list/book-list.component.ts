import { Component, Input, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { IBook } from '../../../core/models/book.model';
import { MatTableDataSource } from '@angular/material/table';
import { BookDetailComponent } from '../book-detail/book-detail.component';

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

  ngOnInit() {
    this.dataSource = new MatTableDataSource<IBook>(this.books);
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

  // Métodos para manejar añadir, editar y eliminar
  addBook(book: IBook) {
    // Aquí llama al servicio para guardar, luego refresca el listado
    this.addingNew = false;
    // ...actualiza this.books
  }

  updateBook(book: IBook) {
    // Llama al servicio para actualizar, luego refresca el listado
    // ...actualiza this.books
  }

  removeBook(id: number) {
    // Llama al servicio para eliminar, luego refresca el listado
    // ...actualiza this.books
  }

  cancelAdd() {
    this.addingNew = false;
  }  
}