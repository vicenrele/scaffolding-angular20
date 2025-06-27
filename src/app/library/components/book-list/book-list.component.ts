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
  /**
   * Input property to receive the list of books.
   * This will be used to populate the table with book data.
   */
  @Input() books: IBook[] = [];

  /**
   * The columns to display in the book list table.
   * This includes the book ID, title, author, year, and genre.
   */
  displayedColumns: string[] = ['id', 'title', 'author', 'year', 'genre'];
  /**
   * The columns to display in the book list table, including action buttons.
   * This adds an 'actions' column for edit and delete operations.
   */
  displayedColumnsWithActions: string[] = [...this.displayedColumns, 'actions'];
  /**
   * The data source for the book list table.
   * This will be used to bind the book data to the table.
   */
  dataSource = new MatTableDataSource<IBook>([]);
  /**
   * Flag to indicate if the component is in "adding new book" mode.
   * This will be set to true when the user starts adding a new book.
   */
  addingNew: boolean = false;

  /**
   * The ID of the book currently being edited.
   * This will be set to the book's ID when the user starts editing a book.
   */
  editingBookId: number | null = null;  

  /**
   * ViewChild to access the paginator for the book list table.
   * This will be used to control pagination of the book data.
   */
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private bookService: IBookService,
    @Inject(NotificationService) private notificationService: NotificationService
  ) {}

  /**
   * Initialize the component.
   */
  ngOnInit() {
    this.dataSource = new MatTableDataSource<IBook>(this.books);
    this.dataSource.paginator = this.paginator;
  }

  /**
   * Handle changes to the input books array.
   * This method updates the data source for the table whenever the input changes.
   */
  ngOnChanges() {
    this.dataSource = new MatTableDataSource<IBook>(this.books);
    this.dataSource.paginator = this.paginator;
  }

  /**
   * After the view has been initialized, set the paginator for the data source.
   * This ensures that the paginator is ready to paginate the data in the table.
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  /**
   * Start editing a book by setting the editingBookId to the book's ID.
   * This will trigger the edit mode in the UI for the specified book.
   */
  startEdit(bookId: number) {
    this.editingBookId = bookId;
  }

  /**
   * Cancel the edit mode by resetting the editingBookId to null.
   * This will exit the edit mode in the UI.
   */
  cancelEdit() {
    this.editingBookId = null;
  }

  /**
   * Save the changes made to a book while in edit mode.
   * This will update the book details and exit the edit mode.
   */
  onEditSave(book: IBook) {
    this.updateBook(book);
    this.cancelEdit();
  }

  /**
   * Load the books from the book service and update the data source.
   */
  loadBooks() {
    this.bookService.getBooks().subscribe(books => {
      this.books = books;
      this.dataSource.data = books;
    });
  }

  /**
   * Add a new book to the library.
   * @param book The book to add.
   */
  addBook(book: IBook) {
    this.bookService.addBook(book).subscribe({
      next: () => {
        this.notificationService.success('Book added successfully.'),
        this.addingNew = false;
        this.loadBooks();        
      },
      error: () => this.notificationService.error('Error adding book.')
    });
  }

  /**
   * Update an existing book in the library.
   * @param book The book to update.
   * This method updates an existing book in the library.
   */
  updateBook(book: IBook) {
    this.bookService.updateBook(book).subscribe({
      next: () => {
        this.notificationService.success('Book added successfully.'),
        this.loadBooks();        
      },
      error: () => this.notificationService.error('Error adding book.')
    });
  }

  /**
   * Remove a book from the library.  
   * @param id The ID of the book to remove.
   * This method removes a book from the library after confirming with the user.
   * @returns 
   */
  async removeBook(id: number) {
    const confirmed = await this.notificationService.confirm('Do you want to delete this book?');

    if (!confirmed) {
      this.notificationService.info('Deletion canceled.');
      return;
    }
    this.bookService.deleteBook(id).subscribe({
      next: () => {
        this.notificationService.success('Book deleted successfully.'),
        this.loadBooks();        
      },
      error: () => this.notificationService.error('Error deleting book.')
    });    
  }

  /**
   * Start adding a new book.
   * This will set the addingNew flag to true, allowing the UI to show the form for adding a new book.
   */
  cancelAdd() {
    this.addingNew = false;
  } 
}