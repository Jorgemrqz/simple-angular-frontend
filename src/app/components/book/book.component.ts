import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss'
})
export class BookComponent implements OnInit {
  books: any[] = [];
  newTitle = '';
  newAuthor = '';
  newEmail = '';  // Nuevo campo para el correo electrónico
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
    if (this.newTitle && this.newAuthor && this.newEmail) {  // Verificamos que el correo también esté presente
      this.bookService.addBook(this.newTitle, this.newAuthor, this.newEmail).subscribe(
        (response) => {
          alert('Libro agregado correctamente');
          this.loadBooks(); // Recargar la lista de libros
          this.newTitle = '';
          this.newAuthor = '';
          this.newEmail = '';  // Limpiar el campo de correo
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
      const book = this.books.find(b => b.id === bookId);
      const email = book ? book.email : '';  // Asegúrate de que el correo esté presente en los datos del libro
  
      if (email) {
        this.bookService.sendComment(book.title, this.comments[bookId]).subscribe(
          (response) => {
            alert('Comentario enviado correctamente');
            this.comments[bookId] = '';
          },
          (error) => {
            console.error('Error al enviar comentario:', error);
          }
        );
      } else {
        alert('No se encontró el correo del autor');
      }
    } else {
      alert('Por favor, escribe un comentario antes de enviarlo');
    }
  }
}
