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
  comments: { [key: string]: string } = {};

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

  // Enviar comentario a un autor
  sendComment(bookId: string): void {
    if (this.comments[bookId]) {
      this.bookService.sendComment(bookId, this.comments[bookId]).subscribe(
        (response) => {
          alert('Comentario enviado correctamente');
          this.comments[bookId] = '';
        },
        (error) => {
          console.error('Error al enviar comentario:', error);
        }
      );
    } else {
      alert('Por favor, escribe un comentario antes de enviarlo');
    }
  }
}
