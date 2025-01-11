import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss'
})
export class BookComponent implements OnInit {
  books: any[] = [];
  newTitle = '';
  newAuthor = '';


  constructor(private bookService: BookService) {}
  
  ngOnInit(): void {
    this.loadBooks();
  }

  // Obtener libros desde el servicio
  loadBooks(): void {
    this.bookService.getBooks().subscribe(
      (data) => {
        this.books = data;
      },
      (error) => {
        console.error('Error al obtener libros:', error);
      }
    );
  }

  // Agregar un nuevo libro
  addBook(): void {
    if (this.newTitle && this.newAuthor) {
      this.bookService.addBook(this.newTitle, this.newAuthor).subscribe(
        (response) => {
          alert('Libro agregado correctamente');
          this.loadBooks(); // Recargar la lista de libros
          this.newTitle = '';
          this.newAuthor = '';
        },
        (error) => {
          console.error('Error al agregar libro:', error);
        }
      );
    } else {
      alert('Por favor, completa todos los campos');
    }
  }
}
